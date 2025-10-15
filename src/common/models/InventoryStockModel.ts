import BaseModel from "./BaseModel";
import { InventoryStock, InventoryStockJson } from "../types/InventoryStock";
import { BaseModelJson } from "../interfaces/BaseModelJson";

class InventoryStockModel
  extends BaseModel
  implements BaseModelJson<InventoryStockJson>
{
  product_variant_id: number;
  product_id: number;
  stocks: InventoryStock[];

  constructor(json: InventoryStockJson) {
    super();

    this.product_variant_id = json.product_variant_id || 0;
    this.product_id = json.product_id || 0;
    this.stocks = json.stocks || [];
  }

  static getDefaultData(): InventoryStockJson {
    return {
      product_variant_id: 0,
      product_id: 0,
      stocks: [],
    };
  }

  toJson(): InventoryStockJson {
    return {
      product_variant_id: this.product_variant_id,
      product_id: this.product_id,
      stocks: this.stocks,
    };
  }
}

export default InventoryStockModel;
