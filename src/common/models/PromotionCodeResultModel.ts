import BaseModel from "./BaseModel";

import { BaseModelJson } from "../interfaces/BaseModelJson";
import { PromotionCodeResultJson } from "../types/PromotionCode";
class PromotionCodeResultModel
  extends BaseModel
  implements BaseModelJson<PromotionCodeResultJson>
{
  id: number;
  name: string;
  code: string;
  discount_type: number;
  discount_value: number;

  constructor(json: PromotionCodeResultJson) {
    super();

    this.id = json.id || 0;
    this.name = json.name || "";
    this.code = json.code || "";
    this.discount_type = json.discount_type || 0;
    this.discount_value = json.discount_value || 0;
  }

  static getDefaultData(): PromotionCodeResultJson {
    return {
      id: 0,
      name: "",
      code: "",
      discount_type: 0,
      discount_value: 0,
    };
  }

  toJson(): PromotionCodeResultJson {
    return {
      id: this.id,
      name: this.name,
      code: this.code,
      discount_type: this.discount_type,
      discount_value: this.discount_value,
    };
  }
}

export default PromotionCodeResultModel;
