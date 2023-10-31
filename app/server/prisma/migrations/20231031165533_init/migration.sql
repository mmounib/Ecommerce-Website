-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT,
    "username" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "hashedRt" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "image" TEXT[],
    "ImageDesc" TEXT[],
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "Date" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "images" TEXT[],
    "helpful" INTEGER NOT NULL,
    "ProductId" INTEGER NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavouritesList" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "FavouritesList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingList" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ShoppingList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardsList" (
    "productId" INTEGER NOT NULL,
    "ShoppingListId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "CardsList_pkey" PRIMARY KEY ("productId","ShoppingListId")
);

-- CreateTable
CREATE TABLE "FavouriteProducts" (
    "favouriteId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "FavouriteProducts_pkey" PRIMARY KEY ("productId","favouriteId")
);

-- CreateTable
CREATE TABLE "ShoppingProducts" (
    "ShoppingId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "ShoppingProducts_pkey" PRIMARY KEY ("productId","ShoppingId")
);

-- CreateTable
CREATE TABLE "skuBase" (
    "skuId" TEXT NOT NULL,
    "propMap" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "promotionPrice" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "ext" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "skuBase_pkey" PRIMARY KEY ("skuId")
);

-- CreateTable
CREATE TABLE "skuValues" (
    "vid" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "propTips" TEXT NOT NULL,
    "skuPropPid" INTEGER NOT NULL,

    CONSTRAINT "skuValues_pkey" PRIMARY KEY ("vid")
);

-- CreateTable
CREATE TABLE "skuProp" (
    "pid" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "skuProp_pkey" PRIMARY KEY ("pid")
);

-- CreateTable
CREATE TABLE "revocatedTokens" (
    "token" TEXT NOT NULL,

    CONSTRAINT "revocatedTokens_pkey" PRIMARY KEY ("token")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "category_type_key" ON "category"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FavouritesList_id_key" ON "FavouritesList"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FavouritesList_userId_key" ON "FavouritesList"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ShoppingList_id_key" ON "ShoppingList"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ShoppingList_userId_key" ON "ShoppingList"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "skuValues_name_key" ON "skuValues"("name");

-- CreateIndex
CREATE UNIQUE INDEX "skuProp_name_key" ON "skuProp"("name");

-- CreateIndex
CREATE UNIQUE INDEX "revocatedTokens_token_key" ON "revocatedTokens"("token");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavouritesList" ADD CONSTRAINT "FavouritesList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingList" ADD CONSTRAINT "ShoppingList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardsList" ADD CONSTRAINT "CardsList_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardsList" ADD CONSTRAINT "CardsList_ShoppingListId_fkey" FOREIGN KEY ("ShoppingListId") REFERENCES "ShoppingList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavouriteProducts" ADD CONSTRAINT "FavouriteProducts_favouriteId_fkey" FOREIGN KEY ("favouriteId") REFERENCES "FavouritesList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavouriteProducts" ADD CONSTRAINT "FavouriteProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingProducts" ADD CONSTRAINT "ShoppingProducts_ShoppingId_fkey" FOREIGN KEY ("ShoppingId") REFERENCES "ShoppingList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingProducts" ADD CONSTRAINT "ShoppingProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skuBase" ADD CONSTRAINT "skuBase_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skuValues" ADD CONSTRAINT "skuValues_skuPropPid_fkey" FOREIGN KEY ("skuPropPid") REFERENCES "skuProp"("pid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skuProp" ADD CONSTRAINT "skuProp_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
