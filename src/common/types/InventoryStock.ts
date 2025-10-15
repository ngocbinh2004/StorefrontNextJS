import { BaseCollectionJson } from "./BaseCollection";
import { Filter } from "./Filter";

type InventoryStock = {
  warehouse_id: number;
  quantity: number;
};

type InventoryStockJson = {
  product_variant_id: number;
  product_id: number;
  stocks: InventoryStock[];
};

type InventoryStockCollectionJson = BaseCollectionJson<InventoryStockJson>;

export type {
  InventoryStock,
  InventoryStockJson,
  InventoryStockCollectionJson,
};
