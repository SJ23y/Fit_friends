import { Module } from '@nestjs/common';
import { AuthenticationModule } from '@backend/authentication'
import { AccountConfigModule } from '@backend/user-config';
import { TrainingModule } from '@backend/training';
import { ReviewModule }  from '@backend/training-review';
import { PurchaseModule }  from '@backend/training-purchase';
import { FileManagerModule } from '@backend/file-manager';
import { FileManagerConfigModule } from '@backend/file-manager-config'
import { FriendsModule } from '@backend/friends';
import { TrainingRequestModule } from '@backend/trainingRequest';
import { MessagesConfigModule } from '@backend/messages-config';
import { SubscriptionModule } from '@backend/subscription';
import { MessagesBrokerModule } from '@backend/messages-broker';
import { MessagesEmailModule } from '@backend/messages-email';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMqOptions } from '@backend/shared-helpers';
import { NotificationModule } from '@backend/notiifcation'

@Module({
  imports: [
    AccountConfigModule,
    MessagesConfigModule,
    FileManagerConfigModule,
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMqOptions('messages')
    ),
    AuthenticationModule,
    TrainingModule,
    ReviewModule,
    PurchaseModule,
    FileManagerModule,
    FriendsModule,
    TrainingRequestModule,
    SubscriptionModule,
    MessagesBrokerModule,
    MessagesEmailModule,
    NotificationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
