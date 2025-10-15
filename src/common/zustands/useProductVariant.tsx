import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";

type useProductVariantState = {
  getSelectVariantId: number | undefined;
  setSelectVariantId: (value: number) => void;
};

export const store: StateCreator<useProductVariantState> = (set) => ({
  getSelectVariantId: 0,
  setSelectVariantId: (value: number) => set({ getSelectVariantId: value }),
});

const useProductVariant = create(persist(store, { name: "MAIN::OVIRO" }));

export default useProductVariant;
