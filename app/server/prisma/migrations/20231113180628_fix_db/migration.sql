/*
  Warnings:

  - The primary key for the `CardsList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ShoppingListId` on the `CardsList` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `CardsList` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `CardsList` table. All the data in the column will be lost.
  - The primary key for the `ShoppingProducts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ShoppingId` on the `ShoppingProducts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `CardsList` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `CardsList` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `userId` to the `CardsList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ShoppingListId` to the `ShoppingProducts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CardsList" DROP CONSTRAINT "CardsList_ShoppingListId_fkey";

-- DropForeignKey
ALTER TABLE "CardsList" DROP CONSTRAINT "CardsList_productId_fkey";

-- DropForeignKey
ALTER TABLE "ShoppingProducts" DROP CONSTRAINT "ShoppingProducts_ShoppingId_fkey";

-- AlterTable
ALTER TABLE "CardsList" DROP CONSTRAINT "CardsList_pkey",
DROP COLUMN "ShoppingListId",
DROP COLUMN "productId",
DROP COLUMN "quantity",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "CardsList_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ShoppingProducts" DROP CONSTRAINT "ShoppingProducts_pkey",
DROP COLUMN "ShoppingId",
ADD COLUMN     "ShoppingListId" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1,
ADD CONSTRAINT "ShoppingProducts_pkey" PRIMARY KEY ("productId", "ShoppingListId");

-- CreateTable
CREATE TABLE "CardsProducts" (
    "CardsId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "CardsProducts_pkey" PRIMARY KEY ("productId","CardsId")
);

-- CreateIndex
CREATE UNIQUE INDEX "CardsList_userId_key" ON "CardsList"("userId");

-- AddForeignKey
ALTER TABLE "ShoppingProducts" ADD CONSTRAINT "ShoppingProducts_ShoppingListId_fkey" FOREIGN KEY ("ShoppingListId") REFERENCES "ShoppingList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardsProducts" ADD CONSTRAINT "CardsProducts_CardsId_fkey" FOREIGN KEY ("CardsId") REFERENCES "CardsList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardsProducts" ADD CONSTRAINT "CardsProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardsList" ADD CONSTRAINT "CardsList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
