import { indexApi } from "@/services";
import { FlightCuration } from "@/shared/entities/flightCuration.entity";

const flightsApi = indexApi.extend({
  prefixUrl: "api/flights",
});

export const fetchInternationalRoundTripFlightList = async (): Promise<FlightCuration> => {
  const response = (await flightsApi.post("round-trip").json()) as { data: FlightCuration };
  const flightCuration = response.data;

  return flightCuration;
};
