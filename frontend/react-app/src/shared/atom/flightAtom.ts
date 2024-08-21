import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { localStorageKey } from "@/constants";
import { localStorageEffect } from "@/shared/atom/utils";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { FlightCuration } from "@/shared/entities/flightCuration.entity";

const { persistAtom } = recoilPersist({
  key: localStorageKey.flightSuggestions,
  storage: localStorage,
  converter: JSON,
});

const flightSuggestionsAtom = atom<
  { key: string; flightCuration: { data: null | FlightCuration; error: null | string } }[]
>({
  key: "flightSuggestions",
  default: [],
  effects_UNSTABLE: [persistAtom],
  effects: [localStorageEffect(localStorageKey.flightSuggestions)],
});

export const selectedTravelInfoFlightSuggestionsAtom = selector({
  key: "selectedTravelInfoFlightSuggestions",
  get: ({ get }) => {
    const flightSuggestions = get(flightSuggestionsAtom);
    if (flightSuggestions.length === 0) return null;

    const selectedTravelInfo = get(selectedTravelInfoSelector);
    const selectedTravelInfoFlightSuggestions = flightSuggestions.find(
      (suggestion: any) => suggestion.key === selectedTravelInfo.key,
    );

    return selectedTravelInfoFlightSuggestions;
  },
  set: ({ set, get }, newValue) => {
    if (newValue) {
      if ("key" in newValue) {
        const flightSuggestions = get(flightSuggestionsAtom);
        // Check if the new selected item is valid

        console.log("new", newValue, flightSuggestions);
        // If the new selected item is valid, update the flight suggestions
        const isNew = flightSuggestions.every((suggestion: any) => suggestion.key !== newValue.key);
        if (isNew) {
          set(flightSuggestionsAtom, [...flightSuggestions, { ...newValue }]);
        } else {
          set(
            flightSuggestionsAtom,
            flightSuggestions.map((suggestion: any) =>
              suggestion.key === newValue.key ? { ...newValue } : suggestion,
            ),
          );
        }
      }
    }
  },
});
