import { EntityFactory, Notification } from "@backend/shared-core";
import { Injectable } from "@nestjs/common";
import { NotificationEntity } from "./notification.entity";

@Injectable()
export class NotificationFactory implements EntityFactory<NotificationEntity> {
  create(entityPlainData: Notification): NotificationEntity {
    return new NotificationEntity(entityPlainData);
  }
}
