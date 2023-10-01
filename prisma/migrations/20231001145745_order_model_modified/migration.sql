/*
  Warnings:

  - You are about to drop the column `orderedBooks` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "orderedBooks";

-- CreateTable
CREATE TABLE "BookQuantity" (
    "id" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "BookQuantity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookQuantity" ADD CONSTRAINT "BookQuantity_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
