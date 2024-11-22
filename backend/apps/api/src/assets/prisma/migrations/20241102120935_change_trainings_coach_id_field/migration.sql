/*
  Warnings:

  - You are about to drop the column `coachId` on the `trainings` table. All the data in the column will be lost.
  - Added the required column `coach_id` to the `trainings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "trainings" DROP CONSTRAINT "trainings_coachId_fkey";

-- AlterTable
ALTER TABLE "trainings" DROP COLUMN "coachId",
ADD COLUMN     "coach_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "trainings" ADD CONSTRAINT "trainings_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
