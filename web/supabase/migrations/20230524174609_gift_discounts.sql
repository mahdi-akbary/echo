create table "public"."gift_discounts" (
    "id" bigserial primary key,
    "shop" CHARACTER varying NOT NULL,
    "amount" FLOAT,
    "discount_id" CHARACTER varying
);
