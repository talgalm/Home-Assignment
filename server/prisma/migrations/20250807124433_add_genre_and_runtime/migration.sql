/*
  Warnings:

  - Added the required column `genre` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runtime` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "genre" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "runtime" TEXT NOT NULL DEFAULT 'Unknown';

-- Update existing records with appropriate values
UPDATE "movies" SET 
  "genre" = CASE 
    WHEN "title" = 'The Shawshank Redemption' THEN 'Drama'
    WHEN "title" = 'The Godfather' THEN 'Crime/Drama'
    ELSE 'Unknown'
  END,
  "runtime" = CASE 
    WHEN "title" = 'The Shawshank Redemption' THEN '142 min'
    WHEN "title" = 'The Godfather' THEN '175 min'
    ELSE 'Unknown'
  END;

-- Remove the default constraints
ALTER TABLE "movies" ALTER COLUMN "genre" DROP DEFAULT;
ALTER TABLE "movies" ALTER COLUMN "runtime" DROP DEFAULT;
