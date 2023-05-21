import { CancelNotification } from './cancelNotification';
import { inMemoryNotificationRepository } from '../../../test/repositories/inMemoryNotificationsRepository';
import { notificationNotFound } from './errors/notificationNotFound';
import { makeNotification } from '@test/factories/notificationFactory';

describe('Cancel notification', () => {
  it('should be able to cancel notification', async () => {
    const notificationsRepository = new inMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await cancelNotification.exec({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = new inMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() => {
      return cancelNotification.exec({
        notificationId: 'fake id',
      });
    }).rejects.toThrow(notificationNotFound);
  });
});
