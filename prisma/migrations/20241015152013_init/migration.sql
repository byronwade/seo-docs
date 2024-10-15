/*
  Warnings:

  - You are about to drop the `Permalink` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `ContentType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `ContentType` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Permalink" DROP CONSTRAINT "Permalink_pageId_fkey";

-- DropForeignKey
ALTER TABLE "Permalink" DROP CONSTRAINT "Permalink_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Permalink" DROP CONSTRAINT "Permalink_postId_fkey";

-- AlterTable
ALTER TABLE "ContentType" ADD COLUMN     "slug" TEXT NOT NULL;

-- DropTable
DROP TABLE "Permalink";

-- CreateIndex
CREATE UNIQUE INDEX "ContentType_slug_key" ON "ContentType"("slug");
