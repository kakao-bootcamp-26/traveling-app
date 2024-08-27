import { Module } from '@nestjs/common';
import { FlightService } from './application/service/flight.service';
import { FlightController } from './adapter/in/web/flight.controller';

@Module({
  controllers: [FlightController],
  providers: [FlightService],
})
export class FlightModule {}
