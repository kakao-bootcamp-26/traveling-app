import { Body, Controller, Post, Res } from '@nestjs/common';
import { FlightService } from './flight.service';
import { Response } from 'express';
import { TravelInformation } from '@/flight/dto/TravelInformation.dto';

@Controller('flights')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Post('round-trip')
  async getRoundTripFlight(
    @Body() body: TravelInformation,
    @Res() res: Response,
  ) {
    try {
      // console.log('body', body);
      // TODO: 입력 유효성 검사
      const response = await this.flightService.getRoundTripFlight(body);
      // TODO: 만약 항공편이 없을 경우 처리
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
