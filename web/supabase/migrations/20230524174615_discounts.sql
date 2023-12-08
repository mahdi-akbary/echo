create table "public"."discounts" (
    "id" bigint generated always as identity primary key,
    "funtion_id" bigint references functions,
    "type" CHARACTER varying,
    "threshold" BOOLEAN NOT NULL,
    "amount" DATE NOT NULL,
    "based" CHARACTER varying,
    "product_relation" CHARACTER varying
);
