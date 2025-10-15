import { BaseModelJson } from "../interfaces/BaseModelJson";
import { CustomerJson } from "../types/Customer";
import BaseModel from "./BaseModel";

class CustomerModel extends BaseModel implements BaseModelJson<CustomerJson> {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  gender: number;
  date_created: number;
  date_modified: number;
  date_last_login: number;

  constructor(json: CustomerJson) {
    super();

    this.id = json.id || 0;
    this.full_name = json.full_name || "";
    this.email = json.email || "";
    this.phone = json.phone || "";
    this.gender = json.gender || 0;
    this.date_created = json.date_created || 0;
    this.date_modified = json.date_modified || 0;
    this.date_last_login = json.date_last_login || 0;
  }

  static getDefaultData(): CustomerJson {
    return {
      id: 0,
      full_name: "",
      email: "",
      phone: "",
      gender: 0,
      date_created: 0,
      date_modified: 0,
      date_last_login: 0,
    };
  }

  toJson(): CustomerJson {
    return {
      id: this.id,
      full_name: this.full_name,
      email: this.email,
      phone: this.phone,
      gender: this.gender,
      date_created: this.date_created,
      date_modified: this.date_modified,
      date_last_login: this.date_last_login,
    };
  }
}

export default CustomerModel;
