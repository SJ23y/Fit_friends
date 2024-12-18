import { Entity, StorableEntity, Subscription } from '@backend/shared-core';

export class SubscriptionEntity extends Entity implements StorableEntity<Subscription> {
  public subscribeById: string;
  public subscribeByName: string;
  public subscribeByEmail: string;
  public subscribeToId: string;
  public subscribeToName:  string;
  public createdAt?:  Date;
  public updatedAt?:  Date;
  public lastEmail:  Date;

  constructor(subscription?: Subscription) {
    super();

    this.populate(subscription);
  }

  private populate(subscription?: Subscription) {
    if (subscription) {
      this.subscribeById = subscription.subscribeById;
      this.subscribeByName = subscription.subscribeByName;
      this.subscribeByEmail = subscription.subscribeByEmail;
      this.subscribeToId = subscription.subscribeToId;
      this.subscribeToName = subscription.subscribeToName;
      this.createdAt = subscription.createdAt;
      this.updatedAt = subscription.updatedAt;
      this.lastEmail = subscription.lastEmail;
    }
  }

  public toPOJO(): Subscription {
    return {
      subscribeById: this.subscribeById,
      subscribeByName: this.subscribeByName,
      subscribeByEmail: this.subscribeByEmail,
      subscribeToId: this.subscribeToId,
      subscribeToName:  this.subscribeToName,
      createdAt:  this.createdAt,
      updatedAt:  this.updatedAt,
      lastEmail:  this.lastEmail
    }
  }
}
