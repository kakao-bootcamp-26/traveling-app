import PassengerCounter from "@/pages/home/components/panelItem/passenger/passengerCount/PassengerCounter";
import useControlPassengerCount from "@/pages/home/hooks/passenger/useControlPassengerCount";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import type { PassengerCount } from "@/shared/entities";
import { useRecoilValue } from "recoil";

type Props = {
  passengerType: keyof PassengerCount;
};

export default function CounterFactory({ passengerType }: Props) {
  const { updatePassengerCount } = useControlPassengerCount();
  const passengerCount = useRecoilValue(selectedTravelInfoSelector).passenger.count;
  if (passengerType === "adults") {
    const MIN_ADULTS = 1;
    const MAX_ADULTS = 8;
    const minimumCondition = passengerCount[passengerType] <= MIN_ADULTS;
    const maximumCondition = passengerCount[passengerType] >= MAX_ADULTS;
    return (
      <PassengerCounter
        passengerType={passengerType}
        minimumCondition={minimumCondition}
        maximumCondition={maximumCondition}
        currentCount={passengerCount[passengerType]}
        decreaseHandler={() =>
          updatePassengerCount(passengerType, (cur) =>
            cur - 1 > MIN_ADULTS ? cur - 1 : MIN_ADULTS,
          )
        }
        increaseHandler={() =>
          updatePassengerCount(passengerType, (cur) =>
            cur + 1 < MAX_ADULTS ? cur + 1 : MAX_ADULTS,
          )
        }
      />
    );
  }

  if (passengerType === "children") {
    const MIN_CHILDREN = 0;
    const MAX_CHILDREN = 8;
    const minimumCondition = passengerCount[passengerType] <= MIN_CHILDREN;
    const maximumCondition = passengerCount[passengerType] >= MAX_CHILDREN;
    return (
      <PassengerCounter
        passengerType={passengerType}
        minimumCondition={minimumCondition}
        maximumCondition={maximumCondition}
        currentCount={passengerCount[passengerType]}
        decreaseHandler={() =>
          updatePassengerCount(passengerType, (cur) =>
            cur - 1 > MIN_CHILDREN ? cur - 1 : MIN_CHILDREN,
          )
        }
        increaseHandler={() =>
          updatePassengerCount(passengerType, (cur) =>
            cur + 1 < MAX_CHILDREN ? cur + 1 : MAX_CHILDREN,
          )
        }
      />
    );
  }

  if (passengerType === "infants") {
    const MIN_INFANTS = 0;
    const MAX_INFANTS = 8;
    const minimumCondition = passengerCount[passengerType] <= MIN_INFANTS;
    const maximumCondition = passengerCount[passengerType] >= MAX_INFANTS;
    return (
      <PassengerCounter
        passengerType={passengerType}
        minimumCondition={minimumCondition}
        maximumCondition={maximumCondition}
        currentCount={passengerCount[passengerType]}
        decreaseHandler={() =>
          updatePassengerCount(passengerType, (cur) =>
            cur - 1 > MIN_INFANTS ? cur - 1 : MIN_INFANTS,
          )
        }
        increaseHandler={() =>
          updatePassengerCount(passengerType, (cur) =>
            cur + 1 < MAX_INFANTS ? cur + 1 : MAX_INFANTS,
          )
        }
      />
    );
  }
}
