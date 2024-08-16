import useNotification from "@/pages/home/hooks/notification/useNotification";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function useSelectKeyword() {
  const selectedTravelInfo = useRecoilValue(selectedTravelInfoSelector);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const MAX_KEYWORD_COUNT = 3;

  const { contextHolder, openNotificationWithIcon } = useNotification({
    maxCount: 2,
    showProgress: true,
  });

  const openInfoNotification = openNotificationWithIcon("info");

  useEffect(() => {
    // Reset selected keywords when travel info is changed
    setSelectedKeywords([]);
  }, [selectedTravelInfo]);

  const openMoreThanOneNotification = () =>
    openInfoNotification("키워드를 선택해주세요.", "키워드를 1개 이상 선택해주세요.");

  const openMaximumNotification = () =>
    openInfoNotification("최대 선택 개수 초과", "최대 3개까지 선택 가능합니다.");

  const toggleSelection = (item: string) => {
    const isAlreadySelected = selectedKeywords.includes(item);
    if (isAlreadySelected) {
      setSelectedKeywords(selectedKeywords.filter((keyword) => keyword !== item));
    } else if (selectedKeywords.length === MAX_KEYWORD_COUNT) {
      openMaximumNotification();
    } else {
      setSelectedKeywords([...selectedKeywords, item]);
    }
  };

  return {
    contextHolder,
    selectedKeywords,
    openMoreThanOneNotification,
    toggleSelection,
  };
}
