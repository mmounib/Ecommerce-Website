/*
  Warnings:

  - Changed the type of `price` on the `CardsProducts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `price` on the `ShoppingProducts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CardsProducts" DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "ShoppingProducts" DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
