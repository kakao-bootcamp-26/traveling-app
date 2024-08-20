import { Controller, Post, Res } from '@nestjs/common';
import { FlightService } from './flight.service';
import { Response } from 'express';

@Controller('flights')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Post('round-trip')
  async getRoundTripFlight(@Res() res: Response) {
    try {
      const response = await this.flightService.getRoundTripFlight();
      return res.json({ data: response });
    } catch (error) {
      console.error('error');
      return res.status(400).json({
        error: 'Error fetching the first response',
      });
    }
  }

  @Post('one-way')
  getOneWayFlight() {
    return this.flightService.getOneWayFlight();
  }
}
