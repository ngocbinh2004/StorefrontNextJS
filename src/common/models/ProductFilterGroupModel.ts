import { BaseModelJson } from "../interfaces/BaseModelJson";
import { ProductFilterGroupJson } from "../types/ProductFilterGroup";

import BaseModel from "./BaseModel";
import ProductFilterModel from "./ProductFilterModel";

class ProductFilterGroupModel
  extends BaseModel
  implements BaseModelJson<ProductFilterGroupJson>
{
  id: number;
  visibility: number;
  filters: ProductFilterModel[];

  constructor(json: ProductFilterGroupJson) {
    super();

    this.id = json.id || 0;
    this.visibility = json.visibility || 0;
    this.filters = [];
    if (typeof json.filters !== "undefined" && Array.isArray(json.filters)) {
      this.filters = json.filters.map((item) => new ProductFilterModel(item));
    }
  }

  static getDefaultData(): ProductFilterGroupJson {
    return {
      id: 0,
      visibility: 0,
      filters: [],
    };
  }

  toJson(): ProductFilterGroupJson {
    return {
      id: this.id,
      visibility: this.visibility,
      filters: this.filters.map((i) => i.toJson()),
    };
  }
}

export default ProductFilterGroupModel;
