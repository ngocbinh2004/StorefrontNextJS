import BaseCollection from "./BaseCollection";
import InventoryStockModel from "../models/InventoryStockModel";
import {
  InventoryStockCollectionJson,
  InventoryStockJson,
} from "../types/InventoryStock";

class InventoryStockCollection extends BaseCollection<
  InventoryStockJson,
  InventoryStockModel,
  InventoryStockCollectionJson
> {
  itemsFromJson(jsonItems: InventoryStockJson[]): InventoryStockModel[] {
    return jsonItems.map((item) => new InventoryStockModel(item));
  }
}

export default InventoryStockCollection;
