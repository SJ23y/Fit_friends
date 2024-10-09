import { Module } from '@nestjs/common';
import { AuthenticationModule } from '@backend/authentication'
import { AccountConfigModule } from '@backend/user-config';
import { TrainingModule } from '@backend/training';
import { ReviewModule }  from '@backend/training-review';
import { PurchaseModule }  from '@backend/training-purchase';

@Module({
  imports: [
    AccountConfigModule,
    AuthenticationModule,
    TrainingModule,
    ReviewModule,
    PurchaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
