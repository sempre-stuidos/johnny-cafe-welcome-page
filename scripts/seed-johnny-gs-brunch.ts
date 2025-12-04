/**
 * Seeder for Johnny G's Brunch
 * 1. Creates "Johnny G's Brunch" business
 * 2. Creates Home page with HomeHeroSection
 * 
 * Usage: npx tsx scripts/seed-johnny-gs-brunch.ts
 */

// Load environment variables from .env.local FIRST
import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env.local') })

// Create Supabase admin client directly in seeder to ensure env vars are loaded
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321'
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseServiceRoleKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is required. Please check your .env.local file.')
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

import { validateSectionContent } from '../src/lib/section-schemas'
import * as fs from 'fs'

const BUSINESS_NAME = "Johnny G's Brunch"
const BUSINESS_TYPE = 'restaurant' as const
const BUSINESS_SLUG = 'johnny-gs-brunch'

// Load content.json
const contentJsonPath = path.join(process.cwd(), 'src/data/content.json')
const contentData = JSON.parse(fs.readFileSync(contentJsonPath, 'utf-8'))

const BUSINESS_DATA = {
  description: "A cozy neighborhood restaurant serving fresh brunch and dinner with a focus on comfort food and community. Established in 1975.",
  address: "478 Parliament St, Toronto, ON M5A 2L3",
  phone: "+16473683877",
  email: "johnnygs478@gmail.com",
  website: "https://johnnygsrestaurant.ca",
  status: 'active' as const,
}

async function createJohnnyGsBrunchBusiness(): Promise<string> {
  console.log('\nStep 1: Creating Johnny G\'s Brunch business...')
  
  // Check if business already exists
  const { data: existingBusiness } = await supabaseAdmin
    .from('businesses')
    .select('id, name, slug')
    .or(`name.eq.${BUSINESS_NAME},slug.eq.${BUSINESS_SLUG}`)
    .limit(1)
    .maybeSingle()
  
  if (existingBusiness) {
    console.log(`✅ Business already exists: ${existingBusiness.name} (ID: ${existingBusiness.id})`)
    return existingBusiness.id
  }
  
  // Create business directly
  console.log('Creating business directly...')
  const { data: newBusiness, error: createError } = await supabaseAdmin
    .from('businesses')
    .insert({
      name: BUSINESS_NAME,
      type: BUSINESS_TYPE,
      description: BUSINESS_DATA.description,
      address: BUSINESS_DATA.address,
      phone: BUSINESS_DATA.phone,
      email: BUSINESS_DATA.email,
      website: BUSINESS_DATA.website,
      status: BUSINESS_DATA.status,
      slug: BUSINESS_SLUG,
    })
    .select('id')
    .single()
  
  if (createError || !newBusiness) {
    throw new Error(createError?.message || 'Failed to create business')
  }
  
  console.log(`✅ Created business: ${BUSINESS_NAME} (ID: ${newBusiness.id})`)
  return newBusiness.id
}

async function createHomePageWithSections(businessId: string): Promise<void> {
  console.log('\nStep 2: Creating Home page with sections...')
  
  // Check if Home page already exists
  const { data: existingPage } = await supabaseAdmin
    .from('pages')
    .select('id, name, slug')
    .eq('org_id', businessId)
    .eq('slug', 'home')
    .maybeSingle()
  
  let pageId: string
  
  if (existingPage) {
    console.log(`✅ Home page already exists (ID: ${existingPage.id})`)
    pageId = existingPage.id
  } else {
    // Create Home page
    const { data: newPage, error: pageError } = await supabaseAdmin
      .from('pages')
      .insert({
        org_id: businessId,
        name: 'Home Page',
        slug: 'home',
        template: 'default_home',
        status: 'published',
      })
      .select('id')
      .single()
    
    if (pageError || !newPage) {
      throw new Error(pageError?.message || 'Failed to create Home page')
    }
    
    pageId = newPage.id
    console.log(`✅ Created Home page (ID: ${pageId})`)
  }
  
  // Create HomeHeroSection based on content.json
  console.log('\nCreating HomeHeroSection...')
  
  // Build section content from content.json
  const sectionContent = {
    address: "478 PARLIAMENT ST",
    title: "JOHNNY G's",
    subtitle: "Brunch",
    established: `EST ${contentData.restaurant.established}`,
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
  
  // Validate content using Zod schema
  const validation = validateSectionContent('HomeHeroSection', sectionContent)
  if (!validation.success) {
    throw new Error(`Content validation failed: ${validation.error}`)
  }
  
  console.log('✅ Content validated successfully')
  
  // Check if section already exists
  const { data: existingSection } = await supabaseAdmin
    .from('page_sections_v2')
    .select('id')
    .eq('page_id', pageId)
    .eq('key', 'home_hero')
    .maybeSingle()
  
  if (existingSection) {
    // Update existing section
    const { error: updateError } = await supabaseAdmin
      .from('page_sections_v2')
      .update({
        label: 'Home Hero Section',
        component: 'HomeHeroSection',
        position: 1,
        published_content: validation.data,
        draft_content: validation.data,
        status: 'published',
      })
      .eq('id', existingSection.id)
    
    if (updateError) {
      console.error(`  ❌ Error updating section:`, updateError)
      throw updateError
    }
    
    console.log(`  ✅ Updated section: Home Hero Section`)
  } else {
    // Create section
    const { error: sectionError } = await supabaseAdmin
      .from('page_sections_v2')
      .insert({
        page_id: pageId,
        org_id: businessId,
        key: 'home_hero',
        label: 'Home Hero Section',
        component: 'HomeHeroSection',
        position: 1,
        published_content: validation.data,
        draft_content: validation.data,
        status: 'published',
      })
    
    if (sectionError) {
      console.error(`  ❌ Error creating section:`, sectionError)
      throw sectionError
    }
    
    console.log(`  ✅ Created section: Home Hero Section`)
  }
}

async function seedComplete() {
  try {
    console.log('🌱 Starting seeder for Johnny G\'s Brunch...\n')
    
    // Step 1: Create business
    const businessId = await createJohnnyGsBrunchBusiness()
    
    // Step 2: Create Home page with sections
    await createHomePageWithSections(businessId)
    
    // Step 3: Verify
    console.log('\n📋 Final Verification:')
    const { data: business } = await supabaseAdmin
      .from('businesses')
      .select('id, name, slug, type, status')
      .eq('id', businessId)
      .single()
    
    const { data: page } = await supabaseAdmin
      .from('pages')
      .select('id, name, slug, status')
      .eq('org_id', businessId)
      .eq('slug', 'home')
      .single()
    
    const { data: sections } = await supabaseAdmin
      .from('page_sections_v2')
      .select('id, key, label, component, position, status')
      .eq('page_id', page?.id)
      .order('position', { ascending: true })
    
    console.log(`   Business: ${business?.name} (${business?.slug})`)
    console.log(`   Type: ${business?.type}, Status: ${business?.status}`)
    console.log(`   Page: ${page?.name} (${page?.slug}), Status: ${page?.status}`)
    console.log(`   Sections: ${sections?.length || 0}`)
    if (sections && sections.length > 0) {
      sections.forEach((s, idx) => {
        console.log(`     ${idx + 1}. ${s.label} (${s.component}) - ${s.status}`)
      })
    }
    
    console.log('\n✅ Seeder finished successfully!')
    console.log(`\n   Business: ${BUSINESS_NAME}`)
    console.log(`   Business ID: ${businessId}`)
    console.log(`   Business Slug: ${BUSINESS_SLUG}`)
    
  } catch (error) {
    console.error('❌ Error in seeder:', error)
    process.exit(1)
  }
}

// Run the seeder
seedComplete()
  .then(() => {
    console.log('\n✅ Seeder completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Seeder failed:', error)
    process.exit(1)
  })
