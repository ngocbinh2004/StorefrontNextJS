import { create, StateCreator } from "zustand";
import InventoryStockModel from "../models/InventoryStockModel";

type InventoryStockStore = {
  items: InventoryStockModel[];
  setItems: (v: InventoryStockModel[]) => void;
  loading: boolean;
  setLoading: (v: boolean) => void;
  checkInstock: (
    w: number,
    v: number,
    stockItems?: InventoryStockModel[]
  ) => boolean;
};

//init store data
let store: StateCreator<InventoryStockStore> = (set, get) => ({
  items: [],
  setItems: (items) => set((state) => ({ ...state, items })),
  loading: false,
  setLoading: (loading) => set((state) => ({ ...state, loading })),
  checkInstock: (checkWarehouseId, product_variant_id, stockItems) => {
    //limit check warehouseid
    const usedCheckWarehouseId = checkWarehouseId >= 0 ? checkWarehouseId : 0;
    const checkItems =
      typeof stockItems !== "undefined" ? stockItems : get().items;

    const item = checkItems.find(
      (i) => i.product_variant_id === product_variant_id
    );

    if (typeof item !== "undefined" && Array.isArray(item.stocks)) {
      const stockOnWarehouse = item.stocks.find(
        (i) => i.warehouse_id === usedCheckWarehouseId
      );
      if (
        typeof stockOnWarehouse !== "undefined" &&
        stockOnWarehouse.quantity > 0
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
});

//create store
const useInventoryStockStore = create(store);

export default useInventoryStockStore;
