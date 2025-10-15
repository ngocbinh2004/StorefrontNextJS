import { BaseModelJson } from "../interfaces/BaseModelJson";

import {
  InstallmentAlePayJson,
  PaymentMethod,
} from "../types/InstallmentAlePay";
import BaseModel from "./BaseModel";

class InstallmentAlePayModel
  extends BaseModel
  implements BaseModelJson<InstallmentAlePayJson>
{
  bankCode: string;
  bankName: string;
  paymentMethods: PaymentMethod[];

  constructor(json: InstallmentAlePayJson) {
    super();

    this.bankCode = json.bankCode || "";
    this.bankName = json.bankName || "";
    this.paymentMethods = json.paymentMethods || [];
  }

  static getDefaultData(): InstallmentAlePayJson {
    return {
      bankCode: "",
      bankName: "",
      paymentMethods: [],
    };
  }

  toJson(): InstallmentAlePayJson {
    return {
      bankCode: this.bankCode,
      bankName: this.bankName,
      paymentMethods: this.paymentMethods,
    };
  }
}

export default InstallmentAlePayModel;
