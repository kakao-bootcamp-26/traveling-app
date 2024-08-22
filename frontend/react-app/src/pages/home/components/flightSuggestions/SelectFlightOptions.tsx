import { selectedTravelInfoFlightSuggestionsAtom } from "@/shared/atom/flightAtom";
import { useState } from "react";
import { useRecoilValue } from "recoil";

export default function SelectFlightOptions() {
  const selectedFlightSuggestions = useRecoilValue(selectedTravelInfoFlightSuggestionsAtom);
  const [selectedAirlines, setSelectedAirlines] = useState([]);

  if (!selectedFlightSuggestions?.flightCuration.data) return null;

  const airlines = Object.keys(selectedFlightSuggestions.flightCuration.data.airlines);
}
