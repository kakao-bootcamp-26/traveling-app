import SelectFlightClass from "@/pages/home/components/panelItem/passenger/flightClass/SelectFlightClass";
import SelectPassengerCount from "@/pages/home/components/panelItem/passenger/passengerCount/SelectPassengerCount";

export function PassengerPanelItem() {
  return (
    <section data-nonblur="true">
      <SelectFlightClass />
      <SelectPassengerCount />
    </section>
  );
}
