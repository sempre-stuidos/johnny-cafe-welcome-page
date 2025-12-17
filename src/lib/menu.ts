import { supabaseAdmin } from './supabase'

export interface MenuItemData {
  name: string
  price: number
  description: string
}

interface MenuData {
  brunch: {
    basic?: MenuItemData[]
    breakfast?: MenuItemData[]
    eggsBenedict?: MenuItemData[]
    omelettes?: MenuItemData[]
    pancakeWaffleFrenchtoast?: MenuItemData[]
    sandwiches?: MenuItemData[]
    burgers?: MenuItemData[]
    salads?: MenuItemData[]
    lunchEntree?: MenuItemData[]
    sideOrders?: MenuItemData[]
  }
  dinner: {
    soup?: MenuItemData[]
    appetizers?: MenuItemData[]
    mains?: MenuItemData[]
  }
}

/**
 * Get all menus for a business by slug
 */
export async function getMenusForBusiness(businessSlug: string) {
  try {
    // First get business by slug
    const { data: businesses, error: businessError } = await supabaseAdmin
      .from('businesses')
      .select('id, name, slug')
      .eq('slug', businessSlug)
      .limit(1)

    if (businessError || !businesses || businesses.length === 0) {
      console.error('Error fetching business:', businessError)
      return []
    }

    const business = businesses[0]

    // Get all menus for this business
    const { data: menus, error: menusError } = await supabaseAdmin
      .from('menus')
      .select('id, name, description, is_active')
      .eq('business_id', business.id)
      .eq('is_active', true)
      .order('name', { ascending: true })

    if (menusError) {
      console.error('Error fetching menus:', menusError)
      return []
    }

    return menus || []
  } catch (error) {
    console.error('Error in getMenusForBusiness:', error)
    return []
  }
}

/**
 * Get categories for a menu
 */
export async function getMenuCategories(menuId: string | number, menuType?: string) {
  try {
    let query = supabaseAdmin
      .from('menu_categories')
      .select('id, name, slug, sort_order, menu_type')
      .eq('menu_id', menuId)
      .eq('is_active', true)

    if (menuType) {
      query = query.eq('menu_type', menuType)
    }

    const { data: categories, error } = await query
      .order('sort_order', { ascending: true })
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching menu categories:', error)
      return []
    }

    return categories || []
  } catch (error) {
    console.error('Error in getMenuCategories:', error)
    return []
  }
}

/**
 * Get menu items for a category
 */
export async function getMenuItemsByCategory(categoryId: number): Promise<MenuItemData[]> {
  try {
    const { data: items, error } = await supabaseAdmin
      .from('menu_items')
      .select('id, name, description, price_cents, position')
      .eq('menu_category_id', categoryId)
      .eq('is_visible', true)
      .eq('is_archived', false)
      .order('position', { ascending: true })
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching menu items:', error)
      return []
    }

    // Transform to MenuItemData format
    return (items || []).map(item => ({
      name: item.name,
      price: item.price_cents ? item.price_cents / 100 : 0,
      description: item.description || ''
    }))
  } catch (error) {
    console.error('Error in getMenuItemsByCategory:', error)
    return []
  }
}

/**
 * Map category slug to camelCase key for the menu data structure
 */
function mapCategorySlugToKey(slug: string): string {
  const mapping: Record<string, string> = {
    'basic': 'basic',
    'breakfast': 'breakfast',
    'eggs_benedict': 'eggsBenedict',
    'omelettes': 'omelettes',
    'pancake_waffle_frenchtoast': 'pancakeWaffleFrenchtoast',
    'sandwiches': 'sandwiches',
    'burgers': 'burgers',
    'salads': 'salads',
    'lunch_entree': 'lunchEntree',
    'side_orders': 'sideOrders',
    'soup': 'soup',
    'appetizers': 'appetizers',
    'mains': 'mains'
  }
  return mapping[slug] || slug
}


/**
 * Helper function to determine menu type from menu name
 * Supports flexible matching for breakfast/brunch variations
 */
function getMenuTypeFromName(menuName: string): 'brunch' | 'dinner' | 'late-night' | null {
  const nameLower = menuName.toLowerCase().trim()
  
  // Brunch/Breakfast variations
  if (nameLower === 'breakfast' || nameLower === 'brunch' || nameLower.includes('brunch')) {
    return 'brunch'
  }
  
  // Dinner
  if (nameLower === 'dinner') {
    return 'dinner'
  }
  
  // Late Night variations
  if (nameLower === 'late night' || nameLower === 'late-night' || nameLower.includes('late')) {
    return 'late-night'
  }
  
  return null
}

/**
 * Get complete menu data structure for a business
 * Returns data in the format expected by the menu page
 */
export async function getMenuDataForBusiness(businessSlug: string): Promise<MenuData> {
  try {
    const menus = await getMenusForBusiness(businessSlug)
    
    const menuData: MenuData = {
      brunch: {},
      dinner: {}
    }

    for (const menu of menus) {
      const menuType = getMenuTypeFromName(menu.name)
      
      // Skip menus that don't match known types
      if (!menuType || (menuType !== 'brunch' && menuType !== 'dinner')) {
        continue
      }
      
      const categories = await getMenuCategories(menu.id)
      
      for (const category of categories) {
        const items = await getMenuItemsByCategory(category.id)
        
        if (items.length === 0) {
          continue
        }

        const categoryKey = mapCategorySlugToKey(category.slug)
        
        // Assign to appropriate menu type based on menu name
        if (menuType === 'brunch') {
          // Type-safe dynamic key assignment
          if (categoryKey in menuData.brunch) {
            (menuData.brunch as Record<string, MenuItemData[]>)[categoryKey] = items
          }
        } else if (menuType === 'dinner') {
          // Type-safe dynamic key assignment
          if (categoryKey in menuData.dinner) {
            (menuData.dinner as Record<string, MenuItemData[]>)[categoryKey] = items
          }
        }
      }
    }

    return menuData
  } catch (error) {
    console.error('Error in getMenuDataForBusiness:', error)
    return {
      brunch: {},
      dinner: {}
    }
  }
}

/**
 * Get menu items grouped by category for a specific menu type (brunch/dinner/late-night)
 * Uses UUID relationships and flexible menu name matching instead of hardcoded names
 */
export async function getMenuItemsByType(
  businessSlug: string,
  menuType: 'brunch' | 'dinner' | 'late-night'
): Promise<Record<string, MenuItemData[]>> {
  try {
    const menus = await getMenusForBusiness(businessSlug)
    
    if (!menus || menus.length === 0) {
      return {}
    }
    
    // Find the appropriate menu using flexible name matching
    // This supports variations like "Breakfast", "Brunch", "Late Night", "Late-Night", etc.
    const menu = menus.find(m => {
      const menuTypeFromName = getMenuTypeFromName(m.name)
      return menuTypeFromName === menuType
    })
    
    if (!menu) {
      console.warn(`No menu found for type "${menuType}" in business "${businessSlug}"`)
      return {}
    }

    // Use menu UUID to fetch categories via relationship
    const categories = await getMenuCategories(menu.id)
    
    if (!categories || categories.length === 0) {
      return {}
    }
    
    const result: Record<string, MenuItemData[]> = {}

    // Fetch items for each category using category ID relationship
    for (const category of categories) {
      const items = await getMenuItemsByCategory(category.id)
      
      if (items.length > 0) {
        result[category.slug] = items
      }
    }

    return result
  } catch (error) {
    console.error('Error in getMenuItemsByType:', error)
    return {}
  }
}

