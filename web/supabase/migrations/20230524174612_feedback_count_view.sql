CREATE VIEW "public"."feedback_count_view" AS
SELECT
  "option" AS "key",
  COUNT(*) AS "value",
  option_name
FROM
  feedbacks
GROUP BY
  "option",
  option_name;
