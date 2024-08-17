import PassengerCounterFactory from "@/pages/home/components/panelItem/passenger/passengerCount/PassengerCounterFactory";

export default function SelectPassengerCount() {
  return (
    <div
      data-nonblur="true"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        alignItems: "center",
        fontSize: "19px",
        rowGap: "24px",
      }}
    >
      <PassengerCounterFactory passengerType="adults" />
      <PassengerCounterFactory passengerType="children" />
      <PassengerCounterFactory passengerType="infants" />
    </div>
  );
}
