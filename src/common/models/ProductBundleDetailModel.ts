import { BaseModelJson } from "../interfaces/BaseModelJson";
import { ProductBundleDetailJson } from "../types/ProductBundleDetail";

import BaseModel from "./BaseModel";

class ProductBundleDetailModel
  extends BaseModel
  implements BaseModelJson<ProductBundleDetailJson>
{
  company_id: number;
  bundle_id: number;
  product_id: number;
  product_variant_id: number;
  id: number;
  external_id: number;
  note: string;
  discount_type: number;
  discount_value: number;
  variant_exchange_mode: number;
  variant_exchange_id_list: number[];

  constructor(json: ProductBundleDetailJson) {
    super();

    this.company_id = json.company_id || 0;
    this.product_id = json.product_id || 0;
    this.product_variant_id = json.product_variant_id || 0;
    this.bundle_id = json.bundle_id || 0;
    this.id = json.id || 0;
    this.external_id = json.external_id || 0;
    this.discount_type = json.discount_type || 0;
    this.discount_value = json.discount_value || 0;
    this.note = json.note || "";
    this.variant_exchange_mode = json.variant_exchange_mode || 0;
    this.variant_exchange_id_list = json.variant_exchange_id_list || [];
  }

  static getDefaultData(): ProductBundleDetailJson {
    return {
      company_id: 0,
      product_id: 0,
      product_variant_id: 0,
      bundle_id: 0,
      id: 0,
      external_id: 0,
      discount_type: 0,
      discount_value: 0,
      note: "",
      variant_exchange_mode: 0,
      variant_exchange_id_list: [],
    };
  }

  toJson(): ProductBundleDetailJson {
    return {
      company_id: this.company_id,
      product_id: this.product_id,
      product_variant_id: this.product_variant_id,
      bundle_id: this.bundle_id,
      id: this.id,
      external_id: this.external_id,
      discount_type: this.discount_type,
      discount_value: this.discount_value,
      note: this.note,
      variant_exchange_mode: this.variant_exchange_mode,
      variant_exchange_id_list: this.variant_exchange_id_list,
    };
  }
}

export default ProductBundleDetailModel;
