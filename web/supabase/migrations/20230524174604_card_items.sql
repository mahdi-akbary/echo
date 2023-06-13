create table "public"."card_items" (
    "id" bigserial primary key,
    "shop" character varying,
    "product_id" character varying,
    "title" character varying,
    "handle" character varying,
    "description" text,
    "status" character varying(255),
    "url" text,
);
