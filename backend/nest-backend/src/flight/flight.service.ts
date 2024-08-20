import { fetchInternationalFlightList } from '@/flight/adapter/naverFlight.adapter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FlightService {
  async getRoundTripFlight() {
    const roundTrip = await fetchInternationalFlightList();
    return roundTrip;
  }

  getOneWayFlight() {
    return 'This is a one way flight';
  }
}
