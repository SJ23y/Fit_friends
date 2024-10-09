import { BasePostgresRepository, PrismaClientService } from "@backend/data-access";
import { TrainingBalanceEntity } from "./training-balance.entity";
import { TrainingBalanceFactory } from "./training-balance.factory";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TrainingBalanceRepository extends BasePostgresRepository<TrainingBalanceEntity, null> {
  constructor(
    private readonly balanceFactory: TrainingBalanceFactory,
    private readonly client: PrismaClientService
  ) {
    super(balanceFactory);
  }

  public async getUserTrainingsCount(userId: string): Promise<number | null> {
    const result =  await this.client.deposit.groupBy({
      by: ['userId'],
      where: {userId},
      _sum: {
        count: true
      }
    })

    return result[0]._sum.count;
  }

  public async getUserBalance(balanceEntity: TrainingBalanceEntity): Promise<number | undefined> {
    const {userId, trainingId } = balanceEntity.toPOJO();
    const balance = await this.client.deposit.findFirst({
      where: {
          userId,
          trainId: trainingId
      }
    });


    return balance?.count;
  }

  public async changeTrainingsBalance(balanceEntity: TrainingBalanceEntity): Promise<void> {
    const {userId, trainingId, trainingCount} = balanceEntity.toPOJO();
    await this.client.deposit.upsert({
      where: {
        userId_trainId: {
          userId,
          trainId: trainingId
        }
      },
      create: {
        count: trainingCount,
        trainId: trainingId,
        user: {
          connect: {id: userId}
        }
      },
      update: {
        count: trainingCount
      }
    })
  }
}
