/*
  Warnings:

  - You are about to drop the column `productId` on the `skuBase` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "skuBase" DROP CONSTRAINT "skuBase_productId_fkey";

-- AlterTable
ALTER TABLE "skuBase" DROP COLUMN "productId";

-- CreateTable
CREATE TABLE "skuBaseProducts" (
    "skuBaseId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "skuBaseProducts_pkey" PRIMARY KEY ("productId","skuBaseId")
);

-- AddForeignKey
ALTER TABLE "skuBaseProducts" ADD CONSTRAINT "skuBaseProducts_skuBaseId_fkey" FOREIGN KEY ("skuBaseId") REFERENCES "skuBase"("skuId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skuBaseProducts" ADD CONSTRAINT "skuBaseProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
