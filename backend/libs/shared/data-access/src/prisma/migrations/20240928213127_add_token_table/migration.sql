-- CreateTable
CREATE TABLE "tokens" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires_in" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);
