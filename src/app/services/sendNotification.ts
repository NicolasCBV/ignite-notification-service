import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { NotificationRepository } from '../repositories/notificationRepository';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationRepository) {}

  async exec(req: SendNotificationRequest): Promise<SendNotificationResponse> {
    const { recipientId, category, content } = req;

    const notification = new Notification({
      recipientId,
      category,
      content: new Content(content),
    });

    await this.notificationsRepository.create(notification);

    return {
      notification,
    };
  }
}
