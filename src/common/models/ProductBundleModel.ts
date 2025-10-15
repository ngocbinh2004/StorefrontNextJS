import { BaseModelJson } from "../interfaces/BaseModelJson";
import { ProductBundleJson } from "../types/ProductBundle";
import { ProductBundleDetailJson } from "../types/ProductBundleDetail";

import BaseModel from "./BaseModel";
import ProductBundleDetailModel from "./ProductBundleDetailModel";

class ProductBundleModel
  extends BaseModel
  implements BaseModelJson<ProductBundleJson>
{
  company_id: number;
  id: number;
  name: string;
  code: string;
  description: string;
  external_id: string;
  discount_type: number;
  discount_value: number;
  details?: ProductBundleDetailJson[];

  constructor(json: ProductBundleJson) {
    super();

    this.company_id = json.company_id || 0;
    this.id = json.id || 0;
    this.name = json.name || "";
    this.code = json.code || "";
    this.description = json.description || "";
    this.external_id = json.external_id || "";
    this.discount_type = json.discount_type || 0;
    this.discount_value = json.discount_value || 0;
    this.details = json.details || [ProductBundleDetailModel.getDefaultData()];
  }

  static getDefaultData(): ProductBundleJson {
    return {
      company_id: 0,
      id: 0,
      name: "",
      code: "",
      description: "",
      external_id: "",
      discount_type: 0,
      discount_value: 0,
      details: [ProductBundleDetailModel.getDefaultData()],
    };
  }

  toJson(): ProductBundleJson {
    return {
      company_id: this.company_id,
      id: this.id,
      name: this.name,
      code: this.code,
      description: this.description,
      external_id: this.external_id,
      discount_type: this.discount_type,
      discount_value: this.discount_value,
      details: this.details,
    };
  }
}

export default ProductBundleModel;
