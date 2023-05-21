import { UnreadNotification } from './unreadNotification';
import { inMemoryNotificationRepository } from '../../../test/repositories/inMemoryNotificationsRepository';
import { notificationNotFound } from './errors/notificationNotFound';
import { makeNotification } from '@test/factories/notificationFactory';

describe('unread notification', () => {
  it('should be able to unread notification', async () => {
    const notificationsRepository = new inMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await unreadNotification.exec({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification', async () => {
    const notificationsRepository = new inMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    expect(() => {
      return unreadNotification.exec({
        notificationId: 'fake id',
      });
    }).rejects.toThrow(notificationNotFound);
  });
});
