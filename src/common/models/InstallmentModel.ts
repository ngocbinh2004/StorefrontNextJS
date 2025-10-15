import BaseModel from "./BaseModel";

import Installment from "../contants/Installment";
import { BaseModelJson } from "../interfaces/BaseModelJson";
import {
  CardJson,
  InstallmentJson,
  MerchantBankJson,
  PeriodJson,
} from "../types/Installment";

class InstallmentModel
  extends BaseModel
  implements BaseModelJson<InstallmentJson>
{
  merchant_id: number;
  price: number;
  tenor: number;
  pre_paid_percent: number;
  pre_paid_amount: number;
  warranty_fee_per_month: number;
  interest_rate: number;
  payment_per_month: number;
  charge_month: number;
  total_interest: number;
  total_price_after_installment: number;

  constructor(json: InstallmentJson) {
    super();
    this.merchant_id = json.merchant_id || 0;
    this.price = json.price || 0;
    this.tenor = json.tenor || 0;
    this.pre_paid_percent = json.pre_paid_percent || 0;
    this.pre_paid_amount = json.pre_paid_amount || 0;
    this.warranty_fee_per_month = json.warranty_fee_per_month || 0;
    this.interest_rate = json.interest_rate || 0;
    this.payment_per_month = json.payment_per_month || 0;
    this.charge_month = json.charge_month || 0;
    this.total_interest = json.total_interest || 0;
    this.total_price_after_installment =
      json.total_price_after_installment || 0;
  }

  static getDefaultData(): InstallmentJson {
    return {
      merchant_id: 0,
      price: 0,
      tenor: 0,
      pre_paid_percent: 0,
      pre_paid_amount: 0,
      warranty_fee_per_month: 0,
      interest_rate: 0,
      payment_per_month: 0,
      charge_month: 0,
      total_interest: 0,
      total_price_after_installment: 0,
    };
  }

  toJson(): InstallmentJson {
    return {
      merchant_id: this.merchant_id,
      price: this.price,
      tenor: this.tenor,
      pre_paid_percent: this.pre_paid_percent,
      pre_paid_amount: this.pre_paid_amount,
      warranty_fee_per_month: this.warranty_fee_per_month,
      interest_rate: this.interest_rate,
      payment_per_month: this.payment_per_month,
      charge_month: this.charge_month,
      total_interest: this.total_interest,
      total_price_after_installment: this.total_price_after_installment,
    };
  }

  static getPeriod(): PeriodJson[] {
    const items = [
      { id: 6, label: "6 tháng" },
      { id: 9, label: "9 tháng" },
      { id: 12, label: "12 tháng" },
    ];

    return items;
  }

  static getMerchantBankList(): MerchantBankJson[] {
    const data = [
      {
        merchant_id: Installment.MERCHANT_HOME_CREDIT,
        color: "#C80F2E",
        name: "Home Credit",
        note: "Lãi suất 0%",
        logo: "/images/installment_homecredit.png",
      },
      {
        merchant_id: Installment.MERCHANT_HD_SAISON,
        color: "#F08124",
        name: "HD SAISON",
        note: "Lãi suất ưu đãi",
        logo: "/images/installment_hdsaigon.png",
      },
      {
        merchant_id: Installment.MERCHANT_SHINHAN,
        color: "#0A4DFE",
        name: "Shinhan",
        note: "Lãi suất ưu đãi",
        logo: "/images/installment_shinhan.jpeg",
      },
    ];

    return data;
  }

  static getMerchantBank(merchant_id: number): MerchantBankJson | undefined {
    return this.getMerchantBankList().find(
      (item) => item.merchant_id === merchant_id
    );
  }

  static getTypeCardList(): CardJson[] {
    const data = [
      {
        value: Installment.CARD_VISA,
        label: "VISA",
        logo: "/images/static/visa.svg",
      },
      {
        value: Installment.CARD_MASTERCARD,
        label: "MasterCard",
        logo: "/images/static/mastercard.svg",
      },
      {
        value: Installment.CARD_JCB,
        label: "JCB",
        logo: "/images/static/jcb.svg",
      },
    ];

    return data;
  }
}

export default InstallmentModel;
