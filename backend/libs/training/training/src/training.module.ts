import { Module } from '@nestjs/common';
import { TrainingController } from './training.controller';
import { TrainingFactory } from './training.factory';
import { TrainigRepository } from './training.repository';
import { TrainingService } from './training.service';
import { AuthenticationModule } from '@backend/authentication';
import { FileManagerModule } from '@backend/file-manager';
import { SubscriptionModule } from '@backend/subscription';

@Module({
  imports: [AuthenticationModule, FileManagerModule, SubscriptionModule],
  controllers: [TrainingController],
  providers: [TrainingFactory, TrainigRepository, TrainingService],
  exports: [TrainingService],
})
export class TrainingModule {}
