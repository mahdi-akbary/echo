CREATE VIEW "public"."survey_count_view" AS
SELECT
  "option",
  option_name AS "key",
  COUNT(*) AS "value",
  shop
FROM
  surveys
GROUP BY
  "option",
  option_name,
  shop;
