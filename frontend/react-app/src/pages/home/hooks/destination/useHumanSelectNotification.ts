import useNotification from "@/pages/home/hooks/notification/useNotification";

export default function useHumanSelectNotification() {
  const { contextHolder, openNotificationWithIcon } = useNotification({
    maxCount: 2,
    showProgress: true,
  });

  const openInfoNotification = openNotificationWithIcon("info");

  const openSelectMoreThanOneCountryNotification = () => {
    openInfoNotification("국가를 선택해주세요.", "국가를 1개 이상 선택해주세요.");
  };

  const openSelectLessThanThreeCountryNotification = () => {
    openInfoNotification("선택 개수 초과", "국가는 최대 3개까지만 선택 가능합니다.");
  };

  const openSelectOneCityNotification = () => {
    openInfoNotification("도시를 선택해주세요.", "도시를 1개만 선택해주세요.");
  };

  return {
    contextHolder,
    openSelectMoreThanOneCountryNotification,
    openSelectLessThanThreeCountryNotification,
    openSelectOneCityNotification,
  };
}
