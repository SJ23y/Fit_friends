/*
  Warnings:

  - You are about to alter the column `rate` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "rate" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "trainings" ALTER COLUMN "rate" SET DATA TYPE DOUBLE PRECISION;
