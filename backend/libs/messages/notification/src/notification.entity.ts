import { Entity, StorableEntity, Notification, User } from '@backend/shared-core';


export class NotificationEntity extends Entity implements StorableEntity<Notification> {
  public text: string;
  public createdAt?: Date;
  public user?: User;
  public userId?: string;

  constructor(notification?: Notification) {
    super();
    this.populate(notification);
  }

  public populate(notification?: Notification): void {
    if (notification) {
      this.id = notification.id ?? '';
      this.user = notification.user;
      this.userId = notification.userId;
      this.text = notification.text;
      this.createdAt = notification.createdAt;
    }
  }

  public toPOJO(): Notification {
    return {
      id: (this.id) ? this.id : undefined,
      text: this.text,
      user: this.user,
      createdAt: this.createdAt,
      userId: this.userId,
    }
  }
}
