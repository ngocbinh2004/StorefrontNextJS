import BaseModel from "./BaseModel";
import FileModel from "./FileModel";
import Attribute from "../contants/Attribute";
import { BaseModelJson } from "../interfaces/BaseModelJson";
import { AttributeJson } from "../types/Attribute";

class AttributeModel extends BaseModel implements BaseModelJson<AttributeJson> {
  attribute_group_id: number;
  id: number;
  name: string;
  type: number;
  description: string;
  options: string;
  status: number;
  display_order: number;
  allow_web_filter: number;
  default_show: number;

  constructor(json: AttributeJson) {
    super();

    this.attribute_group_id = json.attribute_group_id || 0;
    this.id = json.id || 0;
    this.name = json.name || "";
    this.type = json.type || 0;
    this.status = json.status || 0;
    this.options = json.options || "";
    this.description = json.description || "";
    this.allow_web_filter = json.allow_web_filter || 0;
    this.display_order = json.display_order || 0;
    this.default_show = json.default_show || 0;
  }

  static getDefaultData(): AttributeJson {
    return {
      attribute_group_id: 0,
      id: 0,
      name: "",
      type: 0,
      options: "",
      status: Attribute.STATUS_ENABLE,
      description: "",
      display_order: 0,
      allow_web_filter: 0,
      default_show: 0,
    };
  }

  toJson(): AttributeJson {
    return {
      attribute_group_id: this.attribute_group_id,
      id: this.id,
      name: this.name,
      type: this.type,
      options: this.options,
      status: this.status,
      description: this.description,
      display_order: this.display_order,
      allow_web_filter: this.allow_web_filter,
      default_show: this.default_show,
    };
  }
}

export default AttributeModel;
