import { BasePostgresRepository, PrismaClientService } from '@backend/data-access';
import { TrainingEntity } from './training.entity';
import { DEFAULT_PAGE_NUMBER, MAX_TRAINING_COUNT_LIMIT, PaginationResult } from '@backend/shared-core';
import { TrainingFactory } from './training.factory';
import { TrainingQuery } from './training.query';
import { Prisma, Training as PrismaTraining } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TrainigRepository extends BasePostgresRepository<TrainingEntity, PrismaTraining> {
  constructor(
    private readonly trainingFactory: TrainingFactory,
    private readonly client: PrismaClientService
  ) {
    super(trainingFactory);
  }

  private async getTrainingsCount(where: Prisma.TrainingWhereInput): Promise<number> {
    return await this.client.training.count({ where })
  }

  public async getAllTrainings(query?: TrainingQuery): Promise<PaginationResult<TrainingEntity>> {
    const take = (query?.count && query.count < MAX_TRAINING_COUNT_LIMIT) ? query.count : MAX_TRAINING_COUNT_LIMIT;
    const skip = (query?.page && query?.count) ? (query.page - 1) * query.count : undefined;
    const where: Prisma.TrainingWhereInput = {};
    const orderBy: Prisma.TrainingOrderByWithRelationInput = {};

    const [trainings, trainingsCount] = await Promise.all([
      this.client.training.findMany({take, skip, where, orderBy}),
      this.getTrainingsCount(where)
    ])

    return {
      entities: trainings.map((training) => this.createEntityFromDocument(training)),
      totalItems: trainingsCount,
      currentPage: query?.page ?? DEFAULT_PAGE_NUMBER,
      totalPages: Math.ceil(trainingsCount/take),
      itemsPerPage: take
    }
  }

  public async getTrainingById(trainingId: string): Promise<TrainingEntity | null> {
    const currentTraining = await this.client.training.findFirst({where: {id: trainingId}});

    return (currentTraining) ? this.createEntityFromDocument(currentTraining) : null;
  }

  public async update(trainingEntity: TrainingEntity): Promise<void> {
    const training = trainingEntity.toPOJO();
    await this.client.training.update(
      {
        where: {id: training.id},
        data: {
          ...training
        }
      });
  }
}
