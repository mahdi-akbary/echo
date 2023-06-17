CREATE VIEW "public"."cart_item_count_view" AS
SELECT
  created_at AS "key",
  COUNT(*) AS "value",
  shop
FROM
  cart_items
GROUP BY
  created_at,
  shop;
