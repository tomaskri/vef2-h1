-- AlterTable
ALTER TABLE "users" ADD COLUMN     "admin" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "score" SET DEFAULT 0;
