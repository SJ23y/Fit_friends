-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_subscibe_by_id_fkey" FOREIGN KEY ("subscibe_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
