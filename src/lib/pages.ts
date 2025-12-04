import { supabaseAdmin } from './supabase'
import { validatePreviewToken } from './preview'

export interface Page {
  id: string
  org_id: string
  name: string
  slug: string
  template?: string
  status: 'published' | 'dirty' | 'draft'
  created_at: string
  updated_at: string
}

export interface PageSection {
  id: string
  page_id: string
  org_id: string
  key: string
  label: string
  component: string
  position: number
  published_content: Record<string, unknown>
  draft_content: Record<string, unknown>
  status: 'published' | 'dirty' | 'draft'
  created_at: string
  updated_at: string
}

/**
 * Get page by slug for a business
 */
export async function getPageBySlug(
  businessSlug: string,
  pageSlug: string
): Promise<Page | null> {
  try {
    // Use admin client to bypass RLS for public landing pages
    const supabase = supabaseAdmin
    
    // Get business by slug - this is the source of truth
    const { data: businesses, error: businessError } = await supabase
      .from('businesses')
      .select('id, name, slug')
      .eq('slug', businessSlug)
      .limit(1)

    if (businessError) {
      console.error('[getPageBySlug] Business lookup error:', {
        businessSlug,
        error: businessError.message,
        code: businessError.code,
      })
      return null
    }

    if (!businesses || businesses.length === 0) {
      console.error('[getPageBySlug] Business not found:', {
        businessSlug,
        pagesReturned: businesses?.length || 0,
      })
      return null
    }

    const business = businesses[0]
    
    // Validate the business result
    if (!business?.id || business.slug !== businessSlug) {
      console.error('[getPageBySlug] Invalid business returned:', {
        businessSlug,
        returnedBusiness: business,
      })
      return null
    }

    // Get page by slug for this business
    const { data: pages, error: pageError } = await supabase
      .from('pages')
      .select('*')
      .eq('org_id', business.id)
      .eq('slug', pageSlug)
      .limit(1)

    if (pageError) {
      console.error('[getPageBySlug] Page lookup error:', {
        businessSlug,
        businessId: business.id,
        pageSlug,
        error: pageError.message,
        code: pageError.code,
        details: pageError.details,
        hint: pageError.hint,
      })
      return null
    }

    if (!pages || pages.length === 0) {
      console.error('[getPageBySlug] Page not found (RLS may be blocking):', {
        businessSlug,
        businessId: business.id,
        pageSlug,
        pagesReturned: pages?.length || 0,
      })
      return null
    }

    const page = pages[0]

    return page as Page
  } catch (error) {
    console.error('Error in getPageBySlug:', {
      businessSlug,
      pageSlug,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
    return null
  }
}

/**
 * Get page sections with preview support
 */
export async function getPageSections(
  pageId: string,
  useDraft: boolean = false,
  previewToken?: string
): Promise<{ sections: PageSection[]; useDraft: boolean }> {
  try {
    // Use admin client to bypass RLS for public landing pages
    const supabase = supabaseAdmin
    
    // Validate preview token if provided
    let shouldUseDraft = useDraft
    if (previewToken) {
      const validation = await validatePreviewToken(previewToken, undefined, pageId)
      shouldUseDraft = validation.valid
      console.log('[getPageSections] Preview token validation:', {
        pageId,
        tokenPreview: previewToken.substring(0, 8) + '...',
        valid: validation.valid,
        error: validation.error,
        shouldUseDraft,
        originalUseDraft: useDraft,
      })
    }

    const { data, error } = await supabase
      .from('page_sections_v2')
      .select('*')
      .eq('page_id', pageId)
      .order('position', { ascending: true })

    if (error) {
      console.error('[getPageSections] Error fetching sections:', error)
      return { sections: [], useDraft: shouldUseDraft }
    }

    if (!data) {
      console.warn('[getPageSections] No sections data returned:', { pageId })
      return { sections: [], useDraft: shouldUseDraft }
    }

    const sections = data as PageSection[]
    
    if (shouldUseDraft) {
      // When previewing, return sections exactly as stored so the caller can use draft_content directly
      console.log('[getPageSections] Returning draft sections:', {
        pageId,
        sectionsCount: sections.length,
        heroSection: sections.find(s => s.component === 'HomeHeroSection') ? {
          key: sections.find(s => s.component === 'HomeHeroSection')?.key,
          hasDraftContent: !!sections.find(s => s.component === 'HomeHeroSection')?.draft_content,
          hasPublishedContent: !!sections.find(s => s.component === 'HomeHeroSection')?.published_content,
        } : null,
      })
      return { sections, useDraft: true }
    }

    // For public view, include sections that have been published or have dirty (unpublished) changes
    const publishedSections = sections.filter(section => {
      const hasStatus = section.status === 'published' || section.status === 'dirty'
      return hasStatus && (section.published_content || section.draft_content)
    })

    return {
      sections: publishedSections.map(section => ({
        ...section,
        // Ensure we at least fall back to draft content if published content is empty
        published_content: section.published_content || section.draft_content || {},
      })),
      useDraft: false,
    }
  } catch (error) {
    console.error('Error in getPageSections:', error)
    return { sections: [], useDraft: useDraft }
  }
}
