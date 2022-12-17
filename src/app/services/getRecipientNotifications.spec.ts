import { inMemoryNotificationRepository } from '../../../test/repositories/inMemoryNotificationsRepository';
import { makeNotification } from '@test/factories/notificationFactory';
import { GetRecipientNotification } from './getRecipientNotifications';

describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new inMemoryNotificationRepository();
    const getRecipientNotification = new GetRecipientNotification(
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

    const { notifications } = await getRecipientNotification.exec({
      recipientId: 'recipient one',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient one' }),
        expect.objectContaining({ recipientId: 'recipient one' }),
      ]),
    );
  });
});
