import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";

type NavigationState = {
  openMobileMenu: boolean | undefined;
  setOpenMobileMenu: (open: boolean | undefined) => void;
};

export const store: StateCreator<NavigationState> = (set) => ({
  openMobileMenu: false,
  setOpenMobileMenu: (open?: boolean) => set({ openMobileMenu: open }),
});

const useNavigation = create(persist(store, { name: "MAIN::OVIRO" }));

export default useNavigation;
