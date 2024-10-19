/*
  Warnings:

  - The `sources` column on the `Page` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `sources` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Page" DROP COLUMN "sources",
ADD COLUMN     "sources" JSONB[];

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "sources",
ADD COLUMN     "sources" JSONB[];
