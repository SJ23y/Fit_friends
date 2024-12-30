import { BasePostgresRepository, PrismaClientService } from '@backend/data-access';
import { Injectable } from '@nestjs/common';
import { Notification } from '@prisma/client';
import { SortDirection } from '@backend/shared-core';
import { NotificationFactory } from './notification.factory';
import { NotificationEntity } from './notification.entity';


@Injectable()
export class NotificationRepository extends BasePostgresRepository<NotificationEntity, Notification> {
  constructor(
    entityFactory: NotificationFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory);
  }

  public async save(notification: NotificationEntity): Promise<void> {
    const pojoNotification = notification.toPOJO();
    await this.client.notification.create({
      data: {
        text: pojoNotification.text,
        user: {
          connect: {
            id: pojoNotification.userId
          }
        }
      },
    });
  }

  public async findById(notificationId: string): Promise<NotificationEntity | null> {
    const foundNotification = await this.client.notification.findFirst({
      where: { id: notificationId }
    });

    if (! foundNotification) {
      return null;
    }

    return this.createEntityFromDocument(foundNotification);
  }


  public async getUserNotifications(userId: string): Promise<NotificationEntity[]> {
    const notifications = await this.client.notification.findMany({
      where: {userId},
      orderBy: {
        createdAt: SortDirection.DESC
      }
    });

    return notifications.map((notification) => this.createEntityFromDocument(notification));
  }

  public async delete(notificationId: string): Promise<void> {
    await this.client.notification.delete({
      where: {id: notificationId}
    });
  }
}
