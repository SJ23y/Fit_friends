import { Module } from '@nestjs/common';
import {AuthenticationModule} from '@backend/authentication';
import { SubscriptionController } from './subsciption.controller';
import { SubscriptionRepository } from './subscription.repository';
import { SubscriptionService } from './subscription.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMqOptions } from '@backend/shared-helpers';
import { SubscriptionFactory } from './subscription.factory';


@Module({
  imports: [
    AuthenticationModule,
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMqOptions('messages')
    )
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionFactory, SubscriptionRepository, SubscriptionService],
  exports: [SubscriptionService]
})
export class SubscriptionModule {}
