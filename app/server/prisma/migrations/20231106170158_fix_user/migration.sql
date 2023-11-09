-- DropIndex
DROP INDEX "user_username_key";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "hash" DROP NOT NULL;
