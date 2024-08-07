import { Label } from "@/shared/components/sidebar";
import { MenuItem, TravelSchedule } from "@/shared/entities";
import { TravelInfo } from "@/shared/entities";

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
  travelInfo: Pick<TravelInfo, "origin" | "destination" | "key"> & {
    schedule?: Partial<TravelSchedule>;
  },
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
