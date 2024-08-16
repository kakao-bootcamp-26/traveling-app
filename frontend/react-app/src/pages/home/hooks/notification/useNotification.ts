import { notification } from "antd";

export default function useNotification() {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type: "error" | "info") => (title: string, message: string) => {
    api[type]({
      // message: "날짜 입력 오류",
      message: title,
      description: message,
    });
  };
  return { contextHolder, openNotificationWithIcon };
}
