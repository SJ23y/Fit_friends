import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { NotificationRepository } from "./notification.repository";
import { NotificationEntity } from "./notification.entity";
import { NotificationInfoMessages } from "./notification.consts";

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  public async saveNotification(text: string, userId: string): Promise<void> {
    const newNotification = new NotificationEntity({text, userId})
    await this.notificationRepository.save(newNotification)
  }

  public async getNotifications(userId: string): Promise<NotificationEntity[]> {
    return this.notificationRepository.getUserNotifications(userId);
  }

  public async deleteNotification(notificationId: string, userId: string) {
    const existedNotification = await this.notificationRepository.findById(notificationId);

    if (!existedNotification) {
      throw new BadRequestException(NotificationInfoMessages.NOT_FOUND);
    }

    if (existedNotification.userId !== userId) {
      throw new ConflictException(NotificationInfoMessages.WRONG_USER)
    }

    await this.notificationRepository.delete(notificationId)

  }
}
