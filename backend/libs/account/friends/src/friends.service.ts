import { FriendsRepository } from './friends.repository';
import { FriendsQuery } from './friends.query';
import { FriendEntity } from './friends.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { PaginationResult, Role, TokenPayload } from '@backend/shared-core';

@Injectable()
export class FriendsService {
  constructor(
    private readonly friendsRepository: FriendsRepository
  ) {
  }

  public async addFriend(user: TokenPayload, friendId: string) {
    if (user.role === Role.COACH) {
      throw new ConflictException('You are not allowed to perform this action');
    }
    if (user.sub === friendId) {
      throw new ConflictException('You can\'t add yourself to friends');
    }
    const existedFriend = await this.friendsRepository.isFriends(user.sub, friendId);
    if (existedFriend) {
      throw new ConflictException('This user already in your friends list');
    }
    await this.friendsRepository.save(user.sub, friendId);
  }

  public async deleteFriend(user: TokenPayload, friendId: string) {
    if (user.role === Role.COACH) {
      throw new ConflictException('You are not allowed to perform this action')
    }
    const existedFriend = await this.friendsRepository.isFriends(user.sub, friendId);

    if (!existedFriend) {
      throw new ConflictException('This user is not in your friends list')
    }
    await this.friendsRepository.delete(user.sub, friendId);
  }

  public async getFriendsList(userId: string, query?: FriendsQuery): Promise<PaginationResult<FriendEntity>> {
    return await this.friendsRepository.getFriends(userId, query);
  }
}
