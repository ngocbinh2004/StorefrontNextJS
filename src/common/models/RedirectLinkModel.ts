import { BaseModelJson } from "../interfaces/BaseModelJson";
import { RedirectLinkJson } from "../types/RedirectLink";
import BaseModel from "./BaseModel";

class RedirectLinkModel
  extends BaseModel
  implements BaseModelJson<RedirectLinkJson>
{
  id: number;
  source_type: number;
  source_url: string;
  redirect_url: string;
  redirect_type: number;
  status: number;

  constructor(json: RedirectLinkJson) {
    super();

    this.id = json.id || 0;
    this.source_type = json.source_type || 0;
    this.source_url = json.source_url || "";
    this.redirect_type = json.redirect_type || 0;
    this.redirect_url = json.redirect_url || "";
    this.status = json.status || 0;
  }

  static getDefaultData(): RedirectLinkJson {
    return {
      id: 0,
      source_type: 0,
      source_url: "",
      redirect_type: 0,
      redirect_url: "",
      status: 0,
    };
  }

  toJson(): RedirectLinkJson {
    return {
      id: this.id,
      source_type: this.source_type,
      source_url: this.source_url,
      redirect_url: this.redirect_url,
      redirect_type: this.redirect_type,
      status: this.status,
    };
  }
}

export default RedirectLinkModel;
