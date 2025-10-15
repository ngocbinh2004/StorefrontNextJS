import { BaseModelJson } from "../interfaces/BaseModelJson";
import {
  CustomerPassportJson,
  CustomerPassportMetadata,
} from "../types/CustomerPassport";
import BaseModel from "./BaseModel";

class CustomerPassportModel
  extends BaseModel
  implements BaseModelJson<CustomerPassportJson>
{
  id: string;
  full_name: string;
  phone: string;
  passport_id: string;
  otp_length: number;
  date_created: number;
  date_expired: number;
  metadata: CustomerPassportMetadata;

  constructor(json: CustomerPassportJson) {
    super();

    this.id = json.id || "";
    this.full_name = json.full_name || "";
    this.phone = json.phone || "";
    this.passport_id = json.passport_id || "";
    this.otp_length = json.otp_length || 0;
    this.date_created = json.date_created || 0;
    this.date_expired = json.date_expired || 0;
    this.metadata = json.metadata || {};
  }

  static getDefaultData(): CustomerPassportJson {
    return {
      id: "",
      full_name: "",
      phone: "",
      passport_id: "",
      otp_length: 0,
      date_created: 0,
      date_expired: 0,
      metadata: {},
    };
  }

  toJson(): CustomerPassportJson {
    return {
      id: this.id,
      full_name: this.full_name,
      phone: this.phone,
      passport_id: this.passport_id,
      otp_length: this.otp_length,
      date_created: this.date_created,
      date_expired: this.date_expired,
      metadata: this.metadata,
    };
  }
}

export default CustomerPassportModel;
