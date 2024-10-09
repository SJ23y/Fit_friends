import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TrainingBalance } from '@backend/shared-core';
import { TrainingBalanceRepository } from './training-balance.repository';
import { TrainingBalanceEntity } from './training-balance.entity';

@Injectable()
export class TrainingBalanceService {
  constructor(
    private readonly balanceRepository: TrainingBalanceRepository
  ) {
  }

  public async getUserTrainingsCount(userId: string): Promise<number> {
    const trainingsCount = await this.balanceRepository.getUserTrainingsCount(userId)

    if (! trainingsCount) {
      throw new NotFoundException(`Can't find user balance`);
    }

    return trainingsCount;
  }

  public async addTrainingsToBalance(balance: TrainingBalance): Promise<void> {
    const balanceEntity = new TrainingBalanceEntity(balance);
    const currentBalance = await this.balanceRepository.getUserBalance(balanceEntity);

    if (currentBalance) {
      balanceEntity.trainingCount += currentBalance;
    }

    await this.balanceRepository.changeTrainingsBalance(balanceEntity);
  }

  public async reduceTrainingBalance(balance: TrainingBalance): Promise<void> {
    const balanceEntity = new TrainingBalanceEntity(balance);
    const currentBalance = await this.balanceRepository.getUserBalance(balanceEntity);

    if (!currentBalance || balance.trainingCount > currentBalance) {
      throw new BadRequestException(`You don't have enough trainings to withdraw.`)
    }

    if (currentBalance) {
      balanceEntity.trainingCount = currentBalance - balance.trainingCount;
    }

    await this.balanceRepository.changeTrainingsBalance(balanceEntity);
  }


}
