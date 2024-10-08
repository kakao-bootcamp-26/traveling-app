import { indexApi } from "@/services";
import { FlightCuration } from "@/shared/entities/flightCuration.entity";
import { TravelInformation } from "@/shared/dto/flightCurationReq.dto";

const flightsApi = indexApi.extend({
  prefixUrl: "api/flights",
});

export const fetchInternationalRoundTripFlightList = async (
  travelInformation: TravelInformation,
): Promise<FlightCuration | { error: string }> => {
  const response = (await flightsApi
    .post("round-trip", {
      json: {
        ...travelInformation,
      },
    })
    .json()) as { data: FlightCuration };
  const flightCuration = response.data;

  return flightCuration;
};
