import {
  setExpirationStateInSessionStorage,
  validateExpirationStateFromSessionStorage,
} from "@/shared/lib/session-expiration-storage";

const joinSuccessExpiration = 1000 * 60 * 30; // 30 minutes

export type JoinSuccessItem<T> = {
  value: T;
  expiry: number;
};

// 일정 시간 이상 지나면 삭제될 수 있는 정보를 담은 객체를 sessionStorage에 저장
export function setJoinSuccessExpirationInSessionStorage(value: boolean) {
  return setExpirationStateInSessionStorage("joinSuccess", joinSuccessExpiration)(value);
}

// 일정 시간 이상 지나면 삭제될 수 있는 정보를 담은 객체를 sessionStorage에 저장
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export function validateJoinSuccessFromSessionStorage() {
  return validateExpirationStateFromSessionStorage<boolean>("joinSuccess");
}
