import { supabaseAdmin } from './supabase'

export interface PreviewToken {
  id: string
  org_id: string
  page_id?: string
  section_id?: string
  user_id?: string
  expires_at: string
  created_at: string
}

/**
 * Validate a preview token
 */
export async function validatePreviewToken(
  token: string,
  orgId?: string,
  pageId?: string,
  sectionId?: string
): Promise<{ valid: boolean; token?: PreviewToken; error?: string }> {
  try {
    // Use admin client to bypass RLS for preview token validation
    const supabase = supabaseAdmin
    
    const { data, error } = await supabase
      .from('preview_tokens')
      .select('*')
      .eq('id', token)
      .gt('expires_at', new Date().toISOString())
      .single()

    if (error || !data) {
      return { valid: false, error: 'Token not found or expired' }
    }

    const resolvedToken = data as PreviewToken

    // Check if token matches provided org/page/section
    // Note: org_id in preview_tokens references business_id
    if (orgId && resolvedToken.org_id !== orgId) {
      return { valid: false, error: 'Token does not match organization' }
    }

    if (pageId && resolvedToken.page_id !== pageId) {
      return { valid: false, error: 'Token does not match page' }
    }

    if (sectionId && resolvedToken.section_id !== sectionId) {
      return { valid: false, error: 'Token does not match section' }
    }

    return { valid: true, token: resolvedToken }
  } catch (error) {
    console.error('Error in validatePreviewToken:', error)
    return { valid: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
