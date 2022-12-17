import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { HttpModule } from './http/http.module';

@Module({
  imports: [HttpModule, DatabaseModule],
})
export class AppModule {}
