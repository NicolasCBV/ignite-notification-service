import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientInitializationError } from '@prisma/client/runtime';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // constructor() {
  //   super({
  //     log: ['query'],
  //   });
  // }

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (err) {
      if (
        err instanceof PrismaClientInitializationError &&
        err.name === "Can't reach database server at"
      ) {
        console.warn(
          'cannot reach the actual database, trying to cannot in the next 30 seconds',
        );
        setTimeout(async () => {
          await this.$connect();
          console.log('connection was successfuly');
        }, 30000);
      }
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
