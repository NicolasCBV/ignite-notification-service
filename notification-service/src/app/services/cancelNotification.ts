import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notificationRepository';
import { notificationNotFound } from './errors/notificationNotFound';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationRepository) {}

  async exec(
    req: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = req;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new notificationNotFound();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
