create table "public"."cart_items" (
    "id" bigserial primary key,
    "shop" CHARACTER varying,
    "product_id" CHARACTER varying,
    "variant_id" CHARACTER varying,
    "variant_title" CHARACTER varying,
    "product_title" CHARACTER varying,
    "handle" CHARACTER varying,
    "price" FLOAT NOT NULL,
    "price_currency" CHARACTER varying ,
    "image_alt" CHARACTER varying,
    "image_url" TEXT,
    "created_at" DATE default now()
);
