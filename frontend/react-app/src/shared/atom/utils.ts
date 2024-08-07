// export const localStorageEffect =
//   (key: string) =>
//   ({ setSelf, onSet }: any) => {
//     const savedValue = localStorage.getItem(key);
//     if (savedValue !== null) {
//       setSelf(JSON.parse(savedValue));
//     }
//     onSet((newValue: any, _: any, isReset: boolean) => {
//       isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
//     });
//   };
// export const sessionStorageEffect =
//   (key: string) =>
//   ({ setSelf, onSet }: any) => {
//     const savedValue = sessionStorage.getItem(key);
//     if (savedValue !== null) {
//       setSelf(JSON.parse(savedValue));
//     }
//     onSet((newValue: any, _: any, isReset: any) => {
//       const confirm = newValue.length === 0;
//       confirm
//         ? sessionStorage.removeItem(key)
//         : sessionStorage.setItem(key, JSON.stringify(newValue));
//     });
//   };
import { InitTravelInfo } from "@/shared/entities";
import dayjs from "dayjs";
import { AtomEffect } from "recoil";

// Type for the state value, can be adjusted based on your use case
type StateValue<T> = T; // Replace `any` with the specific type of your atom state

export const localStorageEffect =
  <T>(key: string): AtomEffect<StateValue<T>> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      const item = JSON.parse(savedValue).map((item: InitTravelInfo) => {
        return {
          ...item,
          schedule: {
            ...item.schedule,
            arrival: dayjs(item.schedule?.arrival),
            departure: dayjs(item.schedule?.departure),
          },
        };
      });
      console.log(item);
      setSelf(item);
    }
    onSet((newValue, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const sessionStorageEffect =
  <T extends object>(key: string): AtomEffect<StateValue<T>> =>
  ({ setSelf, onSet }) => {
    const savedValue = sessionStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue, _, isReset) => {
      if (isReset || ("length" in newValue && newValue.length === 0)) {
        sessionStorage.removeItem(key);
      } else {
        sessionStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };
