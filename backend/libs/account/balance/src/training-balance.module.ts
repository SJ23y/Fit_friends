import { Module } from '@nestjs/common';
import { TrainingBalanceService } from './training-balance.service';
import { TrainingBalanceFactory } from './training-balance.factory';
import { TrainingBalanceRepository } from './training-balance.repository';

@Module({
  imports: [],
  providers: [
    TrainingBalanceService,
    TrainingBalanceFactory,
    TrainingBalanceRepository
  ],
  exports: [TrainingBalanceService]
})
export class TrainingBalanceModule {}
