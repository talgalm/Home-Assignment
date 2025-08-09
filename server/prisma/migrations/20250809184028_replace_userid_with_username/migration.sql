/*
  Warnings:

  - You are about to drop the column `user_id` on the `movies` table. All the data in the column will be lost.
  - Added the required column `username` to the `movies` table without a default value. This is not possible if the table is not empty.

*/

-- Add username column first (nullable)
ALTER TABLE "movies" ADD COLUMN "username" TEXT;

-- Copy usernames from users table to movies table
UPDATE "movies" 
SET "username" = "users"."username" 
FROM "users" 
WHERE "movies"."user_id" = "users"."id";

-- Make username column NOT NULL after populating data
ALTER TABLE "movies" ALTER COLUMN "username" SET NOT NULL;

-- DropForeignKey
ALTER TABLE "movies" DROP CONSTRAINT "movies_user_id_fkey";

-- Drop the user_id column
ALTER TABLE "movies" DROP COLUMN "user_id";
