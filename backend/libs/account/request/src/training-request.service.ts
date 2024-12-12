import { TrainingRequestRepository } from './training-request.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { Role, TokenPayload } from '@backend/shared-core';
import { FriendsRepository } from '@backend/friends';

@Injectable()
export class TrainingRequestService {
  constructor(
    private readonly requestRepository: TrainingRequestRepository,
    private readonly friendsRepository: FriendsRepository
  ) {
  }

  public async saveRequest(user: TokenPayload, senderId: string, recieverId: string, status: string) {
    if (user.role === Role.COACH && user.sub === senderId) {
      throw new ConflictException('You are not allowed to perform this action')
    }
    if (senderId === recieverId) {
      throw new ConflictException('You can not send request for the training to yourself')
    }
    const existedFriend = await this.friendsRepository.isFriends(senderId, recieverId);

    if (!existedFriend) {
      throw new ConflictException('Receiver should be in your friend list')
    }

    const existedRequest = await this.requestRepository.getRequest(user.sub, recieverId);

    if (existedRequest && user.sub !== existedRequest?.recieverId) {
      throw new ConflictException('You should be receiver to change status')
    }
    if (existedRequest?.status !== status) {
      await this.requestRepository.save(recieverId, senderId, status);
    }
  }
}
