import { MenuItem } from "@/shared/entities";
import { TravelInfo } from "@/shared/entities";

const defaultStyle = {
  fontSize: "14px",
  padding: "13px 9px",
  margin: "0",
  width: "100%",
};

export const createMenuItem = (
  // travelInfo: Pick<TravelInfo, "origin" | "destination" | "schedule">,
  travelInfo: Pick<TravelInfo, "origin" | "destination" | "key">,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem => {
  const label = `${travelInfo.origin} - ${travelInfo.destination}`;
  return {
    key: travelInfo.key,
    icon,
    children,
    label,
    style: defaultStyle,
  } as MenuItem;
};

export const initializeMenuItem = (key: string) => {
  return createMenuItem({
    origin: "Seoul",
    destination: "Jeju",
    key,
  });
};
