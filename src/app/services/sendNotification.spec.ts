import { SendNotification } from './sendNotification';
import { inMemoryNotificationRepository } from '../../../test/repositories/inMemoryNotificationsRepository';

describe('Send notification', () => {
  it('should be able to send notification', async () => {
    const notificationsRepository = new inMemoryNotificationRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.exec({
      content: 'This is a notification',
      category: 'social',
      recipientId: 'test id',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
