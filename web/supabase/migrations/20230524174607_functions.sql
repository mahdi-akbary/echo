create table "public"."functions" (
    "id" bigserial primary key,
    "shop" CHARACTER varying,
    "slug" CHARACTER varying,
    "is_active" BOOLEAN NOT NULL,
    "date" DATE NOT NULL,
);
