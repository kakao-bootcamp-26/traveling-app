import { Module } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightController } from './adapter/in/flight.controller';

@Module({
  controllers: [FlightController],
  providers: [FlightService],
})
export class FlightModule {}
