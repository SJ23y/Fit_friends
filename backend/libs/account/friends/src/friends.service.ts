import { FriendsRepository } from './friends.repository';
import { FriendsQuery } from './friends.query';
import { FriendEntity } from './friends.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { Gender, PaginationResult, Role, User } from '@backend/shared-core';
import { NotificationService } from '@backend/notiifcation';

@Injectable()
export class FriendsService {
  constructor(
    private readonly friendsRepository: FriendsRepository,
    private readonly notificationService: NotificationService
  ) {
  }

  public async addFriend(user: User, friendId: string) {
    if (user.role === Role.COACH) {
      throw new ConflictException('You are not allowed to perform this action');
    }
    if (user.id === friendId) {
      throw new ConflictException('You can\'t add yourself to friends');
    }
    const existedFriend = await this.friendsRepository.isFriends(user.id ?? '', friendId);

    if (existedFriend) {
      throw new ConflictException('This user already in your friends list');
    }
    await this.friendsRepository.save(user.id ?? '', friendId);
    await this.notificationService.saveNotification(
      `${user.name} добавил${user.gender === Gender.FEMALE ? 'a': ''} вас в друзья`,
      friendId
    );
  }

  public async deleteFriend(user: User, friendId: string) {
    if (user.role === Role.COACH) {
      throw new ConflictException('You are not allowed to perform this action')
    }
    const existedFriend = await this.friendsRepository.isFriends(user.id ?? '', friendId);

    if (!existedFriend) {
      throw new ConflictException('This user is not in your friends list')
    }
    await this.friendsRepository.delete(user.id ?? '', friendId);
    await this.notificationService.saveNotification(
      `${user.name} удалил${user.gender === Gender.FEMALE ? 'a': ''} вас из друзей`,
      friendId
    );
  }

  public async getFriendsList(userId: string, query?: FriendsQuery): Promise<PaginationResult<FriendEntity>> {
    return await this.friendsRepository.getFriends(userId, query);
  }
}
