import { useEffect, useState } from "react";
import { localStorageKey } from "@/constants";
import { MenuItem } from "@/shared/entities";
import { initializeMenuItem } from "@/shared/utils";

export function useGetMenuList() {
  const [menuList, setMenuList] = useState<MenuItem[]>([]);

  useEffect(() => {
    const localStorageMenuList = localStorage.getItem(localStorageKey.menuList) || "";
    if (localStorageMenuList) {
      const storedMenuList = JSON.parse(localStorageMenuList) as MenuItem[];
      setMenuList(storedMenuList);
    } else {
      setMenuList([initializeMenuItem()]);
    }
  }, []);

  return { menuList };
}
