import Checkout from "../contants/Checkout";
import Order from "../contants/Order";
import { BaseModelJson } from "../interfaces/BaseModelJson";
import { OrderJson } from "../types/Order";
import { OrderDetailJson } from "../types/OrderDetail";
import { SelectOption } from "../types/SelectOption";
import BaseModel from "./BaseModel";

class OrderModel extends BaseModel implements BaseModelJson<OrderJson> {
  id: number;
  invoice_id: string;
  store_id: number;
  customer_id: number;
  price_sell: number;
  price_shipping: number;
  price_discount: number;
  price_final: number;

  contact_email: string;
  billing_full_name: string;
  billing_gender: number;
  billing_phone: string;
  billing_address: string;
  billing_company: string;
  billing_region_id: number;
  billing_sub_region_id: number;
  billing_sub_sub_region_id: number;
  shipping_full_name: string;
  shipping_gender: number;
  shipping_phone: string;
  shipping_address: string;
  shipping_company: string;
  shipping_region_id: number;
  shipping_sub_region_id: number;
  shipping_sub_sub_region_id: number;
  ecom_platform_order_id: string;

  quantity: number;
  note: string;
  cod_amount: number;
  status: number;
  cancel_reason: number;
  tag: string;
  pickup_store_id: number;
  promotion_code: string;
  payment_method: { method: number; status: number };
  date_created: number;
  date_modified: number;
  hash_key: string;

  order_details: OrderDetailJson[];

  constructor(json: OrderJson) {
    super();

    this.id = json.id || 0;
    this.invoice_id = json.invoice_id || "";
    this.store_id = json.store_id || 0;
    this.customer_id = json.customer_id || 0;
    this.price_sell = json.price_sell || 0;
    this.price_shipping = json.price_shipping || 0;
    this.price_discount = json.price_discount || 0;
    this.price_final = json.price_final || 0;
    this.contact_email = json.contact_email || "";
    this.billing_full_name = json.billing_full_name || "";
    this.billing_gender = json.billing_gender || 0;
    this.billing_phone = json.billing_phone || "";
    this.billing_address = json.billing_address || "";
    this.billing_company = json.billing_company || "";
    this.billing_region_id = json.billing_region_id || 0;
    this.billing_sub_region_id = json.billing_sub_region_id || 0;
    this.billing_sub_sub_region_id = json.billing_sub_sub_region_id || 0;
    this.shipping_full_name = json.shipping_full_name || "";
    this.shipping_gender = json.shipping_gender || 0;
    this.shipping_phone = json.shipping_phone || "";
    this.shipping_address = json.shipping_address || "";
    this.shipping_company = json.shipping_company || "";
    this.shipping_region_id = json.shipping_region_id || 0;
    this.shipping_sub_region_id = json.shipping_sub_region_id || 0;
    this.shipping_sub_sub_region_id = json.shipping_sub_sub_region_id || 0;
    this.quantity = json.quantity || 0;
    this.note = json.note || "";
    this.cod_amount = json.cod_amount || 0;
    this.status = json.status || 0;
    this.cancel_reason = json.cancel_reason || 0;
    this.tag = json.tag || "";
    this.pickup_store_id = json.pickup_store_id || 0;
    this.promotion_code = json.promotion_code || "";
    this.payment_method = json.payment_method || 0;
    this.status = json.status || 0;
    this.date_created = json.date_created || 0;
    this.date_modified = json.date_modified || 0;
    this.ecom_platform_order_id = json.ecom_platform_order_id || "";
    this.hash_key = json.id + "-" + json.date_created || "";
    this.order_details = json.order_details || [];
  }

  static getDefaultData(): OrderJson {
    return {
      id: 0,
      invoice_id: "",
      store_id: 0,
      customer_id: 0,
      price_sell: 0,
      price_shipping: 0,
      price_discount: 0,
      price_final: 0,
      contact_email: "",
      billing_full_name: "",
      billing_gender: 0,
      billing_phone: "",
      billing_address: "",
      billing_company: "",
      billing_region_id: 0,
      billing_sub_region_id: 0,
      billing_sub_sub_region_id: 0,
      shipping_full_name: "",
      shipping_gender: 0,
      shipping_phone: "",
      shipping_address: "",
      shipping_company: "",
      shipping_region_id: 0,
      shipping_sub_region_id: 0,
      shipping_sub_sub_region_id: 0,
      quantity: 0,
      note: "",
      cod_amount: 0,
      status: 0,
      cancel_reason: 0,
      tag: "",
      pickup_store_id: 0,
      promotion_code: "",
      payment_method: { method: 0, status: 0 },
      date_created: 0,
      date_modified: 0,
      ecom_platform_order_id: "",
      hash_key: "",
      order_details: [],
    };
  }

  toJson(): OrderJson {
    return {
      id: this.id,
      invoice_id: this.invoice_id,
      store_id: this.store_id,
      customer_id: this.customer_id,
      price_sell: this.price_sell,
      price_shipping: this.price_shipping,
      price_discount: this.price_discount,
      price_final: this.price_final,
      contact_email: this.contact_email,
      billing_full_name: this.billing_full_name,
      billing_gender: this.billing_gender,
      billing_phone: this.billing_phone,
      billing_address: this.billing_address,
      billing_company: this.billing_company,
      billing_region_id: this.billing_region_id,
      billing_sub_region_id: this.billing_sub_region_id,
      billing_sub_sub_region_id: this.billing_sub_sub_region_id,
      shipping_full_name: this.shipping_full_name,
      shipping_gender: this.shipping_gender,
      shipping_phone: this.shipping_phone,
      shipping_address: this.shipping_address,
      shipping_company: this.shipping_company,
      shipping_region_id: this.shipping_region_id,
      shipping_sub_region_id: this.shipping_sub_region_id,
      shipping_sub_sub_region_id: this.shipping_sub_sub_region_id,
      quantity: this.quantity,
      note: this.note,
      cod_amount: this.cod_amount,
      status: this.status,
      cancel_reason: this.cancel_reason,
      tag: this.tag,
      pickup_store_id: this.pickup_store_id,
      promotion_code: this.promotion_code,
      payment_method: this.payment_method,
      date_created: this.date_created,
      date_modified: this.date_modified,
      ecom_platform_order_id: this.ecom_platform_order_id,
      hash_key: this.hash_key,
      order_details: this.order_details,
    };
  }

  static getStatusList(): SelectOption[] {
    return [
      {
        value: Order.STATUS_OPEN,
        label: "Đơn hàng mới",
        color: "gray",
      },
      {
        value: Order.STATUS_PROCESSING,
        label: "Đã xác nhận",
        color: "orange",
      },
      {
        value: Order.STATUS_SHIPPING,
        label: "Đang giao hàng",
        color: "blue",
      },
      {
        value: Order.STATUS_SHIPPED,
        label: "Đã giao hàng",
        color: "purple",
      },
      {
        value: Order.STATUS_RETURNING,
        label: "Đang trả hàng",
        color: "orange",
      },
      {
        value: Order.STATUS_COMPLETE,
        label: "Hoàn thành",
        color: "green",
      },
      {
        value: Order.STATUS_CANCEL,
        label: "Huỷ bỏ",
        color: "red",
      },
    ];
  }

  static getStatus(value: number): SelectOption | undefined {
    return this.getStatusList().find((item) => item.value === value);
  }

  static getPaymentMethodList(): SelectOption[] {
    return [
      {
        value: Checkout.PAYMENT_METHOD_MONEY_TRANSFER,
        label: "Thanh toán chuyển khoản",
      },
      {
        value: Checkout.PAYMENT_METHOD_COD,
        label: "Thanh toán khi nhận hàng (COD)",
      },
      {
        value: Checkout.PAYMENT_METHOD_VNPAY,
        label: "Thanh toán qua VNPAY",
      },
      {
        value: Checkout.PAYMENT_METHOD_MOMO,
        label: "Thanh toán bằng ví MOMO",
      },
    ];
  }

  static getPaymentMethod(value: number): SelectOption | undefined {
    return this.getPaymentMethodList().find((item) => item.value === value);
  }
}

export default OrderModel;
