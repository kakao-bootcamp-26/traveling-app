import { Controller, Post } from '@nestjs/common';
import { FlightService } from './flight.service';

@Controller('flights')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Post('round-trip')
  getRoundTripFlight() {
    return this.flightService.getRoundTripFlight();
  }

  @Post('one-way')
  getOneWayFlight() {
    return this.flightService.getOneWayFlight();
  }
}
