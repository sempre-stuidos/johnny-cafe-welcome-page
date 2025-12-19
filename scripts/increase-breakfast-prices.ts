#!/usr/bin/env node

/**
 * Script to increase breakfast menu item prices by $2.00
 * 
 * Usage:
 *   npx tsx scripts/increase-breakfast-prices.ts --dry-run  (preview changes)
 *   npx tsx scripts/increase-breakfast-prices.ts            (execute changes)
 */

// Load environment variables from .env.local FIRST
import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env.local') })

// Create Supabase admin client directly to ensure env vars are loaded
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

// Breakfast category slugs that identify breakfast items
const BREAKFAST_CATEGORY_SLUGS = [
  'basic',
  'breakfast',
  'eggs_benedict',
  'omelettes',
  'pancake_waffle_frenchtoast'
]

const PRICE_INCREASE_CENTS = 200 // $2.00

interface MenuItem {
  id: number
  name: string
  price_cents: number | null
  menu_category_id: number | null
  category_slug?: string
  category_name?: string
}

/**
 * Format price in cents to dollars for display
 */
function formatPrice(cents: number | null): string {
  if (cents === null) return 'N/A'
  return `$${(cents / 100).toFixed(2)}`
}

/**
 * Query breakfast menu items from the database
 */
async function getBreakfastMenuItems(): Promise<MenuItem[]> {
  // First, get the category IDs for breakfast categories
  const { data: categories, error: categoryError } = await supabaseAdmin
    .from('menu_categories')
    .select('id, slug, name')
    .in('slug', BREAKFAST_CATEGORY_SLUGS)

  if (categoryError) {
    throw new Error(`Failed to fetch categories: ${categoryError.message}`)
  }

  if (!categories || categories.length === 0) {
    return []
  }

  const categoryIds = categories.map(cat => cat.id)
  const categoryMap = new Map(categories.map(cat => [cat.id, cat]))

  // Then, get menu items in those categories
  const { data: items, error: itemsError } = await supabaseAdmin
    .from('menu_items')
    .select('id, name, price_cents, menu_category_id')
    .in('menu_category_id', categoryIds)
    .is('is_archived', false)

  if (itemsError) {
    throw new Error(`Failed to fetch menu items: ${itemsError.message}`)
  }

  // Transform the data to include category information
  return (items || []).map((item: any) => {
    const category = categoryMap.get(item.menu_category_id)
    return {
      id: item.id,
      name: item.name,
      price_cents: item.price_cents,
      menu_category_id: item.menu_category_id,
      category_slug: category?.slug,
      category_name: category?.name
    }
  })
}

/**
 * Update a single menu item's price
 */
async function updateMenuItemPrice(itemId: number, newPriceCents: number): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from('menu_items')
    .update({ price_cents: newPriceCents })
    .eq('id', itemId)

  if (error) {
    console.error(`  ❌ Error updating item ${itemId}: ${error.message}`)
    return false
  }

  return true
}

/**
 * Main function to increase breakfast menu prices
 */
async function increaseBreakfastPrices(dryRun: boolean = false): Promise<void> {
  console.log('='.repeat(60))
  console.log('Breakfast Menu Price Increase Script')
  console.log('='.repeat(60))
  console.log(`Mode: ${dryRun ? 'DRY RUN (no changes will be made)' : 'LIVE (changes will be saved)'}`)
  console.log(`Price increase: $${(PRICE_INCREASE_CENTS / 100).toFixed(2)}`)
  console.log(`Breakfast categories: ${BREAKFAST_CATEGORY_SLUGS.join(', ')}`)
  console.log('='.repeat(60))
  console.log()

  try {
    // Fetch breakfast menu items
    console.log('Fetching breakfast menu items...')
    const items = await getBreakfastMenuItems()

    if (items.length === 0) {
      console.log('⚠️  No breakfast menu items found.')
      return
    }

    console.log(`✅ Found ${items.length} breakfast menu item(s)\n`)

    // Filter items with valid prices
    const itemsWithPrices = items.filter(item => item.price_cents !== null && item.price_cents !== undefined)
    const itemsWithoutPrices = items.filter(item => item.price_cents === null || item.price_cents === undefined)

    if (itemsWithoutPrices.length > 0) {
      console.log(`⚠️  ${itemsWithoutPrices.length} item(s) without prices (will be skipped):`)
      itemsWithoutPrices.forEach(item => {
        console.log(`   - ${item.name} (ID: ${item.id}, Category: ${item.category_name || 'N/A'})`)
      })
      console.log()
    }

    if (itemsWithPrices.length === 0) {
      console.log('⚠️  No items with valid prices to update.')
      return
    }

    console.log(`📝 Updating ${itemsWithPrices.length} item(s):\n`)

    let successCount = 0
    let errorCount = 0

    // Process each item
    for (const item of itemsWithPrices) {
      const oldPriceCents = item.price_cents!
      const newPriceCents = oldPriceCents + PRICE_INCREASE_CENTS

      console.log(`  ${item.name}`)
      console.log(`    Category: ${item.category_name || 'N/A'} (${item.category_slug || 'N/A'})`)
      console.log(`    Current price: ${formatPrice(oldPriceCents)}`)
      console.log(`    New price: ${formatPrice(newPriceCents)}`)
      console.log(`    Increase: ${formatPrice(PRICE_INCREASE_CENTS)}`)

      if (dryRun) {
        console.log(`    [DRY RUN] Would update item ID ${item.id}`)
        successCount++
      } else {
        const success = await updateMenuItemPrice(item.id, newPriceCents)
        if (success) {
          console.log(`    ✅ Updated successfully`)
          successCount++
        } else {
          errorCount++
        }
      }
      console.log()
    }

    // Summary
    console.log('='.repeat(60))
    console.log('Summary')
    console.log('='.repeat(60))
    console.log(`Total items found: ${items.length}`)
    console.log(`Items with prices: ${itemsWithPrices.length}`)
    console.log(`Items without prices: ${itemsWithoutPrices.length}`)
    if (dryRun) {
      console.log(`Items that would be updated: ${successCount}`)
      console.log('\n⚠️  This was a DRY RUN. No changes were made to the database.')
      console.log('Run without --dry-run to apply changes.')
    } else {
      console.log(`Items updated successfully: ${successCount}`)
      console.log(`Items with errors: ${errorCount}`)
    }
    console.log('='.repeat(60))

  } catch (error) {
    console.error('\n❌ Error:', error instanceof Error ? error.message : 'Unknown error')
    process.exit(1)
  }
}

// Parse command line arguments
const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run') || args.includes('-d')

// Run the script
increaseBreakfastPrices(dryRun)
  .then(() => {
    console.log('\n✅ Script completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error)
    process.exit(1)
  })

