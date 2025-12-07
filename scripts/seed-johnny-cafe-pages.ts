/**
 * Seeder for Johnny G's Brunch pages and sections
 * 
 * This script:
 * 1. Finds the organization by slug "johnny-gs-brunch" (or uses ORG_ID env var)
 * 2. Deletes existing pages and sections for the organization
 * 3. Creates Home page
 * 4. Creates sections for the home page with content extracted from components
 * 5. Validates all content using Zod schemas
 * 
 * Usage: npx tsx scripts/seed-johnny-cafe-pages.ts
 */

import { supabaseAdmin } from '../../agency-light/lib/supabase'
import { createPage } from '../../agency-light/lib/pages'
import { validateSectionContent } from '../src/lib/section-schemas'
import contentData from '../src/data/content.json'

// You can specify either a slug or an organization ID
// If ORG_ID is provided, it will be used; otherwise, BUSINESS_SLUG will be used
const BUSINESS_SLUG = process.env.BUSINESS_SLUG || 'johnny-gs-brunch'
const ORG_ID = process.env.ORG_ID || null

// Extract content from content.json and component defaults
const getHomeHeroContent = () => {
  return {
    address: "478 PARLIAMENT ST",
    daysLabel: "MONDAY - SUNDAY",
    day: {
      description: "Have brunch at one of the oldest Restaurants in Cabbagetown",
      hours: contentData.hours.breakfast.time,
      heroImage: "/home/brunch-frame-bg.jpg"
    },
    night: {
      description: "Have dinner at one of the oldest Restaurants in Cabbagetown",
      hours: contentData.hours.dinner.time,
      heroImage: "/home/jazz-frame.jpg"
    },
    reservationPhone: contentData.reservations.phone.tel,
    reservationLabel: contentData.reservations.phone.display,
  }
}

const getHomeAboutContent = () => {
  return {
    title: contentData.about.title,
    paragraphs: contentData.about.paragraphs,
  }
}

const getHomeMenuContent = () => {
  return {
    title: contentData.menu.title,
    description: "Explore our carefully crafted dishes",
    images: contentData.menu.images,
  }
}

const getHomeEventsContent = () => {
  return {
    title: contentData.events.title,
    description: contentData.events.description,
  }
}

const getHomeReservationContent = () => {
  return {
    heading: "Your Table Awaits",
    subheading: "Reserve Now",
  }
}

async function findOrganizationBySlug(slug: string): Promise<string | null> {
  console.log(`\n🔍 Finding organization by slug: ${slug}...`)
  
  const { data: business, error } = await supabaseAdmin
    .from('businesses')
    .select('id, name, slug')
    .eq('slug', slug)
    .maybeSingle()
  
  if (error) {
    console.error('❌ Error finding organization:', error)
    return null
  }
  
  if (!business) {
    console.error(`❌ Organization with slug "${slug}" not found`)
    return null
  }
  
  console.log(`✅ Found organization: ${business.name} (ID: ${business.id})`)
  return business.id
}

async function deleteExistingPagesAndSections(orgId: string): Promise<void> {
  console.log('\n🗑️  Deleting existing pages and sections...')
  
  // First, get all pages for this organization
  const { data: pages, error: pagesError } = await supabaseAdmin
    .from('pages')
    .select('id')
    .eq('org_id', orgId)
  
  if (pagesError) {
    console.error('❌ Error fetching pages:', pagesError)
    throw pagesError
  }
  
  const pageIds = pages?.map(p => p.id) || []
  const pageCount = pageIds.length
  
  if (pageCount > 0) {
    // Count sections before deletion
    const { count: sectionsCount } = await supabaseAdmin
      .from('page_sections_v2')
      .select('*', { count: 'exact', head: true })
      .in('page_id', pageIds)
    
    const sectionsCountValue = sectionsCount || 0
    
    // Delete sections first (cascade should handle this, but explicit deletion is safer)
    const { error: sectionsError } = await supabaseAdmin
      .from('page_sections_v2')
      .delete()
      .in('page_id', pageIds)
    
    if (sectionsError) {
      console.error('❌ Error deleting sections:', sectionsError)
      throw sectionsError
    }
    
    if (sectionsCountValue > 0) {
      console.log(`  ✅ Deleted ${sectionsCountValue} section(s)`)
    }
    
    // Delete pages
    const { error: pagesDeleteError } = await supabaseAdmin
      .from('pages')
      .delete()
      .eq('org_id', orgId)
    
    if (pagesDeleteError) {
      console.error('❌ Error deleting pages:', pagesDeleteError)
      throw pagesDeleteError
    }
    
    console.log(`  ✅ Deleted ${pageCount} page(s)`)
  } else {
    console.log('  ℹ️  No existing pages found to delete')
  }
}

async function createPages(orgId: string): Promise<{ homePageId: string }> {
  console.log('\n📄 Creating pages...')
  
  // Create Home page
  const homePageResult = await createPage(orgId, {
    name: 'Home Page',
    slug: 'home',
    template: 'default_home',
    status: 'published',
  }, supabaseAdmin)
  
  if (!homePageResult.success || !homePageResult.page) {
    throw new Error(homePageResult.error || 'Failed to create Home page')
  }
  
  const homePageId = homePageResult.page.id
  console.log(`  ✅ Created Home page (ID: ${homePageId})`)
  
  return { homePageId }
}

async function createHomePageSections(orgId: string, homePageId: string): Promise<void> {
  console.log('\n📦 Creating sections for Home page...')
  
  const sections = [
    {
      key: 'home-hero',
      label: 'Hero Section',
      component: 'HomeHeroSection',
      position: 1,
      content: getHomeHeroContent(),
    },
    {
      key: 'home-about',
      label: 'About Section',
      component: 'HomeAboutSection',
      position: 2,
      content: getHomeAboutContent(),
    },
    {
      key: 'home-menu',
      label: 'Menu Section',
      component: 'HomeMenuSection',
      position: 3,
      content: getHomeMenuContent(),
    },
    {
      key: 'home-events',
      label: 'Events Section',
      component: 'HomeEventsSection',
      position: 4,
      content: getHomeEventsContent(),
    },
    {
      key: 'home-reservation',
      label: 'Reservation Section',
      component: 'HomeReservationSection',
      position: 5,
      content: getHomeReservationContent(),
    },
  ]
  
  let createdCount = 0
  
  for (const section of sections) {
    // Validate content against schema
    const validation = validateSectionContent(section.component, section.content)
    
    if (!validation.success) {
      console.error(`  ❌ Validation failed for section "${section.label}":`, validation.error)
      throw new Error(`Validation failed for ${section.component}: ${validation.error}`)
    }
    
    // Use validated content
    const validatedContent = validation.data as Record<string, unknown>
    
    // Create section
    const { error: sectionError } = await supabaseAdmin
      .from('page_sections_v2')
      .insert({
        page_id: homePageId,
        org_id: orgId,
        key: section.key,
        label: section.label,
        component: section.component,
        position: section.position,
        published_content: validatedContent,
        draft_content: validatedContent,
        status: 'published',
      })
    
    if (sectionError) {
      console.error(`  ❌ Error creating section "${section.label}":`, sectionError)
      throw sectionError
    }
    
    console.log(`  ✅ Created section: ${section.label} (${section.component})`)
    createdCount++
  }
  
  console.log(`\n✅ Created ${createdCount} section(s) for Home page`)
}

async function seedJohnnyCafePages() {
  try {
    console.log('🌱 Starting Johnny G\'s Brunch pages seeder...')
    
    // Step 1: Find organization
    let orgId: string | null = null
    
    if (ORG_ID) {
      console.log(`   Using organization ID: ${ORG_ID}\n`)
      // Verify the organization exists
      const { data: org, error } = await supabaseAdmin
        .from('businesses')
        .select('id, name, slug')
        .eq('id', ORG_ID)
        .single()
      
      if (error || !org) {
        console.error(`❌ Organization with ID ${ORG_ID} not found:`, error?.message)
        process.exit(1)
      }
      
      orgId = org.id
      console.log(`✅ Found organization: ${org.name} (ID: ${org.id}, slug: ${org.slug})`)
    } else {
      console.log(`   Business slug: ${BUSINESS_SLUG}\n`)
      orgId = await findOrganizationBySlug(BUSINESS_SLUG)
      if (!orgId) {
        console.error('❌ Could not find organization. Exiting.')
        process.exit(1)
      }
    }
    
    // Step 2: Delete existing pages and sections
    await deleteExistingPagesAndSections(orgId!)
    
    // Step 3: Create pages
    const { homePageId } = await createPages(orgId!)
    
    // Step 4: Create sections for Home page
    await createHomePageSections(orgId!, homePageId)
    
    console.log('\n✅ Seeding completed successfully!')
    console.log(`\n📊 Summary:`)
    console.log(`   - Organization ID: ${orgId}`)
    console.log(`   - Home Page ID: ${homePageId}`)
    console.log(`   - Home Page Sections: 5`)
    
  } catch (error) {
    console.error('\n❌ Seeding failed:', error)
    process.exit(1)
  }
}

// Run the seeder
seedJohnnyCafePages()

