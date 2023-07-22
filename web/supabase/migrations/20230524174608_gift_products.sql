create table "public"."gift_products" (
    "id" bigserial primary key,
    "shop" CHARACTER varying,
    "variant_id" CHARACTER varying,
    "title" CHARACTER varying,
    "display_name" CHARACTER varying,
    "price" FLOAT NOT NULL,
    "inventory_quantity" INT NOT NULL
);
