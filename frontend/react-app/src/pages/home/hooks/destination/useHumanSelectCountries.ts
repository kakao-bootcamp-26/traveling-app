import { useState } from "react";

const MAX_COUNTRY_COUNT = 3;

export default function useHumanSelectCountries(onExceedMaximumSelection: () => void) {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const toggleSelection = (country: string) => {
    const isAlreadySelected = selectedCountries.includes(country);
    if (isAlreadySelected) {
      setSelectedCountries(
        selectedCountries.filter((selectedCountry) => selectedCountry !== country),
      );
    } else if (selectedCountries.length >= MAX_COUNTRY_COUNT) {
      onExceedMaximumSelection();
    } else {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  return {
    selectedCountries,
    toggleSelection,
  };
}
