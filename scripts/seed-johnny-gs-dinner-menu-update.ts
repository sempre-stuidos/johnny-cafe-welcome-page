/**
 * Seeder to update Johnny G's Dinner Menu
 * Updates the dinner menu with new items and categories
 * 
 * Usage: npx tsx scripts/seed-johnny-gs-dinner-menu-update.ts
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
  description: string
}

interface CategoryData {
  slug: string
  name: string
  sortOrder: number
  items: MenuItemInput[]
}

const DINNER_CATEGORIES: CategoryData[] = [
  {
    slug: 'soups',
    name: 'SOUPS',
    sortOrder: 1,
    items: [
      {
        name: 'Crab Meat Symphony',
        price: 16,
        description: 'A rich coastal broth gently simmered with sweet crab, Rice wine, and fresh herbs. Elegant, comforting, unforgettable.'
      },
      {
        name: 'French Caramelized Onion (VEG)',
        price: 15,
        description: 'Deeply caramelized onions, a toasted baguette, and molten cheese — a timeless classic executed with finesse.'
      },
      {
        name: 'Manchow Soup VEG / V',
        price: 12,
        description: 'A bold Indo-Chinese broth layered with garlic, soy, and chilies, crowned with crispy noodles for the perfect crunch.'
      },
      {
        name: 'Manchow Soup Chicken',
        price: 14,
        description: 'A bold Indo-Chinese broth layered with garlic, soy, and chilies, crowned with crispy noodles for the perfect crunch.'
      },
      {
        name: 'Creamy Tomato Shorba (V)',
        price: 13,
        description: 'Slow-roasted tomatoes blended into a silky, aromatic shorba with warm spices and a touch of coconut cream.'
      }
    ]
  },
  {
    slug: 'starters',
    name: 'STARTERS',
    sortOrder: 2,
    items: [
      {
        name: 'Beef Carpaccio',
        price: 19,
        description: 'Hand-sliced tenderloin, wild arugula, shaved parmesan, and cold-pressed olive oil — pure elegance on a plate.'
      },
      {
        name: 'Old School Prawns',
        price: 19,
        description: 'Juicy prawns sautéed with peppers, coconut, and a soft infusion of spice — nostalgic, bold, and addictive.'
      },
      {
        name: 'Grilled Duck Breast',
        price: 16,
        description: 'Tender slices of expertly grilled duck, lightly seasoned and finished with a chef\'s glaze.'
      },
      {
        name: 'Peking Duck Spring Rolls',
        price: 15,
        description: 'Crisp, golden rolls filled with aromatic duck, served with house hoisin-plum dip.'
      },
      {
        name: 'Tandoori Tikka Chicken',
        price: 16,
        description: 'Marinated overnight, flame-roasted, and finished with lime & coriander — vibrant and smoky.'
      },
      {
        name: 'Tandoori Tikka Tofu (V)',
        price: 15,
        description: 'Marinated overnight, flame-roasted, and finished with lime & coriander — vibrant and smoky.'
      },
      {
        name: 'Stuffed Chicken Wings',
        price: 14,
        description: 'Crispy wings filled with creamy risotto, herbs, and parmesan — a refined twist on comfort.'
      },
      {
        name: 'Samosa Trio Veg (V)',
        price: 13,
        description: 'Choose Veg (V), Chicken, or Beef — served with mint-tamarind chutney.'
      },
      {
        name: 'Samosa Trio Chicken',
        price: 13,
        description: 'Choose Veg (V), Chicken, or Beef — served with mint-tamarind chutney.'
      },
      {
        name: 'Samosa Trio Beef',
        price: 13,
        description: 'Choose Veg (V), Chicken, or Beef — served with mint-tamarind chutney.'
      },
      {
        name: 'Cauliflower Bites (V)',
        price: 12,
        description: 'Crispy golden florets tossed in chef\'s signature seasoning — light, crunchy, flavour-forward.'
      },
      {
        name: 'Chicken Momos',
        price: 15,
        description: 'Nepalese-style dumplings, steamed or pan-fried, served with fire-kissed chili sauce.'
      }
    ]
  },
  {
    slug: 'mains',
    name: '◆ MAINS',
    sortOrder: 3,
    items: [
      {
        name: 'Striploin Steak 8oz',
        price: 30,
        description: 'Prime striploin grilled to perfection, rested, and served with chef\'s signature seasoning blend served with mashed potatos & veggies.'
      },
      {
        name: 'Spaghetti Bolognese',
        price: 26,
        description: 'A slow-reduced ragù of beef, tomatoes, and herbs finished with parmesan and olive oil.'
      },
      {
        name: 'Triple Stack JohnnyG\'s Burger',
        price: 26,
        description: 'Three juicy patties, bacon, mushrooms, melted cheese, and French fries — indulgence at its best.'
      },
      {
        name: 'Butter Chicken',
        price: 24,
        description: 'Tender chicken simmered in a velvety tomato-butter sauce with warm spices and cream.'
      },
      {
        name: 'Chicken Tikka Masala',
        price: 24,
        description: 'Char-grilled chicken folded into a bold, deeply spiced masala reduction.'
      },
      {
        name: 'Curry Chicken',
        price: 23,
        description: 'Choose your global curry style: Spinach Cream — silky & earthy, Rogan — aromatic Kashmiri red curry, Cashew Cream 🥜 — rich & nutty, Mango — sweet, bright & tropical, Vindaloo 🌶 — fiery Goan heat, Bell Pepper Masala — coconut milk & curry leaf'
      },
      {
        name: 'Curry Lamb',
        price: 26,
        description: 'Choose your global curry style: Spinach Cream — silky & earthy, Rogan — aromatic Kashmiri red curry, Cashew Cream 🥜 — rich & nutty, Mango — sweet, bright & tropical, Vindaloo 🌶 — fiery Goan heat, Bell Pepper Masala — coconut milk & curry leaf'
      },
      {
        name: 'Boneless Lamb Curry',
        price: 26,
        description: 'Slow-braised lamb in your choice of Spinach, Rogan, Bell Pepper Masala, or Vindaloo 🌶'
      },
      {
        name: 'Striploin Steak Curry',
        price: 26,
        description: 'Prime steak enriched with your choice of Rogan, Spinach, Bell Pepper Masala, or Vindaloo'
      }
    ]
  },
  {
    slug: 'seafood_specialties',
    name: 'SEAFOOD SPECIALTIES',
    sortOrder: 4,
    items: [
      {
        name: 'Braised Octopus',
        price: 26,
        description: 'Slow-braised, flame-kissed octopus served with herb potatoes and a luxurious almond-cream finish. 🥜'
      },
      {
        name: 'Halibut Fish & Chips',
        price: 28,
        description: 'Crisp golden halibut with French fries and house tartar. Upgrade: Add Vindaloo dipping sauce for an extra kick.'
      },
      {
        name: 'Halibut Fish Curry',
        price: 28,
        description: 'Choose from: Coconut Cream 🥜, Rogan, Mango, Bell Pepper Masala, or Vindaloo 🌶'
      },
      {
        name: 'Tiger Shrimp Curry',
        price: 28,
        description: 'Jumbo shrimp in your choice of Coconut Cream 🥜, Mango, Bell Pepper Masala, or Vindaloo 🌶'
      }
    ]
  },
  {
    slug: 'hakka_specials',
    name: 'HAKKA SPECIALS',
    sortOrder: 5,
    items: [
      {
        name: 'Shredded Lamb',
        price: 26,
        description: 'Choose your style: Black Bean · Chilli Dry 🌶 · Hot Garlic'
      },
      {
        name: 'Shredded Beef',
        price: 26,
        description: 'Choose your style: Black Bean · Chilli Dry 🌶 · Hot Garlic'
      },
      {
        name: 'Veg Fried Rice',
        price: 18,
        description: 'Wok-Cooked. Cabbage, carrots, green onions, soy. Add Chicken — $21 · Add Seafood — $26'
      },
      {
        name: 'Veg Fried Noodles',
        price: 21,
        description: 'Wok-Cooked. Cabbage, carrots, green onions, soy. Add Chicken — $21 · Add Seafood — $26'
      }
    ]
  },
  {
    slug: 'veg_vegan_specialties',
    name: 'VEG & VEGAN SPECIALTIES',
    sortOrder: 6,
    items: [
      {
        name: 'Paneer Curries (VEG)',
        price: 16,
        description: 'Choose Spinach, Butter Sauce, or Pepper Masala.'
      },
      {
        name: 'Dal Makhani (VEG)',
        price: 19,
        description: 'Black lentils slow-simmered overnight, finished with cream & butter.'
      },
      {
        name: 'Aloo Gobi (V)',
        price: 16,
        description: 'Potatoes and cauliflower infused with turmeric, cumin & coriander.'
      },
      {
        name: 'Broccoli Stir-Fry (V)',
        price: 16,
        description: 'Choose Hot Garlic 🌶, Black Bean, or Chilli 🌶.'
      },
      {
        name: 'Channa Masala (V)',
        price: 16,
        description: 'Chickpeas simmered in tomato-onion masala with fresh cilantro.'
      },
      {
        name: 'Eggplant Bharta (V)',
        price: 15,
        description: 'Fire-roasted eggplant mashed with spices and herbs — rustic & smoky.'
      }
    ]
  },
  {
    slug: 'bread_selection',
    name: 'BREAD SELECTION',
    sortOrder: 7,
    items: [
      {
        name: 'Plain Naan',
        price: 3,
        description: 'Tandoori & Griddle'
      },
      {
        name: 'Butter Naan',
        price: 3.50,
        description: 'Tandoori & Griddle'
      },
      {
        name: 'Garlic Butter Naan',
        price: 4,
        description: 'Tandoori & Griddle'
      },
      {
        name: 'Roti',
        price: 3,
        description: 'Tandoori & Griddle'
      },
      {
        name: 'Butter Roti',
        price: 3.50,
        description: 'Tandoori & Griddle'
      }
    ]
  },
  {
    slug: 'rice_selection',
    name: 'RICE SELECTION',
    sortOrder: 8,
    items: [
      {
        name: 'Steamed Basmati Rice (V)',
        price: 5,
        description: 'Fluffy, fragrant long-grain basmati.'
      },
      {
        name: 'Jeera Rice (V)',
        price: 7,
        description: 'Cumin-tempered, warm & aromatic.'
      },
      {
        name: 'Saffron Rice (VEG)',
        price: 7,
        description: 'Gently perfumed with saffron and aromatic spices.'
      },
      {
        name: 'Vegetable Biryani (V)',
        price: 22,
        description: 'Market vegetables layered with spiced basmati & herbs.'
      },
      {
        name: 'Chicken Biryani',
        price: 25,
        description: 'Tender marinated chicken baked with saffron basmati.'
      },
      {
        name: 'Steak Biryani',
        price: 27,
        description: 'Boneless Striploin pieces folded into aromatic biryani masala.'
      },
      {
        name: 'Lamb Biryani',
        price: 27,
        description: 'Boneless Striploin pieces folded into aromatic biryani masala.'
      },
      {
        name: 'Tiger Prawn Biryani',
        price: 29,
        description: 'Jumbo prawns baked with fragrant masala and herbs.'
      }
    ]
  },
  {
    slug: 'sides_accompaniments',
    name: 'SIDES & ACCOMPANIMENTS',
    sortOrder: 9,
    items: [
      {
        name: 'Steamed Basmati Rice (V)',
        price: 6,
        description: ''
      },
      {
        name: 'Raita (VEG)',
        price: 5,
        description: 'Cucumber-mint yogurt to cool the palate.'
      },
      {
        name: 'Mixed Pickle (V)',
        price: 5,
        description: 'A punchy, tangy, traditional accompaniment.'
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

async function deleteAllDinnerItemsAndCategories(menuId: number): Promise<void> {
  console.log('  🗑️  Deleting all existing dinner items and categories...')
  
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
  
  console.log('  ✅ Deleted all existing dinner items and categories')
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
        description: item.description,
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

async function seedDinnerMenu(businessId: string): Promise<void> {
  console.log(`\nStep 2: Updating Dinner menu...`)
  
  const menuId = await getOrCreateMenu(businessId, 'Dinner')
  
  // Delete all existing dinner items and categories
  await deleteAllDinnerItemsAndCategories(menuId)
  
  // Create new categories and items
  for (const category of DINNER_CATEGORIES) {
    console.log(`  Processing category: ${category.name}`)
    const categoryId = await createCategory(menuId, category)
    await createMenuItems(menuId, categoryId, category.items)
  }
}

async function seedComplete() {
  try {
    console.log('🌱 Starting dinner menu update seeder for Johnny G\'s Brunch...\n')
    
    // Step 1: Get business ID
    const businessId = await getBusinessId()
    
    // Step 2: Update Dinner menu
    await seedDinnerMenu(businessId)
    
    // Step 3: Verification
    console.log('\n📋 Final Verification:')
    
    const { data: menus } = await supabaseAdmin
      .from('menus')
      .select('id, name, business_id')
      .eq('business_id', businessId)
      .eq('name', 'Dinner')
    
    console.log(`   Dinner Menu: ${menus?.length || 0}`)
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
    
    console.log('\n✅ Dinner menu update seeder finished successfully!')
    console.log(`\n   Business Slug: ${BUSINESS_SLUG}`)
    console.log(`   Dinner Menu: ${DINNER_CATEGORIES.length} categories`)
    
  } catch (error) {
    console.error('❌ Error in dinner menu update seeder:', error)
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
