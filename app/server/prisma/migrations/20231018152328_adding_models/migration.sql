-- AlterTable
ALTER TABLE "users" ADD COLUMN     "address" TEXT;

-- CreateTable
CREATE TABLE "cardsList" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "cardsList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardsListProduct" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "cardsListId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "CardsListProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT[],
    "descritption" TEXT[],
    "ImageDesc" TEXT[],
    "categoryId" INTEGER NOT NULL,
    "favouriteId" INTEGER NOT NULL,
    "cardsListId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavouritesList" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "FavouritesList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" INTEGER NOT NULL,
    "Date" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "images" TEXT[],
    "helpful" INTEGER NOT NULL,
    "ProductId" INTEGER NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FavouritesListToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "cardsList_id_key" ON "cardsList"("id");

-- CreateIndex
CREATE UNIQUE INDEX "cardsList_userId_key" ON "cardsList"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FavouritesList_id_key" ON "FavouritesList"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FavouritesList_userId_key" ON "FavouritesList"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "category_id_key" ON "category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "category_type_key" ON "category"("type");

-- CreateIndex
CREATE UNIQUE INDEX "_FavouritesListToProduct_AB_unique" ON "_FavouritesListToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_FavouritesListToProduct_B_index" ON "_FavouritesListToProduct"("B");

-- AddForeignKey
ALTER TABLE "cardsList" ADD CONSTRAINT "cardsList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardsListProduct" ADD CONSTRAINT "CardsListProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardsListProduct" ADD CONSTRAINT "CardsListProduct_cardsListId_fkey" FOREIGN KEY ("cardsListId") REFERENCES "cardsList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavouritesList" ADD CONSTRAINT "FavouritesList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavouritesListToProduct" ADD CONSTRAINT "_FavouritesListToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "FavouritesList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavouritesListToProduct" ADD CONSTRAINT "_FavouritesListToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
