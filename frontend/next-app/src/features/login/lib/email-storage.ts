type Props = {
  email: string;
  shouldRemember?: boolean;
};

interface RememberEmailState {
  email: string;
  shouldRemember: boolean;
}
export interface Storage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

const defaultStorage: Storage = {
  getItem: (key: string) => localStorage.getItem(key),
  setItem: (key: string, value: string) => localStorage.setItem(key, value),
  removeItem: (key: string) => localStorage.removeItem(key),
};

/* rememberEmail 상태에 따라 LocalSotrage에 데이터를 저장할지 말지를 결정 */
export const toggleEmailStorage = (
  { email, shouldRemember = false }: Props,
  storage: Storage = defaultStorage,
) => {
  if (shouldRemember) {
    const persistState: RememberEmailState = {
      email,
      shouldRemember,
    };
    storage.setItem("persistEmail", JSON.stringify(persistState));
  } else {
    const persistState: RememberEmailState = {
      shouldRemember,
      email: "",
    };
    storage.setItem("persistEmail", JSON.stringify(persistState));
  }
};

export const getEmailState = (storage: Storage = defaultStorage): RememberEmailState => {
  const persistState = storage.getItem("persistEmail");
  if (persistState) {
    return JSON.parse(persistState);
  }
  return {
    shouldRemember: false,
    email: "",
  };
};
