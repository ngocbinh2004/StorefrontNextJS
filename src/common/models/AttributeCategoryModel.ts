import AttributeCategory from "../contants/AttributeCategory";
import { BaseModelJson } from "../interfaces/BaseModelJson";
import { AttributeCategoryJson } from "../types/AttributeCategory";
import BaseModel from "./BaseModel";

class AttributeCategoryModel
  extends BaseModel
  implements BaseModelJson<AttributeCategoryJson>
{
  id: number;
  name: string;
  code: string;
  external_id: string;
  description: string;
  count_attributegroup: number;
  count_attribute: number;
  status: number;

  constructor(json: AttributeCategoryJson) {
    super();

    this.id = json.id || 0;
    this.name = json.name || "";
    this.code = json.code || "";
    this.external_id = json.external_id || "";
    this.description = json.description || "";
    this.count_attributegroup = json.count_attributegroup || 0;
    this.count_attribute = json.count_attribute || 0;
    this.status = json.status || 0;
  }

  static getDefaultData(): AttributeCategoryJson {
    return {
      id: 0,
      name: "",
      code: "",
      external_id: "",
      description: "",
      count_attributegroup: 0,
      count_attribute: 0,
      status: AttributeCategory.STATUS_ENABLE,
    };
  }

  toJson(): AttributeCategoryJson {
    return {
      id: this.id,
      name: this.name,
      code: this.code,
      external_id: this.external_id,
      description: this.description,
      count_attributegroup: this.count_attributegroup,
      count_attribute: this.count_attribute,
      status: this.status,
    };
  }
}

export default AttributeCategoryModel;
