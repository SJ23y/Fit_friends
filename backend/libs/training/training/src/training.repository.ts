import { BasePostgresRepository, PrismaClientService } from '@backend/data-access';
import { TrainingEntity } from './training.entity';
import { AuthUser, DEFAULT_PAGE_NUMBER, DefaultQuestionnaireMan, DefaultQuestionnaireWoman, FilterBy, Gender, MAX_TRAINING_COUNT_LIMIT, PaginationResult, SortBy } from '@backend/shared-core';
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

  public async getAllTrainings(query?: TrainingQuery, user?: AuthUser): Promise<PaginationResult<TrainingEntity>> {
    const take = (query?.count && query.count < MAX_TRAINING_COUNT_LIMIT) ? query.count : MAX_TRAINING_COUNT_LIMIT;
    const skip = (query?.page && query?.count) ? (query.page - 1) * query.count : undefined;
    const where: Prisma.TrainingWhereInput = {};
    const orderBy: Prisma.TrainingOrderByWithRelationInput = {};
    if (user && !user.questionnaire) {
      user.questionnaire = (user.gender === Gender.FEMALE) ? DefaultQuestionnaireWoman : DefaultQuestionnaireMan;
      console.log('q', user.questionnaire);
    }

    if (query && query.filterBy) {
      console.log('query.filterBy', query.filterBy);
      switch (query.filterBy) {
        case FilterBy.SPECIAL:
          where.isSpecialOffer = true;
          break;
        case FilterBy.USER:
          where.level = user?.questionnaire?.userLevel;
          where.type = {in: user?.questionnaire?.trainType};
          where.duration = user?.questionnaire?.trainDuration;
          where.callorieQuantity = {gte: user?.questionnaire?.caloriePerDay}
          console.log('where: ', where)
          break;
      }
    }

    if (query && query?.sortBy) {
      switch (query.sortBy) {
        case SortBy.POPULAR:
          orderBy.rate = query.sortDirection;
          break;
      }
    }

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
/*
  public async getFeaturedTrainings(query?: TrainingQuery, user?: AuthUser): Promise<TrainingEntity[]> {
    const take = (query?.count && query.count < MAX_TRAINING_COUNT_LIMIT) ? query.count : MAX_TRAINING_COUNT_LIMIT;
    const skip = (query?.page && query?.count) ? (query.page - 1) * query.count : undefined;
    const where: Prisma.TrainingWhereInput = {};
    const orderBy: Prisma.TrainingOrderByWithRelationInput = {};
    if (user?.questionnaire) {
      user.questionnaire = (user?.gender === Gender.FEMALE) ? DefaultQuestionnaireWoman : DefaultQuestionnaireMan;
    }

    const trainings = await this.client.training.groupBy({
      take,
      skip,
      where,
      orderBy,
      by: [
        'level', ''
      ]
    });


    return trainings.map((training) => this.createEntityFromDocument(training));

  }*/

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
