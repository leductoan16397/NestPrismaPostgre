/*
  Warnings:

  - You are about to drop the column `products` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order" DROP COLUMN "products";

-- CreateTable
CREATE TABLE "product_order" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "count" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "product_order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_order" ADD CONSTRAINT "product_order_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
