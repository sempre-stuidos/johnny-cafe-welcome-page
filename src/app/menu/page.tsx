import { getMenuItemsByType } from "@/lib/menu";
import { resolveBusinessSlug } from "@/lib/business-utils";
import MenuPageClient from "./MenuPageClient";

export default async function MenuPage() {
  // Get business slug from environment or use default
  const businessSlug = resolveBusinessSlug(
    undefined,
    process.env.NEXT_PUBLIC_BUSINESS_SLUG,
    'johnny-gs-brunch'
  );

  // Get all brunch categories with items
  const brunchCategories = await getMenuItemsByType(businessSlug, 'brunch');
  
  // Get all dinner categories with items
  const dinnerCategories = await getMenuItemsByType(businessSlug, 'dinner');

  return (
    <MenuPageClient 
      brunchCategories={brunchCategories}
      dinnerCategories={dinnerCategories}
    />
  );
}
