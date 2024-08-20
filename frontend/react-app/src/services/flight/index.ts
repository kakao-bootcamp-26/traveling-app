import { indexApi } from "@/services";

const flightsApi = indexApi.extend({
  prefixUrl: "api/flights",
});

export const fetchInternationalRoundTripFlightList = async () => {
  const response = await flightsApi.post("round-trip");
  return response.json();
};
