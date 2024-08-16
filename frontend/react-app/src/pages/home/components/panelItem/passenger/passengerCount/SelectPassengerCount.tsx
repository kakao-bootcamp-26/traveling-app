import CounterFactory from "@/pages/home/components/panelItem/passenger/passengerCount/CounterFactory";

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
      <CounterFactory passengerType="adults" />
      <CounterFactory passengerType="children" />
      <CounterFactory passengerType="infants" />
    </div>
  );
}
