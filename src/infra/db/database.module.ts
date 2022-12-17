import { Module } from '@nestjs/common';
import { NotificationRepository } from '@app/repositories/notificationRepository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNotificationsRepository } from './prisma/repositories/prismaNotificationsRepositories';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [NotificationRepository],
})
export class DatabaseModule {}
