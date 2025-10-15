import { BaseModelJson } from "../interfaces/BaseModelJson";
import { ProductGiftAccessoryDetailJson } from "../types/ProductGiftAccessoryDetail";

import BaseModel from "./BaseModel";

class ProductGiftAccessoryDetailModel
  extends BaseModel
  implements BaseModelJson<ProductGiftAccessoryDetailJson>
{
  company_id: number;
  product_id: number;
  gift_accessory_id: number;
  product_variant_id: number;
  id: number;
  external_id: number;
  quantity: number;
  note: string;
  variant_exchange_mode: number;
  variant_exchange_id_list: number[];

  constructor(json: ProductGiftAccessoryDetailJson) {
    super();

    this.company_id = json.company_id || 0;
    this.product_id = json.product_id || 0;
    this.product_variant_id = json.product_variant_id || 0;
    this.gift_accessory_id = json.gift_accessory_id || 0;
    this.id = json.id || 0;
    this.external_id = json.external_id || 0;
    this.quantity = json.quantity || 0;
    this.note = json.note || "";
    this.variant_exchange_mode = json.variant_exchange_mode || 0;
    this.variant_exchange_id_list = json.variant_exchange_id_list || [];
  }

  static getDefaultData(): ProductGiftAccessoryDetailJson {
    return {
      company_id: 0,
      product_id: 0,
      product_variant_id: 0,
      gift_accessory_id: 0,
      id: 0,
      external_id: 0,
      quantity: 0,
      note: "",
      variant_exchange_mode: 0,
      variant_exchange_id_list: [],
    };
  }

  toJson(): ProductGiftAccessoryDetailJson {
    return {
      company_id: this.company_id,
      product_id: this.product_id,
      product_variant_id: this.product_variant_id,
      gift_accessory_id: this.gift_accessory_id,
      id: this.id,
      external_id: this.external_id,
      quantity: this.quantity,
      note: this.note,
      variant_exchange_mode: this.variant_exchange_mode,
      variant_exchange_id_list: this.variant_exchange_id_list,
    };
  }
}

export default ProductGiftAccessoryDetailModel;
