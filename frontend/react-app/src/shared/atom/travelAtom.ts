import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { localStorageKey, sessionStorageKey } from "@/constants";
import { InitTravelInfo } from "@/shared/entities";
import { localStorageEffect } from "@/shared/atom/utils";
import { v4 as uuidv4 } from "uuid";

const { persistAtom } = recoilPersist({
  key: localStorageKey.menuList,
  storage: localStorage,
  converter: JSON,
});

export const travelInfoAtom = atom<InitTravelInfo[]>({
  key: "travelInfo",
  default: [
    {
      origin: { airportCode: "ICN", city: "Seoul/Incheon" },
      destination: {
        city: "",
        airportCode: "",
      },
      passenger: {
        count: {
          adults: 1,
          children: 0,
          infants: 0,
        },
        flightClass: "Economy",
      },
      key: uuidv4(),
    },
  ],
  effects: [localStorageEffect(localStorageKey.menuList)],
  effects_UNSTABLE: [persistAtom],
});

// 선택된 여행 정보를 관리하는 Selector
export const selectedTravelInfoSelector = selector<InitTravelInfo>({
  key: "selectedTravelInfo",
  get: ({ get }) => {
    const travelInfo = get(travelInfoAtom);
    const savedSelectedKey = sessionStorage.getItem(sessionStorageKey.selectedTravelKey);

    if (savedSelectedKey) {
      const savedInfo = travelInfo.find((info) => info.key === savedSelectedKey);
      if (savedInfo) {
        return savedInfo;
      }
    }

    // 저장된 값이 없거나 유효하지 않은 경우 첫 번째 항목을 기본값으로 설정
    return travelInfo[0];
  },
  set: ({ set, get }, newValue) => {
    if (newValue) {
      if ("key" in newValue) {
        const travelInfo = get(travelInfoAtom);
        // 새로운 선택 항목이 유효한지 확인
        if (travelInfo.some((info) => info.key === newValue?.key)) {
          // console.log("newValue", travelInfo, newValue);
          sessionStorage.setItem(sessionStorageKey.selectedTravelKey, newValue?.key);
          // set(travelInfoAtom, [...travelInfo]);
          set(
            travelInfoAtom,
            travelInfo.map((info) => (info.key === newValue.key ? newValue : info)),
          );
        } else {
          console.log("제거된 항목:", newValue);
          // console.warn("유효하지 않은 선택 항목입니다:", newValue);
        }
      }
    }
  },
  // effects: [sessionStorageEffect(sessionStorageKey.selectedTravelKey)],
});
