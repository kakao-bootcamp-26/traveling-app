import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './adapter/in/hotels.controller';

@Module({
  controllers: [HotelsController],
  providers: [HotelsService],
})
export class HotelsModule {}
