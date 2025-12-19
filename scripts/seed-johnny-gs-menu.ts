/**
 * Seeder for Johnny G's Brunch Menu
 * Creates Breakfast and Dinner menus with all categories and items
 * 
 * Usage: npx tsx scripts/seed-johnny-gs-menu.ts
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

const BREAKFAST_CATEGORIES: CategoryData[] = [
  {
    slug: 'basic',
    name: 'Basic',
    sortOrder: 1,
    items: [
      {
        name: 'Breakfast Tea/Coffee',
        price: 1.25,
        description: 'Fresh brewed tea or coffee served with breakfast.'
      }
    ]
  },
  {
    slug: 'breakfast',
    name: 'Breakfast',
    sortOrder: 2,
    items: [
      {
        name: 'English Breakfast',
        price: 13.99,
        description: '3 scrambled eggs and 4 sausages served with brown beans.'
      },
      {
        name: 'Grand Slam Breakfast',
        price: 14.99,
        description: '3 eggs with 2 bacons, 2 sausages, and 2 hams. Extra $4 for peameal bacon.'
      },
      {
        name: 'Continental Breakfast',
        price: 14.99,
        description: '3 scrambled eggs, 2 sausages, sautéed mushrooms, tomatoes, and mozzarella cheese.'
      },
      {
        name: 'Big Breakfast',
        price: 11.99,
        description: '3 eggs with choice of 4 bacons or 4 sausages or 4 hams.'
      },
      {
        name: 'Veggie Breakfast',
        price: 15.99,
        description: '3 eggs with avocado, sautéed mushrooms, bell peppers, spinach, and tomatoes.'
      },
      {
        name: 'Steak in Breakfast',
        price: 19.99,
        description: '3 eggs served with a 6oz steak cooked rare, medium rare, or well done.'
      },
      {
        name: 'Corned Beef Hash with Eggs',
        price: 13.99,
        description: '3 eggs with chopped corned beef, bell peppers, and pickled cabbage.'
      },
      {
        name: 'No Meat Breakfast',
        price: 10.99,
        description: '3 eggs served with sliced cucumber and tomatoes.'
      },
      {
        name: 'Peameal Bacon Breakfast',
        price: 14.99,
        description: '3 eggs served with 3 slices of peameal bacon.'
      },
      {
        name: 'Five Star Breakfast',
        price: 15.99,
        description: '3 eggs with 2 sausages, 2 ham, and 2 slices of peameal bacon.'
      }
    ]
  },
  {
    slug: 'eggs_benedict',
    name: 'Eggs Benedict',
    sortOrder: 3,
    items: [
      {
        name: 'Peameal Eggs Benedict',
        price: 15.99,
        description: '3 poached eggs with peameal bacon and homemade Hollandaise sauce.'
      },
      {
        name: 'Meat Benedict',
        price: 17.99,
        description: '3 poached eggs with lamb, sausages, or bacon, with Swiss cheese and Hollandaise sauce.'
      },
      {
        name: 'Veggie Benedict',
        price: 14.99,
        description: '3 poached eggs with avocado, sautéed bell peppers, onions, and grilled tomatoes.'
      },
      {
        name: 'Florentine Benedict',
        price: 14.99,
        description: '3 poached eggs served with sautéed spinach and Hollandaise sauce.'
      },
      {
        name: 'Parisian Benedict',
        price: 14.99,
        description: '3 poached eggs served with sautéed mushrooms and Hollandaise sauce.'
      },
      {
        name: 'Ham Benedict',
        price: 14.99,
        description: '3 poached eggs served with grilled ham and Hollandaise sauce.'
      },
      {
        name: 'Egg Neptune Benedict',
        price: 15.99,
        description: '3 poached eggs with smoked salmon and Hollandaise sauce.'
      }
    ]
  },
  {
    slug: 'omelettes',
    name: 'Omelettes',
    sortOrder: 4,
    items: [
      {
        name: 'Western Omelette',
        price: 13.99,
        description: 'Eggs cooked with chopped ham, bell peppers, and white onions.'
      },
      {
        name: 'Cheese Omelette',
        price: 13.99,
        description: 'Eggs cooked with real cheddar or Swiss cheese.'
      },
      {
        name: 'Mushroom Omelette',
        price: 13.99,
        description: 'Eggs cooked with sautéed mushrooms.'
      },
      {
        name: 'Spinach and Feta Cheese Omelette',
        price: 15.99,
        description: 'Eggs cooked with sautéed spinach and feta cheese.'
      },
      {
        name: 'Meat Lover Omelette',
        price: 15.99,
        description: 'Eggs cooked with chopped ham, bacon, sausages, and corned beef.'
      },
      {
        name: 'All-In Omelette',
        price: 16.99,
        description: 'Eggs cooked with ham, bacon, sausages, bell peppers, mushrooms, spinach, and Swiss cheese.'
      },
      {
        name: 'Smoked Salmon Omelette',
        price: 15.99,
        description: 'Eggs cooked with smoked salmon.'
      },
      {
        name: 'Canadian Omelette',
        price: 14.99,
        description: 'Eggs cooked with chopped bacon, sautéed mushrooms, and real cheddar cheese.'
      },
      {
        name: 'Florentine Omelette',
        price: 14.99,
        description: 'Eggs cooked with sautéed spinach and Swiss cheese.'
      },
      {
        name: 'Veggie Omelette',
        price: 13.99,
        description: 'Eggs cooked with mushrooms, spinach, onions, and bell peppers.'
      },
      {
        name: 'Triple Cheese Omelette',
        price: 15.99,
        description: 'Eggs cooked with Swiss, mozzarella, and real cheddar cheese.'
      },
      {
        name: 'Guacamole Omelette',
        price: 14.99,
        description: 'Eggs cooked with guacamole paste and Swiss cheese.'
      }
    ]
  },
  {
    slug: 'pancake_waffle_frenchtoast',
    name: 'Pancake, Waffle & French Toast',
    sortOrder: 5,
    items: [
      {
        name: 'Combo with Meat and Egg',
        price: 16.99,
        description: 'Pancakes, French toast, or a whole waffle with 2 meats and 2 eggs.'
      },
      {
        name: 'Combo with Meat',
        price: 15.99,
        description: 'Pancakes, French toast, or a waffle with 2 sausages, 2 ham, and 2 bacon.'
      },
      {
        name: 'Combo with Banana and Chocolate Chips',
        price: 15.99,
        description: 'Pancakes, French toast, or a waffle topped with banana and chocolate chips.'
      },
      {
        name: 'Plain Whole Waffle',
        price: 10.99,
        description: 'Classic whole waffle served with syrup.'
      },
      {
        name: 'Plain Pancake',
        price: 6.99,
        description: 'Traditional pancake served with syrup.'
      },
      {
        name: 'Plain French Toast',
        price: 4.99,
        description: 'Classic French toast served with syrup.'
      }
    ]
  },
  {
    slug: 'sandwiches',
    name: 'Sandwiches',
    sortOrder: 6,
    items: [
      {
        name: 'Western Sandwich',
        price: 13.99,
        description: 'Eggs cooked with mayo, onions, and bell peppers served with choice of toast.'
      },
      {
        name: 'BLT Sandwich',
        price: 13.99,
        description: 'Bacon, lettuce, tomato, and mayonnaise on toasted bread.'
      },
      {
        name: 'Tuna Sandwich',
        price: 14.99,
        description: 'Flaked white tuna with chopped onion and bell pepper on toasted bread.'
      },
      {
        name: 'Bacon and Egg Sandwich',
        price: 14.99,
        description: 'Toasted bread stuffed with over-hard eggs and bacon.'
      },
      {
        name: 'Grilled Cheddar Cheese Sandwich',
        price: 12.99,
        description: 'Grilled bread stuffed with cheddar or Swiss cheese.'
      },
      {
        name: 'Grilled Bacon and Cheese Sandwich',
        price: 13.99,
        description: 'Grilled bread stuffed with bacon and cheese.'
      },
      {
        name: 'Club House Sandwich',
        price: 15.99,
        description: '3-slice toasted sandwich with lettuce, tomato, mayo, grilled chicken, and bacon.'
      },
      {
        name: 'New York Steak in Ciabatta Bun',
        price: 17.99,
        description: '6oz striploin steak in a grilled ciabatta bun cooked rare, medium rare, or well done.'
      },
      {
        name: 'Corned Beef on Rye Bread',
        price: 16.99,
        description: 'Grilled corned beef on toasted rye bread with mustard.'
      },
      {
        name: 'Peameal Bacon Sandwich in Swiss Cheese',
        price: 15.99,
        description: 'Peameal bacon and Swiss cheese in a ciabatta bun.'
      },
      {
        name: 'Philly Steak Sandwich in Ciabatta Bun',
        price: 17.99,
        description: 'Roasted beef with mushrooms, bell peppers, onions, and Swiss cheese.'
      },
      {
        name: 'Pulled Pork Sandwich',
        price: 17.99,
        description: 'Pulled pork with barbecue sauce, onion rings, and coleslaw in a ciabatta bun.'
      },
      {
        name: 'Grilled Chicken Sandwich in Ciabatta Bun',
        price: 15.99,
        description: 'Grilled chicken, lettuce, and tomato in a ciabatta bun.'
      }
    ]
  },
  {
    slug: 'burgers',
    name: 'Burgers',
    sortOrder: 7,
    items: [
      {
        name: 'Johnny G\'s Burger',
        price: 17.0,
        description: 'Homemade grilled beef burger with bacon, sautéed mushrooms, Swiss cheese, and toppings.'
      },
      {
        name: 'Banquet Burger',
        price: 16.0,
        description: 'Homemade grilled beef burger with bacon, cheddar cheese, and toppings.'
      },
      {
        name: 'Cheese Burger',
        price: 15.0,
        description: 'Beef burger with cheddar or Swiss cheese and toppings.'
      },
      {
        name: 'Grilled Chicken Burger',
        price: 17.0,
        description: 'Grilled chicken breast with cheddar or Swiss cheese and toppings.'
      },
      {
        name: 'Crispy Chicken Burger',
        price: 16.0,
        description: 'Deep-fried battered chicken breast with toppings.'
      },
      {
        name: 'Potato Tikki Burger (Vegan)',
        price: 15.0,
        description: 'Deep-fried battered potato patty with toppings.'
      }
    ]
  },
  {
    slug: 'salads',
    name: 'Salads',
    sortOrder: 8,
    items: [
      {
        name: 'House Salad',
        price: 12.0,
        description: 'Lettuce with cucumber, tomato, and onion with choice of dressing.'
      },
      {
        name: 'Caesar Salad',
        price: 13.0,
        description: 'Romaine lettuce with croutons, bacon, Caesar dressing, and Parmesan.'
      },
      {
        name: 'Greek Salad',
        price: 13.0,
        description: 'Lettuce with cucumber, tomato, onion, bell peppers, olives, and feta.'
      },
      {
        name: 'Garden Salad',
        price: 12.0,
        description: 'Fresh greens with house dressing.'
      }
    ]
  },
  {
    slug: 'lunch_entree',
    name: 'Lunch Entree',
    sortOrder: 9,
    items: [
      {
        name: 'New York Steak',
        price: 22.0,
        description: 'Grilled striploin steak with mashed potato, sautéed vegetables, and creamy peppercorn sauce.'
      },
      {
        name: 'Johnny G\'s Philly Steak',
        price: 22.0,
        description: 'Roasted beef in brown sauce with sautéed vegetables and Cajun mashed potatoes.'
      },
      {
        name: 'Halibut Fish and Chips',
        price: 22.0,
        description: '8oz fried halibut with fries, tartar sauce, and coleslaw.'
      },
      {
        name: 'Corned Beef Pickled Cabbage Roll',
        price: 22.0,
        description: 'Corned beef rolled in homemade pickled cabbage with vegetables and Cajun mashed potato.'
      },
      {
        name: 'Wild Grilled Salmon',
        price: 22.0,
        description: '8oz wild salmon with vegetables and Cajun mashed potato.'
      },
      {
        name: 'Spaghetti with Meat Balls',
        price: 22.0,
        description: 'Homemade meatballs in tomato sauce served with garlic bread.'
      },
      {
        name: 'Chicken Fettuccine Alfredo',
        price: 22.0,
        description: 'Grilled chicken with garlic, basil, oregano, and Parmesan cream served with garlic bread.'
      },
      {
        name: 'Creamy Parisian Pasta',
        price: 22.0,
        description: 'Sautéed mushrooms with cream, basil, and Parmesan served with garlic bread.'
      },
      {
        name: 'Garden Vegetable Penne Pasta',
        price: 22.0,
        description: 'Vegetables in marinara sauce served with garlic bread.'
      },
      {
        name: 'Butter Chicken with Rice',
        price: 25.0,
        description: 'Tandoori chicken cooked in creamy tomato sauce served with basmati rice.'
      }
    ]
  },
  {
    slug: 'side_orders',
    name: 'Side Orders',
    sortOrder: 10,
    items: [
      { name: 'Sausage (4)', price: 5.0, description: 'Four sausages.' },
      { name: 'Bacon (4)', price: 5.0, description: 'Four slices of bacon.' },
      { name: 'Ham (4)', price: 5.0, description: 'Four slices of ham.' },
      { name: 'Peameal Bacon (2)', price: 5.0, description: 'Two slices of peameal bacon.' },
      { name: 'Eggs (3)', price: 4.0, description: 'Three eggs cooked to your liking.' },
      { name: 'Brown Beans', price: 4.0, description: 'Side of brown beans.' },
      { name: 'Egg White', price: 6.0, description: 'Side of egg whites.' },
      { name: 'Toast (White/Brown)', price: 3.0, description: 'Two slices of toast.' },
      { name: 'Gravy', price: 3.0, description: 'Side of gravy.' },
      { name: 'Coleslaw', price: 4.0, description: 'Side of coleslaw.' },
      { name: 'Onion Rings', price: 9.0, description: 'Crispy onion rings.' },
      { name: 'Sweet Potato', price: 9.0, description: 'Sweet potato fries.' },
      { name: 'Poutine', price: 10.0, description: 'Fries with cheese curds and gravy.' },
      { name: 'French Fries (Small)', price: 6.0, description: 'Small fries.' }
    ]
  }
]

const DINNER_CATEGORIES: CategoryData[] = [
  {
    slug: 'soup',
    name: 'Soup',
    sortOrder: 1,
    items: [
      {
        name: 'Tomato Soup',
        price: 10,
        description: 'Fresh Tomato Puree Cooked with Cream and Indian spices.'
      },
      {
        name: 'Mulligatawny Soup',
        price: 10,
        description: 'Yellow lentils and green apple cooked with coconut milk and Indian spices.'
      }
    ]
  },
  {
    slug: 'appetizers',
    name: 'Appetizers',
    sortOrder: 2,
    items: [
      {
        name: 'Vegetable Samosa(2 pcs)',
        price: 7,
        description: 'Cube potato, green peas and Indian spices stuffed in pastries.'
      },
      {
        name: 'Onion Bhajis (2pcs)',
        price: 7,
        description: 'Deep fried sliced onion mixed with Indian spices, chickpeas flour and served with mint and tamarind .'
      },
      {
        name: 'Fried Aloo Tikki',
        price: 10,
        description: 'Breaded mashed potato stuffed with yellow dry lentil,coconut milk and Indianspices.'
      },
      {
        name: 'Cauliflower Bites',
        price: 12,
        description: 'Batter deep fried cauliflower cooked with Chef \'s special souce.'
      },
      {
        name: 'Tandoori Chicken Legs',
        price: 15,
        description: 'Over night marinated chicken legs mix with yogurt and cooked in clay tandoori oven.'
      },
      {
        name: 'Chicken 65',
        price: 15,
        description: 'Batter fried boneless dark meat cooked with spicy South Indian spices.'
      },
      {
        name: 'Chicken Tikka',
        price: 15,
        description: 'Over night marinated boneless chicken mixed with yogurt and cooked in clay tandoori oven.'
      }
    ]
  },
  {
    slug: 'mains',
    name: 'Mains',
    sortOrder: 3,
    items: [
      {
        name: 'Butter Chicken',
        price: 22,
        description: 'Roasted boneless chicken tikka cooked in rich tomato sauce.'
      },
      {
        name: 'Tikka Masala (Paneer)',
        price: 20,
        description: 'Roasted boneless chicken tikka or paneer tikka cooked with bell peppers and Indian spices.'
      },
      {
        name: 'Tikka Masala (chicken)',
        price: 22,
        description: 'Roasted boneless chicken tikka or paneer tikka cooked with bell peppers and Indian spices.'
      },
      {
        name: 'Chattnad (chicken)',
        price: 22,
        description: 'Boneless chicken/lamb cooked with coconut milk and spicy South Indian spices.'
      },
      {
        name: 'Chattnad (lamb)',
        price: 26,
        description: 'Boneless chicken/lamb cooked with coconut milk and spicy South Indian spices.'
      },
      {
        name: 'Saag (panner)',
        price: 20,
        description: 'Paneer/boneless chicken/lamb cooked in Spinach puree with Indian spices.'
      },
      {
        name: 'Saag (chicken)',
        price: 22,
        description: 'Paneer/boneless chicken/lamb cooked in Spinach puree with Indian spices.'
      },
      {
        name: 'Saag (lamb or steak)',
        price: 26,
        description: 'Paneer/boneless chicken/lamb cooked in Spinach puree with Indian spices.'
      },
      {
        name: 'Vindaloo (chicken)',
        price: 22,
        description: 'Boneless chicken/lamb/steak cooked in Indian spice with red wine vinegar and served with spicy sauce.'
      },
      {
        name: 'Vindaloo (lamb or steak)',
        price: 26,
        description: 'Boneless chicken/lamb/steak cooked in Indian spice with red wine vinegar and served with spicy sauce.'
      },
      {
        name: 'Rogan Josh (chicken)',
        price: 22,
        description: 'Boneless chicken/lamb/steak cooked with saffron and Indian spices.'
      },
      {
        name: 'Rogan Josh (lamb or steak)',
        price: 26,
        description: 'Boneless chicken/lamb/steak cooked with saffron and Indian spices.'
      },
      {
        name: 'Lime Masala (chicken)',
        price: 22,
        description: 'Boneless chicken/lamb/ steak meat cooked with lemon grass,bell peppers and coconut milk.'
      },
      {
        name: 'Lime Masala (lamb or steak)',
        price: 26,
        description: 'Boneless chicken/lamb/ steak meat cooked with lemon grass,bell peppers and coconut milk.'
      },
      {
        name: 'Fish Curry',
        price: 27,
        description: 'Halibut fish cooked with Indian spices and coconut milk.'
      },
      {
        name: 'Coconut Prawn Curry',
        price: 27,
        description: 'Crest coconut cooked with tiger shrimps ,dill leaves and Indian spices'
      },
      {
        name: 'Bottman Curry(CHEF\'S SPECIAL)',
        price: 30,
        description: 'Combination of tiger shrimps,scallop fish and calamari cooked in chef \'s special sauce.'
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

async function getOrCreateCategory(
  menuId: number,
  category: CategoryData
): Promise<number> {
  // Check if category already exists
  const { data: existingCategory } = await supabaseAdmin
    .from('menu_categories')
    .select('id, name, slug')
    .eq('menu_id', menuId)
    .eq('slug', category.slug)
    .maybeSingle()
  
  if (existingCategory) {
    console.log(`    ✅ Category "${category.name}" already exists (ID: ${existingCategory.id})`)
    return existingCategory.id
  }
  
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
  let skippedCount = 0
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    
    // Check if item already exists
    const { data: existingItem } = await supabaseAdmin
      .from('menu_items')
      .select('id, name')
      .eq('menu_id', menuId)
      .eq('name', item.name)
      .maybeSingle()
    
    if (existingItem) {
      skippedCount++
      continue
    }
    
    // Create item
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
    console.log(`      ✅ Created ${createdCount} items, skipped ${skippedCount} existing`)
  } else if (skippedCount > 0) {
    console.log(`      ⏭️  All ${skippedCount} items already exist`)
  }
}

async function seedMenu(businessId: string, menuName: string, categories: CategoryData[]): Promise<void> {
  console.log(`\nStep 2: Seeding ${menuName} menu...`)
  
  const menuId = await getOrCreateMenu(businessId, menuName)
  
  for (const category of categories) {
    console.log(`  Processing category: ${category.name}`)
    const categoryId = await getOrCreateCategory(menuId, category)
    await createMenuItems(menuId, categoryId, category.items)
  }
}

async function seedComplete() {
  try {
    console.log('🌱 Starting menu seeder for Johnny G\'s Brunch...\n')
    
    // Step 1: Get business ID
    const businessId = await getBusinessId()
    
    // Step 2: Seed Breakfast menu
    await seedMenu(businessId, 'Breakfast', BREAKFAST_CATEGORIES)
    
    // Step 3: Seed Dinner menu
    await seedMenu(businessId, 'Dinner', DINNER_CATEGORIES)
    
    // Step 4: Verification
    console.log('\n📋 Final Verification:')
    
    const { data: menus } = await supabaseAdmin
      .from('menus')
      .select('id, name, business_id')
      .eq('business_id', businessId)
    
    console.log(`   Menus: ${menus?.length || 0}`)
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
        
        console.log(`     ${menu.name}: ${categories?.length || 0} categories, ${items?.length || 0} items`)
      }
    }
    
    console.log('\n✅ Menu seeder finished successfully!')
    console.log(`\n   Business Slug: ${BUSINESS_SLUG}`)
    console.log(`   Breakfast Menu: ${BREAKFAST_CATEGORIES.length} categories`)
    console.log(`   Dinner Menu: ${DINNER_CATEGORIES.length} categories`)
    
  } catch (error) {
    console.error('❌ Error in menu seeder:', error)
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

