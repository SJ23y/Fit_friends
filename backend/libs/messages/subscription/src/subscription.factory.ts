import { EntityFactory, Subscription } from '@backend/shared-core';
import { SubscriptionEntity } from './subscription.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SubscriptionFactory implements EntityFactory<SubscriptionEntity> {
  create(entityPlainData: Subscription): SubscriptionEntity {
    return new SubscriptionEntity(entityPlainData);
  }
}
