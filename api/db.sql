CREATE TABLE "user_types"(
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL
);
ALTER TABLE
    "user_types" ADD PRIMARY KEY("id");
CREATE TABLE "memberships"(
    "id" UUID NOT NULL,
    "membership_type_id" UUID NOT NULL,
    "barcode" TEXT NOT NULL,
    "current_entries" BIGINT NOT NULL,
    "max_entries" BIGINT NOT NULL,
    "is_valid" BOOLEAN NOT NULL,
    "expiration_date" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "memberships" ADD PRIMARY KEY("id");
CREATE TABLE "users"(
    "id" UUID NOT NULL,
    "user_type_id" UUID NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "photo" VARCHAR(255) NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT '0',
    "creation_date" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
CREATE TABLE "purchase_history"(
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "membership_id" UUID NOT NULL,
    "purchase_date" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "purchase_history" ADD PRIMARY KEY("id");
CREATE TABLE "membership_types"(
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" BIGINT NOT NULL
);
ALTER TABLE
    "membership_types" ADD PRIMARY KEY("id");
ALTER TABLE
    "purchase_history" ADD CONSTRAINT "purchase_history_membership_id_foreign" FOREIGN KEY("membership_id") REFERENCES "memberships"("id");
ALTER TABLE
    "purchase_history" ADD CONSTRAINT "purchase_history_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "memberships" ADD CONSTRAINT "memberships_membership_type_id_foreign" FOREIGN KEY("membership_type_id") REFERENCES "membership_types"("id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_user_type_id_foreign" FOREIGN KEY("user_type_id") REFERENCES "user_types"("id");

