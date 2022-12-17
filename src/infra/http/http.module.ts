import { Module } from '@nestjs/common';
import { SendNotification } from '@app/services/sendNotification';
import { DatabaseModule } from '../db/database.module';
import { NotificationsController } from './controllers/notifications.controller';
import { CreateNotificationBody } from './dtos/create-notification-body';
import { CancelNotification } from '@app/services/cancelNotification';
import { CountRecipientNotification } from '@app/services/countRecipientNotifications';
import { GetRecipientNotification } from '@app/services/getRecipientNotifications';
import { ReadNotification } from '@app/services/readNotification';
import { UnreadNotification } from '@app/services/unreadNotification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    CreateNotificationBody,
    SendNotification,
    CancelNotification,
    CountRecipientNotification,
    GetRecipientNotification,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
