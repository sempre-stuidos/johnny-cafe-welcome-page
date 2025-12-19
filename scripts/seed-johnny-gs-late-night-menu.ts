/**
 * Seeder for Johnny G's Late Night Menu
 * Creates Late Night menu with all categories and items
 * 
 * Usage: npx tsx scripts/seed-johnny-gs-late-night-menu.ts
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

// Menu data structure
interface MenuItemInput {
  name: string
  price: number
  description?: string
}

interface CategoryData {
  slug: string
  name: string
  sortOrder: number
  items: MenuItemInput[]
}

const LATE_NIGHT_CATEGORIES: CategoryData[] = [
  {
    slug: 'small_plates',
    name: 'Small Plates',
    sortOrder: 1,
    items: [
      {
        name: 'Cauliflower Bites (V)',
        price: 9,
        description: ''
      },
      {
        name: 'Chickpeas Potato Fritters (V)',
        price: 9,
        description: ''
      },
      {
        name: 'Samosa Duo (Veg / Chicken / Beef)',
        price: 11,
        description: ''
      },
      {
        name: 'Duck Spring Rolls',
        price: 9,
        description: ''
      },
      {
        name: 'Nachos',
        price: 12,
        description: ''
      },
      {
        name: 'Fish & Chips',
        price: 14,
        description: ''
      },
      {
        name: 'Cheese Burger & Fries',
        price: 14,
        description: ''
      },
      {
        name: 'Duck Breast (Medium Rare)',
        price: 12,
        description: ''
      },
      {
        name: 'Momo Chicken (Fried or Pan Fried)',
        price: 12,
        description: ''
      }
    ]
  },
  {
    slug: 'jazz_bar_bites',
    name: 'Jazz Bar Bites',
    sortOrder: 2,
    items: [
      {
        name: 'Truffle Fries',
        price: 10,
        description: ''
      },
      {
        name: 'Stuffed Chicken Wings',
        price: 12,
        description: ''
      },
      {
        name: 'Poutine',
        price: 12,
        description: ''
      },
      {
        name: 'Flat Cheese Bread (Bacon or Pepperoni)',
        price: 12,
        description: ''
      },
      {
        name: 'Lamb Sliders with Goat Cheese',
        price: 12,
        description: ''
      },
      {
        name: 'Tacos (3 pcs – Beef / Chicken / Vegan)',
        price: 14,
        description: ''
      },
      {
        name: 'Grilled Tofu & Bell Peppers',
        price: 12,
        description: ''
      }
    ]
  },
  {
    slug: 'desserts',
    name: 'Desserts',
    sortOrder: 3,
    items: [
      {
        name: 'Panna Cotta',
        price: 11,
        description: ''
      },
      {
        name: 'Chocolate Mousse',
        price: 12,
        description: ''
      },
      {
        name: 'Blueberry Mille',
        price: 11,
        description: ''
      }
    ]
  }
]

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

async function getOrCreateMenu(businessId: string, menuName: string): Promise<number> {
  // Check if menu already exists
  const { data: existingMenu } = await supabaseAdmin
    .from('menus')
    .select('id, name')
    .eq('business_id', businessId)
    .eq('name', menuName)
    .maybeSingle()
  
  if (existingMenu) {
    console.log(`  ✅ Menu "${menuName}" already exists (ID: ${existingMenu.id})`)
    return existingMenu.id
  }
  
  // Create menu
  const { data: newMenu, error } = await supabaseAdmin
    .from('menus')
    .insert({
      business_id: businessId,
      name: menuName,
      description: `${menuName} menu for Johnny G's Brunch`,
      is_active: true
    })
    .select('id')
    .single()
  
  if (error || !newMenu) {
    throw new Error(`Failed to create menu "${menuName}": ${error?.message}`)
  }
  
  console.log(`  ✅ Created menu "${menuName}" (ID: ${newMenu.id})`)
  return newMenu.id
}

async function deleteAllLateNightItemsAndCategories(menuId: number): Promise<void> {
  console.log('  🗑️  Deleting all existing late night items and categories...')
  
  // First, delete all menu items for this menu
  const { error: deleteItemsError } = await supabaseAdmin
    .from('menu_items')
    .delete()
    .eq('menu_id', menuId)
  
  if (deleteItemsError) {
    throw new Error(`Failed to delete menu items: ${deleteItemsError.message}`)
  }
  
  // Then, delete all categories for this menu
  const { error: deleteCategoriesError } = await supabaseAdmin
    .from('menu_categories')
    .delete()
    .eq('menu_id', menuId)
  
  if (deleteCategoriesError) {
    throw new Error(`Failed to delete menu categories: ${deleteCategoriesError.message}`)
  }
  
  console.log('  ✅ Deleted all existing late night items and categories')
}

async function createCategory(
  menuId: number,
  category: CategoryData
): Promise<number> {
  // Create category
  const { data: newCategory, error } = await supabaseAdmin
    .from('menu_categories')
    .insert({
      menu_id: menuId,
      name: category.name,
      slug: category.slug,
      sort_order: category.sortOrder,
      is_active: true
    })
    .select('id')
    .single()
  
  if (error || !newCategory) {
    throw new Error(`Failed to create category "${category.name}": ${error?.message}`)
  }
  
  console.log(`    ✅ Created category "${category.name}" (ID: ${newCategory.id})`)
  return newCategory.id
}

async function createMenuItems(
  menuId: number,
  categoryId: number,
  items: MenuItemInput[]
): Promise<void> {
  let createdCount = 0
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    
    // Create new item
    const { error } = await supabaseAdmin
      .from('menu_items')
      .insert({
        menu_id: menuId,
        menu_category_id: categoryId,
        name: item.name,
        description: item.description || '',
        price_cents: Math.round(item.price * 100),
        is_visible: true,
        is_archived: false,
        position: i
      })
    
    if (error) {
      console.error(`      ❌ Error creating item "${item.name}":`, error.message)
      throw error
    }
    
    createdCount++
  }
  
  if (createdCount > 0) {
    console.log(`      ✅ Created ${createdCount} items`)
  }
}

async function seedLateNightMenu(businessId: string): Promise<void> {
  console.log(`\nStep 2: Seeding Late Night menu...`)
  
  const menuId = await getOrCreateMenu(businessId, 'Late Night')
  
  // Delete all existing late night items and categories
  await deleteAllLateNightItemsAndCategories(menuId)
  
  // Create new categories and items
  for (const category of LATE_NIGHT_CATEGORIES) {
    console.log(`  Processing category: ${category.name}`)
    const categoryId = await createCategory(menuId, category)
    await createMenuItems(menuId, categoryId, category.items)
  }
}

async function seedComplete() {
  try {
    console.log('🌱 Starting Late Night menu seeder for Johnny G\'s Brunch...\n')
    
    // Step 1: Get business ID
    const businessId = await getBusinessId()
    
    // Step 2: Seed Late Night menu
    await seedLateNightMenu(businessId)
    
    // Step 3: Verification
    console.log('\n📋 Final Verification:')
    
    const { data: menus } = await supabaseAdmin
      .from('menus')
      .select('id, name, business_id')
      .eq('business_id', businessId)
      .eq('name', 'Late Night')
    
    console.log(`   Late Night Menu: ${menus?.length || 0}`)
    if (menus && menus.length > 0) {
      for (const menu of menus) {
        const { data: categories } = await supabaseAdmin
          .from('menu_categories')
          .select('id, name')
          .eq('menu_id', menu.id)
        
        const { data: items } = await supabaseAdmin
          .from('menu_items')
          .select('id, name')
          .eq('menu_id', menu.id)
          .eq('is_archived', false)
        
        console.log(`     ${menu.name}: ${categories?.length || 0} categories, ${items?.length || 0} active items`)
      }
    }
    
    console.log('\n✅ Late Night menu seeder finished successfully!')
    console.log(`\n   Business Slug: ${BUSINESS_SLUG}`)
    console.log(`   Late Night Menu: ${LATE_NIGHT_CATEGORIES.length} categories`)
    
  } catch (error) {
    console.error('❌ Error in Late Night menu seeder:', error)
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

