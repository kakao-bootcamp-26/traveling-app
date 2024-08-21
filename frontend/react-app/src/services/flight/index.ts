import { indexApi } from "@/services";
import { FlightCuration } from "@/shared/entities/flightCuration.entity";
import { TravelInformation } from "@/shared/entities/flightCurationReq.dto";

const flightsApi = indexApi.extend({
  prefixUrl: "api/flights",
});

export const fetchInternationalRoundTripFlightList = async (
  travelInformation: TravelInformation,
): Promise<FlightCuration> => {
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
