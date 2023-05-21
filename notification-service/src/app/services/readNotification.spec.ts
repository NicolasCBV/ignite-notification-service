import { ReadNotification } from './readNotification';
import { inMemoryNotificationRepository } from '../../../test/repositories/inMemoryNotificationsRepository';
import { notificationNotFound } from './errors/notificationNotFound';
import { makeNotification } from '@test/factories/notificationFactory';

describe('Read notification', () => {
  it('should be able to Read notification', async () => {
    const notificationsRepository = new inMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await readNotification.exec({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to Read a non existing notification', async () => {
    const notificationsRepository = new inMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    expect(() => {
      return readNotification.exec({
        notificationId: 'fake id',
      });
    }).rejects.toThrow(notificationNotFound);
  });
});
