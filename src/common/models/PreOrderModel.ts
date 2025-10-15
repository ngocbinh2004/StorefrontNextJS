import PreOrder from "../contants/PreOrder";
import { BaseModelJson } from "../interfaces/BaseModelJson";
import { PreOrderJson } from "../types/PreOrder";
import { SelectOption } from "../types/SelectOption";
import BaseModel from "./BaseModel";

class PreOrderModel extends BaseModel implements BaseModelJson<PreOrderJson> {
  id: number;
  product_id: number;
  product_variant_id: number;
  quantity: number;
  price_final: number;
  price_deposit: number;
  deposit_method: string;
  external_id: string;
  sale_order_id: number;
  full_name: string;
  phone: string;
  email: string;
  note: string;
  date_created: number;

  constructor(json: PreOrderJson) {
    super();

    this.id = json.id || 0;
    this.product_id = json.product_id || 0;
    this.product_variant_id = json.product_variant_id || 0;
    this.quantity = json.quantity || 0;
    this.price_final = json.price_final || 0;
    this.price_deposit = json.price_deposit || 0;
    this.deposit_method = json.deposit_method || "";
    this.external_id = json.external_id || "";
    this.sale_order_id = json.sale_order_id || 0;
    this.full_name = json.full_name || "";
    this.phone = json.phone || "";
    this.email = json.phone || "";
    this.note = json.note || "";
    this.date_created = json.date_created || 0;
  }

  static getDefaultData(): PreOrderJson {
    return {
      id: 0,
      product_id: 0,
      product_variant_id: 0,
      quantity: 0,
      price_final: 0,
      price_deposit: 0,
      deposit_method: "",
      external_id: "",
      sale_order_id: 0,
      full_name: "",
      phone: "",
      email: "",
      note: "",
      date_created: 0,
    };
  }

  toJson(): PreOrderJson {
    return {
      id: this.id,
      product_id: this.product_id,
      product_variant_id: this.product_variant_id,
      quantity: this.quantity,
      price_final: this.price_final,
      price_deposit: this.price_deposit,
      deposit_method: this.deposit_method,
      external_id: this.external_id,
      sale_order_id: this.sale_order_id,
      full_name: this.full_name,
      phone: this.phone,
      email: this.email,
      note: this.note,
      date_created: this.date_created,
    };
  }

  static getDepositMethodList(): SelectOption[] {
    return [
      {
        value: PreOrder.DEPOSIT_METHOD_ONLINE,
        label: "Đặt cọc online",
      },
      {
        value: PreOrder.DEPOSIT_METHOD_AT_STORE,
        label: "Đặt cọc tại cửa hàng",
      },
    ];
  }

  static getDepositMethod(value: number): SelectOption | undefined {
    return this.getDepositMethodList().find((item) => item.value === value);
  }
}

export default PreOrderModel;
