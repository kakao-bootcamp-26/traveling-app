import { useFindFlightStateContext } from "@/pages/home/components/provider/useFindFlightStateContext";
import React from "react";

export default function FlightSuggestions() {
  const { isLoading, start, flight } = useFindFlightStateContext();

  return (
    // <div className={`${start ? "bg-dark-blue" : "bg-transparent"}`}>
    <div className={`${flight ? "suggestion" : ""}`}>
      <section
        className={`${start ? "bg-dark-blue" : "bg-transparent"}  h-[100vh] overflow-y-scroll text-white `}
      >
        {isLoading && <div>Loading...</div>}
        {flight && <div>{flight.destination.city}</div>}
      </section>
    </div>
  );
}
