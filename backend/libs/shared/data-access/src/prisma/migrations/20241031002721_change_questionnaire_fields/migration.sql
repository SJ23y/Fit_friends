-- AlterTable
ALTER TABLE "questionnaires" ADD COLUMN     "description" TEXT,
ADD COLUMN     "individual_training" BOOLEAN,
ALTER COLUMN "train_duration" DROP NOT NULL,
ALTER COLUMN "calorie_goal" DROP NOT NULL,
ALTER COLUMN "calorie_per_day" DROP NOT NULL,
ALTER COLUMN "is_ready_for_train" DROP NOT NULL;
