import { BasePostgresRepository, PrismaClientService } from '@backend/data-access'
import { UserEntity } from './user.entity';
import { UserFactory } from './user.factory';
import { Injectable } from '@nestjs/common';
import { User as PrismaUser } from '@prisma/client';
import { AuthUser } from '@backend/shared-core';

@Injectable()
export class UserRepository extends BasePostgresRepository<UserEntity, PrismaUser> {
  constructor(
    entityFactory: UserFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory);
  }

  public async save(user: UserEntity): Promise<void> {
    const newUser = await this.client.user.create({
      data: {
        ...user.toPOJO(),
        questionnaire: undefined,
        reviews: undefined,
        trainings: undefined,
        purchases: undefined
      },
      include: {
        questionnaire: true
      }
    });
    user.id = newUser.id
  }

  public async isExist(userId: string): Promise<boolean> {
    const existUser = this.client.user.findFirst({where: {id: userId}});
    return Boolean(existUser);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const foundUser = await this.client.user.findFirst({
      where: { email }
    });

    if (! foundUser) {
      return null;
    }

    return this.createEntityFromDocument(foundUser);
  }

  public async findById(userId: string): Promise<UserEntity | null> {
    const foundUser = await this.client.user.findFirst({
      where: { id: userId },
      include: {
        questionnaire: true
      }
    });

    if (! foundUser) {
      return null;
    }

    return this.createEntityFromDocument(foundUser);
  }

  public async update(userId: string, user: AuthUser): Promise<UserEntity> {
    const updatedUser = await this.client.user.update({
      where: {id: userId},
      data: {
        ...user,
        questionnaire: user.questionnaire && {
          upsert: {
            where: {userId},
            create: {
              userLevel: user.questionnaire.userLevel,
              trainDuration: user.questionnaire.trainDuration,
              trainType: user.questionnaire.trainType,
              isReadyForTrain: user.questionnaire.isReadyForTrain,
              calorieGoal: user.questionnaire.calorieGoal,
              caloriePerDay: user.questionnaire.caloriePerDay
            },
            update: {
              userLevel: user.questionnaire.userLevel,
              trainDuration: user.questionnaire.trainDuration,
              trainType: user.questionnaire.trainType,
              isReadyForTrain: user.questionnaire.isReadyForTrain,
              calorieGoal: user.questionnaire.calorieGoal,
              caloriePerDay: user.questionnaire.caloriePerDay,
              createdAt: undefined,
              updatedAt: undefined,
              id: undefined
            }
          }
        },
        reviews:undefined,
        trainings: undefined,
        purchases: undefined
      },
      include: {
        questionnaire: true
      }
    });

    return this.createEntityFromDocument(updatedUser);
  }
}
