import { useRecoilState } from "recoil";
import { createMenuItem } from "@/shared/utils";
import { v4 as uuidv4 } from "uuid";
import { selectedTravelInfoSelector, travelInfoAtom } from "@/shared/atom/travelAtom";
import { DeleteOutlined } from "@ant-design/icons";
import { createNewTravelItem } from "@/shared/utils/travelInfo";

export function useGetMenuList() {
  const [travelInfo, setTravelInfo] = useRecoilState(travelInfoAtom);
  const [selectedItem, updater] = useRecoilState(selectedTravelInfoSelector);

  const selectTravelItem = (key: string) => {
    const selectedInfo = travelInfo.find((info) => info.key === key)!;
    updater(selectedInfo);
  };

  const removeTravelInfo = (key: string) => {
    const filteredTravelInfo = travelInfo.filter((info) => info.key !== key);
    setTravelInfo(filteredTravelInfo);
    updater(filteredTravelInfo.at(-1)!);
  };

  const menuList = travelInfo.map((info) =>
    createMenuItem(
      {
        origin: info.origin,
        destination: info.destination,
        key: info.key,
        schedule: info?.schedule,
      },
      <span
        style={{
          position: "absolute",
          right: "4px",
          visibility: selectedItem.key === info.key && travelInfo.length > 1 ? "visible" : "hidden",
          opacity: selectedItem.key === info.key && travelInfo.length > 1 ? 1 : 0,
          transition: "opacity 0.3s",
          cursor: "pointer",
        }}
        data-key={info.key}
        onClick={() => {
          // Add this to handle delete action
          removeTravelInfo(info.key);
        }}
      >
        <DeleteOutlined />
      </span>,
    ),
  );

  const addTravelInfo = () => {
    const newMenuItem = createNewTravelItem(uuidv4());
    setTravelInfo([...travelInfo, newMenuItem]);
    updater(newMenuItem);
  };

  return {
    menuList,
    addMenuItem: addTravelInfo,
    removeMenuItem: removeTravelInfo,
    selectTravelItem,
    selectedItem,
  };
}
