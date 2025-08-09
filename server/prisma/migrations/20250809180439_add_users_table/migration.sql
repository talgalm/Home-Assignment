/*
  Warnings:

  - Added the required column `user_id` to the `movies` table without a default value. This is not possible if the table is not empty.

*/

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- Insert default user for existing movies
INSERT INTO "users" ("username") VALUES ('default_user');

-- AlterTable - Add user_id column with default value first
ALTER TABLE "movies" ADD COLUMN "user_id" INTEGER;

-- Update existing movies to reference the default user
UPDATE "movies" SET "user_id" = 1 WHERE "user_id" IS NULL;

-- Make the column NOT NULL after setting values
ALTER TABLE "movies" ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
