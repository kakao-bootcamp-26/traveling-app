export type ExpirationState<T> = {
  value: T;
  expiry: number;
};

// 일정 시간 이상 지나면 삭제될 수 있는 정보를 담은 객체를 sessionStorage에 저장
export function setExpirationStateInSessionStorage<T>(
  key: string,
  expirationTime: number = 1000 * 60 * 30,
) {
  return (value: T) => {
    const now = new Date();
    const item = {
      value,
      expiry: now.getTime() + expirationTime,
    };
    sessionStorage.setItem(key, JSON.stringify(item));
  };
}

// 일정 시간 이상 지나면 삭제될 수 있는 정보를 담은 객체를 sessionStorage에 저장
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export function validateExpirationStateFromSessionStorage<T extends unknown>(key: string) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaultValue: any = false,
  ) => {
    const itemStr = sessionStorage.getItem(key);
    if (!itemStr) {
      return defaultValue;
    }

    const item = JSON.parse(itemStr) as ExpirationState<T>;
    const current = new Date();
    if (current.getTime() > item.expiry) {
      // expired state
      sessionStorage.removeItem(key);
      return defaultValue;
    }

    return item.value;
  };
}
