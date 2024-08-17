import { DestinationEntity } from "@/shared/entities/destination.entity";
import React from "react";
type Props = {
  city: DestinationEntity;
  sequence: number;
  selectCity: (city: DestinationEntity) => void;
  isSelected: boolean;
};
export default function CityCuration({ city, sequence, isSelected, selectCity }: Props) {
  return (
    <div data-nonblur="true" className="flex flex-col w-full mb-10">
      <p
        data-nonblur="true"
        className={`text-[18px] font-bold mb-2 ${isSelected ? "text-[#FFD700]" : "text-[#E5E7EB]"}`}
      >
        {sequence}번째 추천
      </p>
      <div
        data-nonblur="true"
        className="grid grid-cols-[1fr_2fr] w-full px-4 py-2 rounded-md cursor-pointer hover:shadow-2xl"
        style={{
          border: "2px solid ",
          borderColor: isSelected ? "#FFD700" : "#E5E7EB",
        }}
        onClick={() => {
          selectCity(city);
        }}
      >
        <p data-nonblur="true">국가</p>
        <p data-nonblur="true">{city.country}</p>
        <p data-nonblur="true">도시</p>
        <p data-nonblur="true">{city.city}</p>
        <p data-nonblur="true">공항</p>
        <p data-nonblur="true">
          {city.airport.name} ({city.airport.code})
        </p>
      </div>
    </div>
  );
}
