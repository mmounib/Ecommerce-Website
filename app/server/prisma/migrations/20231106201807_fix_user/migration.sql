/*
  Warnings:

  - The primary key for the `CardsList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `FavouriteProducts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `FavouritesList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ShoppingList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ShoppingProducts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `reviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "CardsList" DROP CONSTRAINT "CardsList_ShoppingListId_fkey";

-- DropForeignKey
ALTER TABLE "FavouriteProducts" DROP CONSTRAINT "FavouriteProducts_favouriteId_fkey";

-- DropForeignKey
ALTER TABLE "FavouritesList" DROP CONSTRAINT "FavouritesList_userId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ShoppingList" DROP CONSTRAINT "ShoppingList_userId_fkey";

-- DropForeignKey
ALTER TABLE "ShoppingProducts" DROP CONSTRAINT "ShoppingProducts_ShoppingId_fkey";

-- DropIndex
DROP INDEX "FavouritesList_id_key";

-- DropIndex
DROP INDEX "ShoppingList_id_key";

-- AlterTable
ALTER TABLE "CardsList" DROP CONSTRAINT "CardsList_pkey",
ALTER COLUMN "ShoppingListId" SET DATA TYPE TEXT,
ADD CONSTRAINT "CardsList_pkey" PRIMARY KEY ("productId", "ShoppingListId");

-- AlterTable
ALTER TABLE "FavouriteProducts" DROP CONSTRAINT "FavouriteProducts_pkey",
ALTER COLUMN "favouriteId" SET DATA TYPE TEXT,
ADD CONSTRAINT "FavouriteProducts_pkey" PRIMARY KEY ("productId", "favouriteId");

-- AlterTable
ALTER TABLE "FavouritesList" DROP CONSTRAINT "FavouritesList_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "FavouritesList_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "FavouritesList_id_seq";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "categoryId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ShoppingList" DROP CONSTRAINT "ShoppingList_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ShoppingList_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ShoppingList_id_seq";

-- AlterTable
ALTER TABLE "ShoppingProducts" DROP CONSTRAINT "ShoppingProducts_pkey",
ALTER COLUMN "ShoppingId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ShoppingProducts_pkey" PRIMARY KEY ("productId", "ShoppingId");

-- AlterTable
ALTER TABLE "category" DROP CONSTRAINT "category_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "category_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "category_id_seq";

-- AlterTable
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "reviews_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "reviews_id_seq";

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "user_id_seq";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavouritesList" ADD CONSTRAINT "FavouritesList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingList" ADD CONSTRAINT "ShoppingList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardsList" ADD CONSTRAINT "CardsList_ShoppingListId_fkey" FOREIGN KEY ("ShoppingListId") REFERENCES "ShoppingList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavouriteProducts" ADD CONSTRAINT "FavouriteProducts_favouriteId_fkey" FOREIGN KEY ("favouriteId") REFERENCES "FavouritesList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingProducts" ADD CONSTRAINT "ShoppingProducts_ShoppingId_fkey" FOREIGN KEY ("ShoppingId") REFERENCES "ShoppingList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
