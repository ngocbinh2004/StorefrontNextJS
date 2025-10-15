import AttributeGroup from "../contants/AttributeGroup";
import { BaseModelJson } from "../interfaces/BaseModelJson";
import { AttributeGroupJson } from "../types/AttributeGroup";
import BaseModel from "./BaseModel";

class AttributeGroupModel
  extends BaseModel
  implements BaseModelJson<AttributeGroupJson>
{
  attribute_category_id: number;
  id: number;
  name: string;
  description: string;
  status: number;
  display_order: number;

  constructor(json: AttributeGroupJson) {
    super();

    this.attribute_category_id = json.attribute_category_id || 0;
    this.id = json.id || 0;
    this.name = json.name || "";
    this.status = json.status || 0;
    this.description = json.description || "";
    this.display_order = json.display_order || 0;
  }

  static getDefaultData(): AttributeGroupJson {
    return {
      attribute_category_id: 0,
      id: 0,
      name: "",
      status: AttributeGroup.STATUS_ENABLE,
      description: "",
      display_order: 0,
    };
  }

  toJson(): AttributeGroupJson {
    return {
      attribute_category_id: this.attribute_category_id,
      id: this.id,
      name: this.name,
      status: this.status,
      description: this.description,
      display_order: this.display_order,
    };
  }
}

export default AttributeGroupModel;
