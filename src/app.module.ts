import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { SyncController } from './sync.controller';

@Module({
  imports: [],
  controllers: [SyncController],
  providers: [DatabaseService],
})
export class AppModule {}
