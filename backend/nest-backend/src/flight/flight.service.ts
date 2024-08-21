import { TravelInformation } from '@/flight/dto/TravelInformation.dto';
import { fetchInternationalFlightList } from '@/flight/adapter/naverFlight.adapter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FlightService {
  async getRoundTripFlight(travelInformation: TravelInformation) {
    try {
      const roundTrip = await fetchInternationalFlightList(travelInformation);
      return roundTrip;
    } catch (error) {
      console.error('getRoundTripFlight Service Error');
    }
  }

  getOneWayFlight() {
    return 'This is a one way flight';
  }
}
