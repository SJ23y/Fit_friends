import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewFactory } from './review.factory';
import { ReviewRepository } from './review.repository';
import { ReviewService } from './review.service';
import { AuthenticationModule } from '@backend/authentication';
import { TrainingModule } from '@backend/training';

@Module({
  imports: [
    AuthenticationModule,
    TrainingModule
  ],
  controllers: [ReviewController],
  providers: [ReviewFactory, ReviewRepository, ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
