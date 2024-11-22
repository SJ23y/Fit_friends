/*
  Warnings:

  - You are about to drop the column `coach` on the `trainings` table. All the data in the column will be lost.
  - You are about to drop the `deposits` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `coachId` to the `trainings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "deposits" DROP CONSTRAINT "deposits_user_id_fkey";

-- AlterTable
ALTER TABLE "trainings" DROP COLUMN "coach",
ADD COLUMN     "coachId" TEXT NOT NULL;

-- DropTable
DROP TABLE "deposits";

-- AddForeignKey
ALTER TABLE "trainings" ADD CONSTRAINT "trainings_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
