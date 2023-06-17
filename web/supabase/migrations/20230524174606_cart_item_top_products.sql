CREATE VIEW "public"."cart_item_top_products" AS
SELECT 
  product_id,
  product_title,
  shop,
  COUNT(*) AS product_count
FROM cart_items
GROUP BY product_id, product_title, shop
ORDER BY product_count DESC

