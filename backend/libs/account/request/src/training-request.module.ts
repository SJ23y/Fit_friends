import { Module } from '@nestjs/common';
import { TrainingRequestController } from './training-request.controller';
import { TrainingRequestFactory } from './training-request.factory';
import { TrainingRequestService } from './training-request.service';
import { TrainingRequestRepository } from './training-request.repository';
import { FriendsModule } from '@backend/friends'
import { NotificationModule } from '@backend/notiifcation';

@Module({
  controllers: [TrainingRequestController],
  providers: [TrainingRequestFactory, TrainingRequestService, TrainingRequestRepository],
  imports: [FriendsModule, NotificationModule],
})
export class TrainingRequestModule {}
