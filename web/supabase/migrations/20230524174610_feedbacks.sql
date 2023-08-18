create table "public"."feedbacks" (
    "id" bigserial primary key,
    "shop" CHARACTER varying NOT NULL,
    "option" INTEGER NOT NULL,
    "option_name" CHARACTER varying NOT NULL
);
