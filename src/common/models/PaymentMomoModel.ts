import { BaseModelJson } from "../interfaces/BaseModelJson";
import { PaymentMomoJson } from "../types/PaymentMomo";
import BaseModel from "./BaseModel";

class PaymentMomoModel
  extends BaseModel
  implements BaseModelJson<PaymentMomoJson>
{
  pay_url: string;
  message: string;
  result_code: number;

  constructor(json: PaymentMomoJson) {
    super();

    this.pay_url = json.pay_url || "";
    this.message = json.message || "";
    this.result_code = json.result_code || 0;
  }

  static getDefaultData(): PaymentMomoJson {
    return {
      pay_url: "",
      message: "",
      result_code: 0,
    };
  }

  toJson(): PaymentMomoJson {
    return {
      pay_url: this.pay_url,
      message: this.message,
      result_code: this.result_code,
    };
  }
}

export default PaymentMomoModel;
