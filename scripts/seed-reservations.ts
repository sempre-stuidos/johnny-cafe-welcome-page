/**
 * Seeder for Johnny G's Brunch Reservations
 * Seeds 2 dummy reservations for "Johnny G's Brunch" business
 * 
 * Usage: npx tsx scripts/seed-reservations.ts
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

const BUSINESS_SLUG = 'johnny-gs-brunch'

async function getBusinessId(): Promise<string> {
  console.log('\nStep 1: Finding Johnny G\'s Brunch business...')
  
  const { data: business, error } = await supabaseAdmin
    .from('businesses')
    .select('id, name, slug')
    .eq('slug', BUSINESS_SLUG)
    .maybeSingle()
  
  if (error) {
    throw new Error(`Error finding business: ${error.message}`)
  }
  
  if (!business) {
    throw new Error(`Business with slug "${BUSINESS_SLUG}" not found. Please run seed-johnny-gs-brunch.ts first.`)
  }
  
  console.log(`✅ Found business: ${business.name} (ID: ${business.id})`)
  return business.id
}

async function seedReservations(businessId: string): Promise<void> {
  console.log('\nStep 2: Seeding reservations...')
  
  // Calculate dates for the reservations
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  
  const nextWeek = new Date(today)
  nextWeek.setDate(today.getDate() + 7)
  
  // Check if reservations already exist (idempotent)
  const { data: existingReservations, error: checkError } = await supabaseAdmin
    .from('reservations')
    .select('id, customer_email, reservation_date')
    .eq('org_id', businessId)
    .in('customer_email', ['sarah.johnson@example.com', 'michael.brown@example.com'])
  
  if (checkError) {
    throw new Error(`Error checking existing reservations: ${checkError.message}`)
  }
  
  if (existingReservations && existingReservations.length > 0) {
    console.log(`⚠️  Found ${existingReservations.length} existing reservation(s) with these emails. Skipping seed.`)
    existingReservations.forEach(r => {
      console.log(`   - ${r.customer_email} on ${r.reservation_date}`)
    })
    return
  }
  
  // Create 2 dummy reservations
  const reservations = [
    {
      org_id: businessId,
      customer_name: 'Sarah Johnson',
      customer_email: 'sarah.johnson@example.com',
      customer_phone: '+1-555-0101',
      reservation_date: tomorrow.toISOString().split('T')[0], // Tomorrow
      reservation_time: '18:30:00',
      party_size: 4,
      status: 'pending' as const,
      special_requests: 'Window seat preferred',
    },
    {
      org_id: businessId,
      customer_name: 'Michael Brown',
      customer_email: 'michael.brown@example.com',
      customer_phone: '+1-555-0102',
      reservation_date: nextWeek.toISOString().split('T')[0], // Next week
      reservation_time: '19:00:00',
      party_size: 2,
      status: 'pending' as const,
      special_requests: 'Anniversary dinner',
    },
  ]
  
  const { data: insertedReservations, error: insertError } = await supabaseAdmin
    .from('reservations')
    .insert(reservations)
    .select('id, customer_name, reservation_date, reservation_time')
  
  if (insertError) {
    throw new Error(`Error inserting reservations: ${insertError.message}`)
  }
  
  console.log(`✅ Successfully seeded ${insertedReservations.length} reservation(s):`)
  insertedReservations.forEach(r => {
    console.log(`   - ${r.customer_name} on ${r.reservation_date} at ${r.reservation_time}`)
  })
}

async function seedComplete() {
  try {
    console.log('🌱 Starting reservation seeder for Johnny G\'s Brunch...\n')
    
    // Step 1: Get business ID
    const businessId = await getBusinessId()
    
    // Step 2: Seed reservations
    await seedReservations(businessId)
    
    console.log('\n✅ Reservation seeder finished successfully!')
    
  } catch (error) {
    console.error('❌ Error in reservation seeder:', error)
    process.exit(1)
  }
}

// Run the seeder
seedComplete()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })

