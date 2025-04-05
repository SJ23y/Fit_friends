import { Module } from '@nestjs/common';
import {AuthenticationModule} from '@backend/authentication';
import { SubscriptionController } from './subsciption.controller';
import { SubscriptionRepository } from './subscription.repository';
import { SubscriptionService } from './subscription.service';
import { SubscriptionFactory } from './subscription.factory';


@Module({
  imports: [
    AuthenticationModule
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionFactory, SubscriptionRepository, SubscriptionService],
  exports: [SubscriptionService]
})
export class SubscriptionModule {}
