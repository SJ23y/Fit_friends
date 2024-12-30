import { TrainingRequestRepository } from './training-request.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { RequestStatus, Role, User } from '@backend/shared-core';
import { FriendsRepository } from '@backend/friends';
import { NotificationService } from '@backend/notiifcation';
import { createNotificationData } from '@backend/shared-helpers';

@Injectable()
export class TrainingRequestService {
  constructor(
    private readonly requestRepository: TrainingRequestRepository,
    private readonly friendsRepository: FriendsRepository,
    private readonly notificationService: NotificationService
  ) {
  }

  public async saveRequest(user: User, senderId: string, recieverId: string, status: string) {
    if (user.role === Role.COACH && user.id === senderId) {
      throw new ConflictException('You are not allowed to perform this action')
    }
    if (senderId === recieverId) {
      throw new ConflictException('You can not send request for the training to yourself')
    }
    const existedFriend = await this.friendsRepository.isFriends(senderId, recieverId);

    if (!existedFriend) {
      throw new ConflictException('Receiver should be in your friend list')
    }

    const existedRequest = await this.requestRepository.getRequest(user.id ?? '', recieverId);

    if (existedRequest && user.id !== existedRequest?.recieverId) {
      throw new ConflictException('You should be receiver to change status')
    }
    if (existedRequest?.status !== status) {
      await this.requestRepository.save(recieverId, senderId, status);
      await this.notificationService.saveNotification(
        ...createNotificationData(user, recieverId, senderId, status as RequestStatus)
      );
    }
  }
}
