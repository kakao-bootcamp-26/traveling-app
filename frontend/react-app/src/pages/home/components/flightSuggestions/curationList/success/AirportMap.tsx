import useShowAirportMap from "@/pages/home/hooks/map/useShowAirportMap";
import React from "react";

export default function AirportMap() {
  const map = useShowAirportMap();
  return <div>{map}</div>;
}
