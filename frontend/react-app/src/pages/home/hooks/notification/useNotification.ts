import { notification } from "antd";
import { NotificationConfig } from "antd/es/notification/interface";

export default function useNotification(notificationConfig?: NotificationConfig) {
  const [api, contextHolder] = notification.useNotification(notificationConfig);
  const openNotificationWithIcon = (type: "error" | "info") => (title: string, message: string) => {
    api[type]({
      // message: "날짜 입력 오류",
      message: title,
      description: message,
    });
  };
  return { contextHolder, openNotificationWithIcon };
}
