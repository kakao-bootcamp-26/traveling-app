import { Body, Controller, Post } from '@nestjs/common';
import { HotelsService } from '../../hotels.service';
import { TravelInformation } from '@/hotels/dto/TravelInformation.dto';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post('recommendations')
  async getHotelRecommendations(@Body() body: TravelInformation) {
    try {
      const response = await this.hotelsService.getHotelRecommendations(body);
      return response;
    } catch (error) {
      console.error('error');
    }
  }
}
