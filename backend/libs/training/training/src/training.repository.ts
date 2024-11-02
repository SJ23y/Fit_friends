import { BasePostgresRepository, PrismaClientService } from '@backend/data-access';
import { TrainingEntity } from './training.entity';
import { AuthUser, DEFAULT_PAGE_NUMBER, DefaultQuestionnaireMan, DefaultQuestionnaireWoman, FilterBy, Gender, MAX_TRAINING_COUNT_LIMIT, SortBy, TrainingPaginationResult, TrainingStats } from '@backend/shared-core';
import { TrainingFactory } from './training.factory';
import { TrainingQuery } from './training.query';
import { Prisma, Training as PrismaTraining } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { isUserQuestionnaire } from '@backend/shared-helpers';

@Injectable()
export class TrainigRepository extends BasePostgresRepository<TrainingEntity, PrismaTraining> {
  constructor(
    private readonly trainingFactory: TrainingFactory,
    private readonly client: PrismaClientService
  ) {
    super(trainingFactory);
  }

  public async save(training: TrainingEntity): Promise<void> {
    const pojoTraining = training.toPOJO();
    const newTraining = await this.client.training.create({
      data: {
          title: pojoTraining.title,
          image: pojoTraining.image,
          level: pojoTraining.level,
          type: pojoTraining.type,
          duration: pojoTraining.duration,
          price: pojoTraining.price,
          callorieQuantity: pojoTraining.callorieQuantity,
          description: pojoTraining.description,
          gender: pojoTraining.gender,
          isSpecialOffer: pojoTraining.isSpecialOffer,
          video: pojoTraining.video,
          rate: pojoTraining.rate,
          coach: {
            connect: {id: pojoTraining.coachId}
          }
      }
    });
    training.id = newTraining.id;
  }

  private async getTrainingsCount(where: Prisma.TrainingWhereInput): Promise<number> {
    return this.client.training.count({ where })
  }



  private async getTrainingsStats(): Promise<TrainingStats> {
    return this.client.training.aggregate({
      _max: {
        price: true,
        callorieQuantity: true
      },
      _min: {
        price: true,
        callorieQuantity: true
      }
    })
  }

  public async getAllTrainings(query?: TrainingQuery, user?: AuthUser): Promise<TrainingPaginationResult<TrainingEntity>> {
    const take = (query?.count && query.count < MAX_TRAINING_COUNT_LIMIT) ? query.count : MAX_TRAINING_COUNT_LIMIT;
    const skip = (query?.page && query?.count) ? (query.page - 1) * query.count : undefined;
    const where: Prisma.TrainingWhereInput = {};
    const orderBy: Prisma.TrainingOrderByWithRelationInput = {};

    if (user && !user.questionnaire) {
      user.questionnaire = (user.gender === Gender.FEMALE) ? DefaultQuestionnaireWoman : DefaultQuestionnaireMan;
    }

    if (query?.minPrice && query?.maxPrice) {
      where.price = {gte: query.minPrice, lte: query.maxPrice}
    }

    if (query?.maxCallories && query?.minCallories) {
      where.callorieQuantity = {lte: query.maxCallories, gte: query.minCallories}
    }

    if (query?.maxRating && query?.minRating) {
      where.rate = {lte: query.maxRating, gte: query.minRating}
    }

    if (query?.type) {
      where.type = {in: query.type}
    }

    if (query?.free) {
      where.price = 0
    }

    if (query && query.filterBy) {
      switch (query.filterBy) {
        case FilterBy.SPECIAL:
          where.isSpecialOffer = true;
          break;
        case FilterBy.USER:
          where.level = user?.questionnaire?.userLevel;
          where.type = {in: user?.questionnaire?.trainType};
          if (user?.questionnaire && isUserQuestionnaire(user.questionnaire)) {
            where.duration = user?.questionnaire?.trainDuration;
            where.callorieQuantity = {gte: user?.questionnaire?.caloriePerDay}
          }
          break;
      }
    }

    if (query && query?.sortBy) {
      switch (query.sortBy) {
        case SortBy.POPULAR:
          orderBy.rate = query.sortDirection;
          break;
        case SortBy.PRICE:
          orderBy.price = query.sortDirection;
          break;
      }
    }

    const [trainings, trainingsCount, trainingStats] = await Promise.all([
      this.client.training.findMany({take, skip, where, orderBy}),
      this.getTrainingsCount(where),
      this.getTrainingsStats()
    ])

    return {
      entities: trainings.map((training) => this.createEntityFromDocument(training)),
      totalItems: trainingsCount,
      currentPage: query?.page ?? DEFAULT_PAGE_NUMBER,
      totalPages: Math.ceil(trainingsCount/take),
      itemsPerPage: take,
      maxPrice: trainingStats._max.price ?? 0,
      minPrice: trainingStats._min.price ?? 0,
      maxCallories: trainingStats._max.callorieQuantity ?? 0,
      minCallories: trainingStats._min.callorieQuantity ?? 0
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
          title: training.title,
          image: training.image,
          level: training.level,
          type: training.type,
          duration: training.duration,
          price: training.price,
          callorieQuantity: training.callorieQuantity,
          description: training.description,
          gender: training.gender,
          isSpecialOffer: training.isSpecialOffer,
          rate: training.rate,
          video: training.video,
          coach: undefined
        }
      });
  }
}
