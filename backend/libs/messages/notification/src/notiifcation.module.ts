import { Module } from '@nestjs/common';
import { AuthenticationModule } from '@backend/authentication'
import { NotificationController } from './notification.controller';
import { NotificationFactory } from './notification.factory';
import { NotificationRepository } from './notification.repository';
import { NotificationService } from './notification.service';

@Module({
  controllers: [NotificationController],
  providers: [NotificationFactory, NotificationRepository, NotificationService],
  imports: [AuthenticationModule],
  exports: [NotificationService]
})
export class NotificationModule {}
