import { fetchInternationalFlightList } from '@/flight/adapter/naverFlight.adapter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FlightService {
  async getRoundTripFlight() {
    try {
      const roundTrip = await fetchInternationalFlightList();
      return roundTrip;
    } catch (error) {
      console.error('getRoundTripFlight Service Error');
    }
  }

  getOneWayFlight() {
    return 'This is a one way flight';
  }
}
