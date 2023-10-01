/*
  Warnings:

  - You are about to drop the `BookQuantity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookQuantity" DROP CONSTRAINT "BookQuantity_bookId_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "orderedBooks" JSONB[];

-- DropTable
DROP TABLE "BookQuantity";
