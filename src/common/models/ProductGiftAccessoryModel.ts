import { BaseModelJson } from "../interfaces/BaseModelJson";
import { ProductGiftAccessoryJson } from "../types/ProductGiftAccessory";
import { ProductGiftAccessoryDetailJson } from "../types/ProductGiftAccessoryDetail";

import BaseModel from "./BaseModel";

class ProductGiftAccessoryModel
  extends BaseModel
  implements BaseModelJson<ProductGiftAccessoryJson>
{
  company_id: number;
  id: number;
  name: string;
  code: string;
  description: string;
  external_id: string;
  details?: ProductGiftAccessoryDetailJson[];

  constructor(json: ProductGiftAccessoryJson) {
    super();

    this.company_id = json.company_id || 0;
    this.id = json.id || 0;
    this.name = json.name || "";
    this.code = json.code || "";
    this.description = json.description || "";
    this.external_id = json.external_id || "";
    this.details = json.details || [];
  }

  static getDefaultData(): ProductGiftAccessoryJson {
    return {
      company_id: 0,
      id: 0,
      name: "",
      code: "",
      description: "",
      external_id: "",
      details: [],
    };
  }

  toJson(): ProductGiftAccessoryJson {
    return {
      company_id: this.company_id,
      id: this.id,
      name: this.name,
      code: this.code,
      description: this.description,
      external_id: this.external_id,
      details: this.details,
    };
  }
}

export default ProductGiftAccessoryModel;
