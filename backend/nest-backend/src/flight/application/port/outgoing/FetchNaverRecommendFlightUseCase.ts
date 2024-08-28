import {
  FlightCurationError,
  FlightCurationSuccess,
} from '@/flight/dto/FlightCuration.dto';
import { TravelInformation } from '@/flight/dto/TravelInformation.dto';

export interface FetchNaverRecommendFlightUseCase {
  fetchNaverRecommendFlight(
    travelInformation: TravelInformation,
  ): Promise<FlightCurationSuccess | FlightCurationError>;
}
