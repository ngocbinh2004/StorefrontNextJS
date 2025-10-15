import { BaseModelJson } from "../interfaces/BaseModelJson";
import {
  OrderHistoryJson,
  OrderHistoryItemJson,
  OrderHistoryPaymentJson,
} from "../types/OrderHistory";
import BaseModel from "./BaseModel";

class OrderHistoryModel
  extends BaseModel
  implements BaseModelJson<OrderHistoryJson>
{
  id: number;
  store_id: number;
  status: number;
  status_name: string;
  cancel_reason: string;
  customer_id: number;
  customer_mobile: string;
  customer_name: string;
  customer_last_name: string;
  customer_address: string;
  customer_city: string;
  customer_district: string;
  customer_ward: string;
  customer_ship_fee: number;
  customer_note: string;
  payment_date: string;
  sale_note: string;
  warranty_note: string;
  discount_amount: number;
  coupon_code: string;
  total_amount: number;
  date_created: string;
  order_items: OrderHistoryItemJson[];
  payments: OrderHistoryPaymentJson[];

  constructor(json: OrderHistoryJson) {
    super();

    this.id = json.id || 0;
    this.store_id = json.store_id || 0;
    this.customer_id = json.customer_id || 0;
    this.customer_mobile = json.customer_mobile || "";
    this.customer_name = json.customer_name || "";
    this.customer_last_name = json.customer_last_name || "";
    this.customer_address = json.customer_address || "";
    this.customer_city = json.customer_city || "";
    this.customer_district = json.customer_district || "";
    this.customer_ward = json.customer_ward || "";
    this.customer_ship_fee = json.customer_ship_fee || 0;
    this.customer_note = json.customer_note || "";
    this.payment_date = json.payment_date || "";
    this.sale_note = json.sale_note || "";
    this.warranty_note = json.warranty_note || "";
    this.discount_amount = json.discount_amount || 0;
    this.coupon_code = json.coupon_code || "";
    this.total_amount = json.total_amount || 0;
    this.status = json.status || 0;
    this.status_name = json.status_name || "";
    this.cancel_reason = json.cancel_reason || "";
    this.date_created = json.date_created || "";
    this.order_items = json.order_items || [];
    this.payments = json.payments || [];
  }

  static getDefaultData(): OrderHistoryJson {
    return {
      id: 0,
      store_id: 0,
      customer_id: 0,
      customer_address: "",
      customer_city: "",
      customer_district: "",
      customer_last_name: "",
      customer_mobile: "",
      customer_name: "",
      customer_ward: "",
      customer_ship_fee: 0,
      customer_note: "",
      payment_date: "",
      sale_note: "",
      warranty_note: "",
      discount_amount: 0,
      coupon_code: "",
      total_amount: 0,
      status: 0,
      status_name: "",
      cancel_reason: "",
      date_created: "",
      order_items: [],
      payments: [],
    };
  }

  toJson(): OrderHistoryJson {
    return {
      id: this.id,
      store_id: this.store_id,
      customer_id: this.customer_id,
      customer_address: this.customer_address,
      customer_city: this.customer_city,
      customer_district: this.customer_district,
      customer_last_name: this.customer_last_name,
      customer_mobile: this.customer_mobile,
      customer_name: this.customer_name,
      customer_ward: this.customer_ward,
      customer_ship_fee: this.customer_ship_fee,
      customer_note: this.customer_note,
      payment_date: this.payment_date,
      sale_note: this.sale_note,
      warranty_note: this.warranty_note,
      discount_amount: this.discount_amount,
      coupon_code: this.coupon_code,
      total_amount: this.total_amount,
      status: this.status,
      status_name: this.status_name,
      cancel_reason: this.cancel_reason,
      date_created: this.date_created,
      order_items: this.order_items,
      payments: this.payments,
    };
  }
}

export default OrderHistoryModel;
