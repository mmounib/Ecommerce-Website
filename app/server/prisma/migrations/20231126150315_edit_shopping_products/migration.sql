-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT,
    "username" TEXT NOT NULL,
    "hash" TEXT,
    "hashedRt" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "image" TEXT[],
    "ImageDesc" TEXT[],
    "video" TEXT,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "Date" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "images" TEXT[],
    "helpful" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavouritesList" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FavouritesList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingList" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ShoppingList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingProducts" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "ShoppingListId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "ShoppingProducts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavouriteProducts" (
    "favouriteId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "FavouriteProducts_pkey" PRIMARY KEY ("productId","favouriteId")
);

-- CreateTable
CREATE TABLE "CardsProducts" (
    "CardsId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "CardsProducts_pkey" PRIMARY KEY ("productId","CardsId")
);

-- CreateTable
CREATE TABLE "CardsList" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CardsList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skuBase" (
    "skuId" TEXT NOT NULL,
    "propMap" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "promotionPrice" DOUBLE PRECISION,
    "quantity" INTEGER NOT NULL,
    "ext" TEXT NOT NULL,

    CONSTRAINT "skuBase_pkey" PRIMARY KEY ("skuId")
);

-- CreateTable
CREATE TABLE "skuBaseProducts" (
    "skuBaseId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "skuBaseProducts_pkey" PRIMARY KEY ("productId","skuBaseId")
);

-- CreateTable
CREATE TABLE "skuValues" (
    "id" TEXT NOT NULL,
    "vid" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "propTips" TEXT NOT NULL,
    "skuPropPid" TEXT NOT NULL,

    CONSTRAINT "skuValues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skuProp" (
    "id" TEXT NOT NULL,
    "pid" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "skuProp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "revocatedTokens" (
    "token" TEXT NOT NULL,

    CONSTRAINT "revocatedTokens_pkey" PRIMARY KEY ("token")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "category_type_key" ON "category"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FavouritesList_userId_key" ON "FavouritesList"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ShoppingList_userId_key" ON "ShoppingList"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CardsList_userId_key" ON "CardsList"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "revocatedTokens_token_key" ON "revocatedTokens"("token");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavouritesList" ADD CONSTRAINT "FavouritesList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingList" ADD CONSTRAINT "ShoppingList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingProducts" ADD CONSTRAINT "ShoppingProducts_ShoppingListId_fkey" FOREIGN KEY ("ShoppingListId") REFERENCES "ShoppingList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingProducts" ADD CONSTRAINT "ShoppingProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavouriteProducts" ADD CONSTRAINT "FavouriteProducts_favouriteId_fkey" FOREIGN KEY ("favouriteId") REFERENCES "FavouritesList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavouriteProducts" ADD CONSTRAINT "FavouriteProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardsProducts" ADD CONSTRAINT "CardsProducts_CardsId_fkey" FOREIGN KEY ("CardsId") REFERENCES "CardsList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardsProducts" ADD CONSTRAINT "CardsProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardsList" ADD CONSTRAINT "CardsList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skuBaseProducts" ADD CONSTRAINT "skuBaseProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skuBaseProducts" ADD CONSTRAINT "skuBaseProducts_skuBaseId_fkey" FOREIGN KEY ("skuBaseId") REFERENCES "skuBase"("skuId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skuValues" ADD CONSTRAINT "skuValues_skuPropPid_fkey" FOREIGN KEY ("skuPropPid") REFERENCES "skuProp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skuProp" ADD CONSTRAINT "skuProp_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
