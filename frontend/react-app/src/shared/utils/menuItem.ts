import { MenuItem } from "@/shared/entities";

export const registerMenuItem = (
  // travelInfo: Pick<TravelInfo, "origin" | "destination" | "schedule">,
  travelInfo: Pick<TravelInfo, "origin" | "destination">,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem => {
  const label = `${travelInfo.origin} - ${travelInfo.destination}`;
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
};

export const initializeMenuItem = () => {
  return registerMenuItem(
    {
      origin: "Seoul",
      destination: "Jeju",
    },
    "init",
  );
};
