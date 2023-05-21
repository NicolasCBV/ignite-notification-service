import { CountRecipientNotification } from './countRecipientNotifications';
import { inMemoryNotificationRepository } from '../../../test/repositories/inMemoryNotificationsRepository';
import { makeNotification } from '@test/factories/notificationFactory';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new inMemoryNotificationRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient one' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient one' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient two' }),
    );

    const { count } = await countRecipientNotification.exec({
      recipientId: 'recipient one',
    });

    expect(count).toEqual(2);
  });
});
