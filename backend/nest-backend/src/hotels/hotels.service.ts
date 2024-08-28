import { getNaverHotelRecommendation } from '@/hotels/adapter/outgoing/naverHotelRecommendation.adapter';
import { TravelInformation } from '@/hotels/dto/TravelInformation.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HotelsService {
  async getHotelRecommendations(travelInformationDto: TravelInformation) {
    try {
      const hotelRecommendations =
        await getNaverHotelRecommendation(travelInformationDto);
      return hotelRecommendations;
    } catch (error) {
      console.error('getHotelRecommendations Service Error');
    }
  }
}
