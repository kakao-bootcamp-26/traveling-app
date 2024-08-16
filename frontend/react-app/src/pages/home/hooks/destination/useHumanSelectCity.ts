import { useState } from "react";

export default function useHumanSelectCity() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const toggleCity = (city: string) => {
    if (selectedCity === city) {
      setSelectedCity(null);
      return;
    }
    setSelectedCity(city);
  };

  return {
    selectedCity,
    toggleCity,
  };
}
