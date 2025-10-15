import { BaseModelJson } from "../interfaces/BaseModelJson";
import { LandingJson } from "../types/Landing";
import BaseModel from "./BaseModel";

class LandingModel extends BaseModel implements BaseModelJson<LandingJson> {
  id: number;
  title: string;
  content: string;
  status: number;
  seo_url: string;
  is_mandatory: number;

  constructor(json: LandingJson) {
    super();

    this.id = json.id || 0;
    this.title = json.title || "";
    this.content = json.content || "";
    this.status = json.status || 0;
    this.seo_url = json.seo_url || "";
    this.is_mandatory = json.is_mandatory || 0;
  }

  static getDefaultData(): LandingJson {
    return {
      id: 0,
      title: "",
      content: "",
      status: 0,
      seo_url: "",
      is_mandatory: 0,
    };
  }

  toJson(): LandingJson {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      status: this.status,
      seo_url: this.seo_url,
      is_mandatory: this.is_mandatory,
    };
  }
}

export default LandingModel;
