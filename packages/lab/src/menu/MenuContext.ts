import { createContext } from "@salt-ds/core";
import { useContext } from "react";

export interface MenuContextValue {
  getItemProps: (
    userProps?: React.HTMLProps<HTMLElement>
  ) => Record<string, unknown>;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setHasFocusInside: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

export const MenuContext = createContext<MenuContextValue>("MenuContext", {
  getItemProps: () => ({}),
  activeIndex: null,
  setActiveIndex: () => undefined,
  setHasFocusInside: () => undefined,
  isOpen: false,
});

export function useMenuContext() {
  return useContext(MenuContext);
}
