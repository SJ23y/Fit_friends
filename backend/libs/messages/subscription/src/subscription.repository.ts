import { BadRequestException, Injectable } from "@nestjs/common";
import { SubscriptionEntity } from "./subscription.entity";
import { BasePostgresRepository, PrismaClientService } from '@backend/data-access'
import { Subscription } from "@backend/shared-core";
import { SubscriptionFactory } from "./subscription.factory";

@Injectable()
export class SubscriptionRepository extends BasePostgresRepository<SubscriptionEntity, Subscription> {
  constructor(
    entityFactory: SubscriptionFactory,
    private readonly client: PrismaClientService
  ) {
    super(entityFactory);
  }

  public async save(subscription: SubscriptionEntity): Promise<void> {
    const pojoSubscription = subscription.toPOJO();

    await this.client.subscription.create({
      data: {...pojoSubscription}
    });
  }

  public async getSubscriptionsById(subscribeToId: string): Promise<SubscriptionEntity[]> {
    const subscriptions = await this.client.subscription.findMany({
      where: {subscribeToId}
    });

    return subscriptions.map((subscription) => this.createEntityFromDocument(subscription));
  }

  public async isSubscriptionExist(subscribeById: string,subscribeToId: string): Promise<SubscriptionEntity | null> {
    const existedSubscription = await this.client.subscription.findFirst({
      where: { subscribeById, subscribeToId }
    });

    if (!existedSubscription) {
      return null;
    }

    return this.createEntityFromDocument(existedSubscription);
  }

  public async delete(subscribeToId: string, subscribeById: string): Promise<void> {
   const deletedItems = await this.client.subscription.delete({
      where: {subscribeById_subscribeToId: {
        subscribeById, subscribeToId
      }}
    });

    if (!deletedItems) {
      throw new BadRequestException('You haven\'t subscribed to this user')
    }
  }
}
