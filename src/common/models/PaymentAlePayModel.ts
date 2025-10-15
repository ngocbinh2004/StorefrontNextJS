import { BaseModelJson } from "../interfaces/BaseModelJson";
import { PaymentAlePayJson } from "../types/PaymentAlePay";
import BaseModel from "./BaseModel";

class PaymentAlePayModel
  extends BaseModel
  implements BaseModelJson<PaymentAlePayJson>
{
  bankId: number;
  methodCode: string;
  bankFullName: string;
  tradeName: string;
  bankCode: string;
  urlBankLogo: string;

  constructor(json: PaymentAlePayJson) {
    super();

    this.bankId = json.bankId || 0;
    this.methodCode = json.methodCode || "";
    this.bankFullName = json.bankFullName || "";
    this.tradeName = json.tradeName || "";
    this.bankCode = json.bankCode || "";
    this.urlBankLogo = json.urlBankLogo || "";
  }

  static getDefaultData(): PaymentAlePayJson {
    return {
      bankId: 0,
      methodCode: "",
      bankFullName: "",
      tradeName: "",
      bankCode: "",
      urlBankLogo: "",
    };
  }

  toJson(): PaymentAlePayJson {
    return {
      bankId: this.bankId,
      methodCode: this.methodCode,
      bankFullName: this.bankFullName,
      tradeName: this.tradeName,
      bankCode: this.bankCode,
      urlBankLogo: this.urlBankLogo,
    };
  }
}

export default PaymentAlePayModel;
