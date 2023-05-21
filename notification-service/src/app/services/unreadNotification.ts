import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notificationRepository';
import { notificationNotFound } from './errors/notificationNotFound';

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(private notificationsRepository: NotificationRepository) {}

  async exec(
    req: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = req;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new notificationNotFound();
    }

    notification.unread();

    await this.notificationsRepository.save(notification);
  }
}
