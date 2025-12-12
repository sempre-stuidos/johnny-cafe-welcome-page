-- Seed Johnny G's Late Night Menu for Live Database
-- Run this SQL in your Supabase SQL editor

DO $$
DECLARE
    business_id_val UUID;
    menu_id_val UUID;
    category_id_val BIGINT;
BEGIN
    -- Step 1: Find the business by slug
    SELECT id INTO business_id_val
    FROM businesses
    WHERE slug = 'johnny-gs-brunch'
    LIMIT 1;
    
    IF business_id_val IS NULL THEN
        RAISE EXCEPTION 'Business with slug "johnny-gs-brunch" not found';
    END IF;
    
    -- Step 2: Get or create the Late Night menu
    SELECT id INTO menu_id_val
    FROM menus
    WHERE business_id = business_id_val
    AND name = 'Late Night'
    LIMIT 1;
    
    IF menu_id_val IS NULL THEN
        INSERT INTO menus (business_id, name, description, is_active)
        VALUES (business_id_val, 'Late Night', 'Late Night menu for Johnny G''s Brunch', true)
        RETURNING id INTO menu_id_val;
    END IF;
    
    -- Step 3: Delete all existing late night menu items and categories
    DELETE FROM menu_items WHERE menu_id = menu_id_val;
    DELETE FROM menu_categories WHERE menu_id = menu_id_val;
    
    -- Step 4: Create Small Plates category and items
    INSERT INTO menu_categories (menu_id, name, slug, sort_order, is_active)
    VALUES (menu_id_val, 'Small Plates', 'small_plates', 1, true)
    RETURNING id INTO category_id_val;
    
    INSERT INTO menu_items (menu_id, menu_category_id, name, description, price_cents, is_visible, is_archived, position) VALUES
    (menu_id_val, category_id_val, 'Cauliflower Bites (V)', '', 900, true, false, 0),
    (menu_id_val, category_id_val, 'Chickpeas Potato Fritters (V)', '', 900, true, false, 1),
    (menu_id_val, category_id_val, 'Samosa Duo (Veg / Chicken / Beef)', '', 1100, true, false, 2),
    (menu_id_val, category_id_val, 'Duck Spring Rolls', '', 900, true, false, 3),
    (menu_id_val, category_id_val, 'Nachos', '', 1200, true, false, 4),
    (menu_id_val, category_id_val, 'Fish & Chips', '', 1400, true, false, 5),
    (menu_id_val, category_id_val, 'Cheese Burger & Fries', '', 1400, true, false, 6),
    (menu_id_val, category_id_val, 'Duck Breast (Medium Rare)', '', 1200, true, false, 7),
    (menu_id_val, category_id_val, 'Momo Chicken (Fried or Pan Fried)', '', 1200, true, false, 8);
    
    -- Step 5: Create Jazz Bar Bites category and items
    INSERT INTO menu_categories (menu_id, name, slug, sort_order, is_active)
    VALUES (menu_id_val, 'Jazz Bar Bites', 'jazz_bar_bites', 2, true)
    RETURNING id INTO category_id_val;
    
    INSERT INTO menu_items (menu_id, menu_category_id, name, description, price_cents, is_visible, is_archived, position) VALUES
    (menu_id_val, category_id_val, 'Truffle Fries', '', 1000, true, false, 0),
    (menu_id_val, category_id_val, 'Stuffed Chicken Wings', '', 1200, true, false, 1),
    (menu_id_val, category_id_val, 'Poutine', '', 1200, true, false, 2),
    (menu_id_val, category_id_val, 'Flat Cheese Bread (Bacon or Pepperoni)', '', 1200, true, false, 3),
    (menu_id_val, category_id_val, 'Lamb Sliders with Goat Cheese', '', 1200, true, false, 4),
    (menu_id_val, category_id_val, 'Tacos (3 pcs – Beef / Chicken / Vegan)', '', 1400, true, false, 5),
    (menu_id_val, category_id_val, 'Grilled Tofu & Bell Peppers', '', 1200, true, false, 6);
    
    -- Step 6: Create Desserts category and items
    INSERT INTO menu_categories (menu_id, name, slug, sort_order, is_active)
    VALUES (menu_id_val, 'Desserts', 'desserts', 3, true)
    RETURNING id INTO category_id_val;
    
    INSERT INTO menu_items (menu_id, menu_category_id, name, description, price_cents, is_visible, is_archived, position) VALUES
    (menu_id_val, category_id_val, 'Panna Cotta', '', 1100, true, false, 0),
    (menu_id_val, category_id_val, 'Chocolate Mousse', '', 1200, true, false, 1),
    (menu_id_val, category_id_val, 'Blueberry Mille', '', 1100, true, false, 2);
    
    RAISE NOTICE 'Successfully created Johnny G''s Late Night menu with 3 categories and 19 items';
END $$;

