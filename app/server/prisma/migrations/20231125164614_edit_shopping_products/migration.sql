/*
  Warnings:

  - Added the required column `image` to the `CardsProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `ShoppingProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `ShoppingProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CardsProducts" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ShoppingProducts" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "price" TEXT NOT NULL;
