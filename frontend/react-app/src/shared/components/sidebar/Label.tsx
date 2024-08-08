import { TravelSchedule } from "@/shared/entities";

export const Label = ({
  location,
  schedule,
}: {
  location: string;
  schedule?: Partial<TravelSchedule>;
}) => {
  console.log("schedule", schedule);
  return (
    <div
      style={{
        // minHeight: "120px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontSize: "14px",
          height: "25px",
          lineHeight: "25px",
        }}
      >
        {location}
      </span>
      {/* {schedule ? <span>{scheduleInformationToString(schedule)}</span> : <span>Anytime</span>} */}
      {schedule?.arrival && (
        <span
          style={{
            fontSize: "11px",
            height: "20px",
            lineHeight: "20px",
          }}
        >
          {schedule?.arrival?.format("YYYY-MM-DD")}
        </span>
      )}
      {schedule?.departure && (
        <span
          style={{
            fontSize: "11px",
            height: "20px",
            lineHeight: "20px",
          }}
        >
          {schedule?.departure?.format("YYYY-MM-DD")}
        </span>
      )}
    </div>
  );
};
