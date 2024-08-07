import { MenuItem, TravelSchedule } from "@/shared/entities";
import { TravelInfo } from "@/shared/entities";

const Label = ({ location, schedule }: { location: string; schedule?: TravelSchedule }) => {
  return (
    <div
      style={{
        // minHeight: "120px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <span>{location}</span>
      {schedule ? (
        <span>
          {schedule.departure.toLocaleDateString()} - {schedule.arrival.toLocaleDateString()}
        </span>
      ) : (
        <span>Anytime</span>
      )}
    </div>
  );
};

const defaultStyle = {
  fontSize: "14px",
  padding: "13px 9px",
  margin: "0",
  width: "120px",
  height: "auto",
  whiteSpace: "pre-wrap",
};

export const createMenuItem = (
  // travelInfo: Pick<TravelInfo, "origin" | "destination" | "schedule">,
  travelInfo: Pick<TravelInfo, "origin" | "destination" | "key"> & Partial<TravelInfo>,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem => {
  const location = `${travelInfo.origin} - ${travelInfo.destination || "ANY"}`;

  return {
    key: travelInfo.key,
    icon,
    children,
    label: <Label location={location} schedule={travelInfo?.schedule} />,
    style: defaultStyle,
  } as MenuItem;
};

export const initializeMenuItem = (key: string) => {
  return createMenuItem({
    origin: "ICN",
    destination: "",
    key,
  });
};
