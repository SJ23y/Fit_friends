import { BasePostgresRepository, PrismaClientService } from '@backend/data-access';
import { FriendsFactory } from './friends.factory';
import { Injectable } from '@nestjs/common';
import { Friend, Prisma, User as PrismaUser } from '@prisma/client';
import { DEFAULT_PAGE_NUMBER,  MAX_USER_COUNT_LIMIT, PaginationResult, Role, SortDirection } from '@backend/shared-core';

import { FriendEntity } from './friends.entity';
import { FriendsQuery } from './friends.query';

@Injectable()
export class FriendsRepository extends BasePostgresRepository<FriendEntity, PrismaUser> {
  constructor(
    entityFactory: FriendsFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory);
  }

  public async save(userId: string, friendId: string): Promise<void> {
    await this.client.friend.create({
      data: {
        user: {
          connect: {
            id: userId
          }
        },
        friend: {
          connect: {
            id: friendId
          }
        }
      }
    });
  }

  public async delete(userId: string, friendId: string): Promise<void> {
    await this.client.friend.delete({
      where: {
        userId_friendId: {
          userId,
          friendId
        }
      }
    });
  }

  public async isFriends(userId: string, friendId: string): Promise<Friend | null> {
    const existedFriend = await this.client.friend.findFirst({ where: {
      OR: [
        {userId, friendId},
        {friendId: userId, userId: friendId}
      ]
    }});
    return existedFriend;
  }

  public async getFriends(userId: string, query?: FriendsQuery): Promise<PaginationResult<FriendEntity>> {
    const take = (query?.count && query.count < MAX_USER_COUNT_LIMIT) ? query.count : MAX_USER_COUNT_LIMIT;
    const skip = (query?.page && query?.count) ? (query.page - 1) * query.count : undefined;
    const where: Prisma.FriendWhereInput = { OR: [{userId}, {friendId: userId}]};
    const orderBy: Prisma.FriendOrderByWithAggregationInput= { createdAt: SortDirection.DESC };
    const select: Prisma.FriendSelect = {
      friend: {
        select: {
          name: true,
          location: true,
          avatar: true,
          id: true,
          role: true,
          questionnaire: true
        },
      },
      user: {
        select: {
          name: true,
          location: true,
          avatar: true,
          id: true,
          role: true,
          questionnaire: true
        },
      }
    }

    const [friendsCount, friends] = await Promise.all([
      this.client.friend.count({where}),
      this.client.friend.findMany({where, take, skip, orderBy, select})
    ])

    return {
      entities: friends.map(({user, friend}) => (friend.id === userId) ? FriendsFactory.createFromDb({...user, role: user.role as Role}) : FriendsFactory.createFromDb({...friend, role: friend.role as Role})),
      itemsPerPage: take,
      totalItems: friendsCount,
      totalPages: Math.ceil(friendsCount/take),
      currentPage: query?.page ?? DEFAULT_PAGE_NUMBER
    }
  }
}
