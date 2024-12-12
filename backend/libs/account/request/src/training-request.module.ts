import { Module } from '@nestjs/common';
import { TrainingRequestController } from './training-request.controller';
import { TrainingRequestFactory } from './training-request.factory';
import { TrainingRequestService } from './training-request.service';
import { TrainingRequestRepository } from './training-request.repository';
import { AuthenticationModule } from '@backend/authentication';
import { FriendsModule } from '@backend/friends'

@Module({
  controllers: [TrainingRequestController],
  providers: [TrainingRequestFactory, TrainingRequestService, TrainingRequestRepository],
  imports: [AuthenticationModule, FriendsModule],
})
export class TrainingRequestModule {}
