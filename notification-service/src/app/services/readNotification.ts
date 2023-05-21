import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notificationRepository';
import { notificationNotFound } from './errors/notificationNotFound';

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationsRepository: NotificationRepository) {}

  async exec(req: ReadNotificationRequest): Promise<ReadNotificationResponse> {
    const { notificationId } = req;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new notificationNotFound();
    }

    notification.read();

    await this.notificationsRepository.save(notification);
  }
}
