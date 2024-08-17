import { useSetRecoilState } from "recoil";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import type { PassengerCount } from "@/shared/entities";

export default function useControlPassengerCount() {
  const changeSelectedTravelInfo = useSetRecoilState(selectedTravelInfoSelector);

  // 성인, 아동, 유아 승객 수를 업데이트하는 함수
  const updatePassengerCount = (type: keyof PassengerCount, operation: (cur: number) => number) => {
    changeSelectedTravelInfo((prevState) => {
      const count = prevState.passenger.count[type];

      const newCount = operation(count);

      if (count === newCount) return prevState;

      return {
        ...prevState,
        passenger: {
          ...prevState.passenger,
          count: {
            ...prevState.passenger.count,
            [type]: newCount,
          },
        },
      };
    });
  };

  return { updatePassengerCount };
}
