import { Module } from '@nestjs/common';
import { AuthenticationModule } from '@backend/authentication'
import { AccountConfigModule } from '@backend/user-config';
import { TrainingModule } from '@backend/training';
import { ReviewModule }  from '@backend/training-review';
import { PurchaseModule }  from '@backend/training-purchase';
import { FileManagerModule } from '@backend/file-manager';
import { FileManagerConfigModule } from '@backend/file-manager-config'
import { FriendsModule } from '@backend/friends';

@Module({
  imports: [
    AccountConfigModule,
    FileManagerConfigModule,
    AuthenticationModule,
    TrainingModule,
    ReviewModule,
    PurchaseModule,
    FileManagerModule,
    FriendsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
