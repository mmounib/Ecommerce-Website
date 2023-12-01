/*
  Warnings:

  - You are about to drop the column `Date` on the `reviews` table. All the data in the column will be lost.
  - Added the required column `date` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "Date",
ADD COLUMN     "date" TEXT NOT NULL;
