import { BaseModelJson } from "../interfaces/BaseModelJson";
import {
  ProductFilterJson,
  ProductFilterOption,
  ProductFilterSelectionDetailItem,
} from "../types/ProductFilter";

import BaseModel from "./BaseModel";

class ProductFilterModel
  extends BaseModel
  implements BaseModelJson<ProductFilterJson>
{
  id: number;
  label: string;
  type: number;
  style: number;
  object_id: number;
  limit_selection: number;
  selection_detail: ProductFilterSelectionDetailItem[];
  options: ProductFilterOption[];
  display_order: number;

  constructor(json: ProductFilterJson) {
    super();

    this.id = json.id || 0;
    this.label = json.label || "";
    this.type = json.type || 0;
    this.style = json.style || 0;
    this.object_id = json.object_id || 0;
    this.limit_selection = json.limit_selection || 0;
    this.selection_detail = json.selection_detail || [];
    this.options = json.options || [];
    this.display_order = json.display_order || 0;
  }

  static getDefaultData(): ProductFilterJson {
    return {
      id: 0,
      label: "",
      type: 0,
      style: 0,
      object_id: 0,
      limit_selection: 0,
      selection_detail: [],
      options: [],
      display_order: 0,
    };
  }

  toJson(): ProductFilterJson {
    return {
      id: this.id,
      label: this.label,
      type: this.type,
      style: this.style,
      object_id: this.object_id,
      limit_selection: this.limit_selection,
      selection_detail: this.selection_detail,
      options: this.options,
      display_order: this.display_order,
    };
  }
}

export default ProductFilterModel;
