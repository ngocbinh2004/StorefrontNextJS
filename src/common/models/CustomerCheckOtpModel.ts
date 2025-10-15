import { BaseModelJson } from "../interfaces/BaseModelJson";
import { CustomerCheckOtpResultJson } from "../types/CustomerCheckOtpResult";
import BaseModel from "./BaseModel";

class CustomerCheckOtpResultModel
  extends BaseModel
  implements BaseModelJson<CustomerCheckOtpResultJson>
{
  action: string;
  passport_id: string;
  phone: string;
  otp: string;
  date_checked: number;
  status: string;
  message: string;

  constructor(json: CustomerCheckOtpResultJson) {
    super();

    this.action = json.action || "";
    this.passport_id = json.passport_id || "";
    this.phone = json.phone || "";
    this.otp = json.otp || "";
    this.date_checked = json.date_checked || 0;
    this.status = json.status || "";
    this.message = json.message || "";
  }

  static getDefaultData(): CustomerCheckOtpResultJson {
    return {
      action: "",
      passport_id: "",
      phone: "",
      otp: "",
      date_checked: 0,
      status: "",
      message: "",
    };
  }

  toJson(): CustomerCheckOtpResultJson {
    return {
      action: this.action,
      passport_id: this.passport_id,
      phone: this.phone,
      otp: this.otp,
      date_checked: this.date_checked,
      status: this.status,
      message: this.message,
    };
  }
}

export default CustomerCheckOtpResultModel;
