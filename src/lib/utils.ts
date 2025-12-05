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
    'appetizers': 'APPETIZERS',
    'mains': 'MAINS'
  }
  return mapping[slug] || slug.toUpperCase()
}
