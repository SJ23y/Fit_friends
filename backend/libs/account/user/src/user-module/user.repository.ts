import { BasePostgresRepository, PrismaClientService } from '@backend/data-access'
import { UserEntity } from './user.entity';
import { UserFactory } from './user.factory';
import { Injectable } from '@nestjs/common';
import { Prisma, User as PrismaUser } from '@prisma/client';
import { AuthUser, DEFAULT_PAGE_NUMBER, MAX_USER_COUNT_LIMIT, PaginationResult, SortBy, UserLevel } from '@backend/shared-core';
import { UserQuery } from './user.query';

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
        purchases: undefined,
        friends: undefined,
        recievedRequests: undefined,
        requests: undefined,
        subscriptions: undefined,
        sertificates: []
      },
      include: {
        questionnaire: true,
        requests: true,
        recievedRequests: true,
        subscriptions: true
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
      where: { email },
      include: {
        questionnaire: true,
        requests: true,
        recievedRequests: true,
        subscriptions: true
      }
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
        questionnaire: true,
        trainings: true,
        friends: true,
        requests: true,
        recievedRequests: true,
        subscriptions: true
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
        name:  user.name,
        email: user.email,
        avatar: user.avatar,
        gender: user.gender,
        birthDate: user.birthDate,
        description: user.description,
        location: user.location,
        backgroundImage: user.backgroundImage,
        role: user.role,
        questionnaire: {
          upsert: user.questionnaire && {
            where: {userId},
            create:   {
              ...user.questionnaire,
              id: undefined
            },
            update: {
              ...user.questionnaire,
              createdAt: undefined,
              updatedAt: undefined,
              id: undefined
            }
          }
        },
        sertificates: user.sertificates,
        reviews:undefined,
        trainings: undefined,
        purchases: undefined,
        subscriptions: undefined
      },
      include: {
        questionnaire: true,
        requests: true,
        recievedRequests: true,
        subscriptions: true
      }
    });

    return this.createEntityFromDocument(updatedUser);
  }

  public async getUsers(userId: string, query?: UserQuery): Promise<PaginationResult<UserEntity>> {
    const take = (query?.count && query.count < MAX_USER_COUNT_LIMIT) ? query.count : MAX_USER_COUNT_LIMIT;
    const skip = (query?.page && query?.count) ? (query.page - 1) * query.count : undefined;
    const where: Prisma.UserWhereInput = {id: {
      not: userId
    }};
    let orderBy: Prisma.UserOrderByWithAggregationInput = {};

    if (query?.locations) {
      where.location = {
        in: query.locations
      }
    }

    if (query?.type || query?.level) {
      where.questionnaire = {
        userLevel: (query.level) ? query.level : {in: Object.values(UserLevel)},
        trainType: {
          hasSome: query.type
        }
      }
    }

    if (query?.sortBy) {
      switch (query.sortBy) {
        case SortBy.DATE:
          orderBy = {
            createdAt: query.sortDirection
          };
          break;
        case SortBy.ROLE:
          orderBy = {
            role: query.sortDirection
          };
          break;
        }
    }


    const [userCount, users] = await Promise.all([
      this.client.user.count({where}),
      this.client.user.findMany({where, take, skip, orderBy, include: {questionnaire: true}})
    ])

    return {
      entities: users.map((user) => this.createEntityFromDocument(user)),
      itemsPerPage: take,
      totalItems: userCount,
      totalPages: Math.ceil(userCount/take),
      currentPage: query?.page ?? DEFAULT_PAGE_NUMBER
    }
  }
}
