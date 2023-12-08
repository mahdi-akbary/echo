create table "public"."functions" (
    "id" bigint generated always as identity primary key,
    "shop" CHARACTER varying,
    "slug" CHARACTER varying,
    "is_active" BOOLEAN NOT NULL,
    "date" DATE NOT NULL,
    "type" CHARACTER varying
);
