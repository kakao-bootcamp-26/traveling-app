import { useMemo } from "react";
import useHumanSelectCity from "@/pages/home/hooks/destination/useHumanSelectCity";
import { cityMap } from "@/pages/home/constants/countries";
import { internationalAirportsWithCity } from "@/constants";

export default function useHumanSelectCityAndCountry(selectedCountries: string[]) {
  const { selectedCity, toggleCity } = useHumanSelectCity();

  const selectedCountry = useMemo(() => {
    return selectedCountries.find((country) => cityMap[country].includes(selectedCity || "")) || "";
  }, [selectedCity, selectedCountries]);

  const airport =
    internationalAirportsWithCity[selectedCity as keyof typeof internationalAirportsWithCity];

  return {
    selectedCity,
    toggleCity,
    selectedCountry,
    airport,
  };
}
