import { ConflictException, Injectable } from "@nestjs/common";
import { SubscriptionRepository } from "./subscription.repository";
import { SubscriptionDto } from "./dto/subscription.dto";
import { RabbitRouting, TokenPayload, Training } from "@backend/shared-core";
import { SubscriptionEntity } from "./subscription.entity";

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository
  ) {}

  public async saveSubscription(dto: SubscriptionDto, user: TokenPayload): Promise<void> {
    if (user.sub !== dto.subscribeById) {
      throw new ConflictException('You not allowed to make subscription for other users')
    }
    const existedSubscription = await this.subscriptionRepository.isSubscriptionExist(dto.subscribeById, dto.subscribeToId);
    if (existedSubscription) {
      throw new ConflictException('You already subscribed to this user')
    }
    const newSubscription = {
      ...dto,
      lastEmail: new Date(Date.now())
    }
    const subscriptionEntity = new SubscriptionEntity(newSubscription);
    await this.subscriptionRepository.save(subscriptionEntity);

  }

  public async deleteSubscription(subscriberById: string, subscriberToId: string): Promise<void> {
    const existedSubscription = await this.subscriptionRepository.isSubscriptionExist(subscriberById, subscriberToId);
    if (!existedSubscription) {
      throw new ConflictException('You hadn\'t subscribed to this user');
    }
    await this.subscriptionRepository.delete(subscriberToId, subscriberById);
  }
}
