import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Map category slug to display title
 * Client-safe utility function (no server-side dependencies)
 */
export function getCategoryDisplayTitle(slug: string): string {
  const mapping: Record<string, string> = {
    'basic': 'BASIC',
    'breakfast': 'BREAKFAST',
    'eggs_benedict': 'EGGS BENEDICT',
    'omelettes': 'OMELETTES',
    'pancake_waffle_frenchtoast': 'PANCAKE, WAFFLE & FRENCH TOAST',
    'sandwiches': 'SANDWICHES',
    'burgers': 'BURGERS',
    'salads': 'SALADS',
    'lunch_entree': 'LUNCH ENTREE',
    'side_orders': 'SIDE ORDERS',
    'soup': 'SOUP',
    'soups': 'SOUPS',
    'appetizers': 'APPETIZERS',
    'starters': 'STARTERS',
    'mains': 'MAINS',
    'seafood_specialties': 'SEAFOOD SPECIALTIES',
    'hakka_specials': 'HAKKA SPECIALS',
    'veg_vegan_specialties': 'VEG & VEGAN SPECIALTIES',
    'bread_selection': 'BREAD SELECTION',
    'rice_selection': 'RICE SELECTION',
    'sides_accompaniments': 'SIDES & ACCOMPANIMENTS',
    'small_plates': 'SMALL PLATES',
    'jazz_bar_bites': 'JAZZ BAR BITES',
    'desserts': 'DESSERTS'
  }
  return mapping[slug] || slug.toUpperCase()
}
