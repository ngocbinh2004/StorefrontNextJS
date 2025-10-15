import { BaseModelJson } from "../interfaces/BaseModelJson";
import { PaymentOnePayJson } from "../types/PaymentOnePay";
import BaseModel from "./BaseModel";

class PaymentOnePayModel
  extends BaseModel
  implements BaseModelJson<PaymentOnePayJson>
{
  url: string;

  constructor(json: PaymentOnePayJson) {
    super();

    this.url = json.url || "";
  }

  static getDefaultData(): PaymentOnePayJson {
    return {
      url: "",
    };
  }

  toJson(): PaymentOnePayJson {
    return {
      url: this.url,
    };
  }
}

export default PaymentOnePayModel;
