-- CreateTable
CREATE TABLE "subscriptions" (
    "subscibe_by_id" TEXT NOT NULL,
    "subscibe_by_name" TEXT NOT NULL,
    "subscibe_by_email" TEXT NOT NULL,
    "subscribe_to_id" TEXT NOT NULL,
    "subscribe_to_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_email" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("subscibe_by_id","subscribe_to_id")
);
