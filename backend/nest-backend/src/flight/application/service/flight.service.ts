import { TravelInformation } from '@/flight/dto/TravelInformation.dto';
import { FetchNaverRecommendFlightListAdapter } from '@/flight/adapter/out/naverFlight.adapter';
import { Injectable } from '@nestjs/common';
import { RecommendFlightUseCase } from '@/flight/application/port/in/RecommendFlightUseCase';

@Injectable()
export class FlightService implements RecommendFlightUseCase {
  async recommendRoundTripFlight(travelInformation: TravelInformation) {
    try {
      const fetchNaverRecommendFlightListAdapter: FetchNaverRecommendFlightListAdapter =
        new FetchNaverRecommendFlightListAdapter();
      const roundTrip =
        await fetchNaverRecommendFlightListAdapter.fetchNaverRecommendFlight(
          travelInformation,
        );
      return roundTrip;
    } catch (error) {
      console.error('getRoundTripFlight Service Error');
    }
  }

  getOneWayFlight() {
    return 'This is a one way flight';
  }
}
