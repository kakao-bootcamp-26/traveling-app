import { TravelInfo } from "@/shared/entities";

export function passengerInformationToString(passenger: TravelInfo["passenger"]) {
  let result = "";
  if (passenger.count.adults > 0) {
    result += `어른 ${passenger.count.adults}명`;
  }

  if (passenger.count.children > 0) {
    result += `, 어린이 ${passenger.count.children}명`;
  }

  if (passenger.count.infants > 0) {
    result += `, 유아 ${passenger.count.infants}명`;
  }

  if (passenger.flightClass) {
    result += `, ${passenger.flightClass}`;
  }

  return result;
}
