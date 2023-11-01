/*
  Warnings:

  - The primary key for the `skuProp` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `skuProp` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "skuValues" DROP CONSTRAINT "skuValues_skuPropPid_fkey";

-- DropIndex
DROP INDEX "skuProp_name_key";

-- AlterTable
ALTER TABLE "skuProp" DROP CONSTRAINT "skuProp_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "skuProp_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "skuValues" ALTER COLUMN "skuPropPid" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "skuValues" ADD CONSTRAINT "skuValues_skuPropPid_fkey" FOREIGN KEY ("skuPropPid") REFERENCES "skuProp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
