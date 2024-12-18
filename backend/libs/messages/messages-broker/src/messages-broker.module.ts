import { Module } from '@nestjs/common';
import { SubscriptionModule } from '@backend/subscription';
import { MessagesEmailModule } from '@backend/messages-email';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMqOptions } from '@backend/shared-helpers';
import { MessageBrokerController } from './message-broker.controller';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMqOptions('messages')
    ),
    SubscriptionModule,
    MessagesEmailModule,
  ],
  controllers: [MessageBrokerController],
  providers: [],
  exports: [],
})
export class MessagesBrokerModule {}
