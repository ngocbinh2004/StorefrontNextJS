import { BaseCollectionJson } from "./BaseCollection";
import { CheckoutForm } from "./Checkout";
import { Filter } from "./Filter";
import { OrderDetailJson } from "./OrderDetail";
import { WebUserCartItem } from "./WebUserCart";

type OrderJson = {
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
  ecom_platform_order_id: string;
  hash_key: string;
  order_details: OrderDetailJson[];
};

type OrderCollectionJson = BaseCollectionJson<OrderJson>;

type FilterOrder = Filter & {};

type OrderCheckRequest = {
  id: number;
  phone: string;
};

type OrderAddRequest = CheckoutForm & {
  details: WebUserCartItem[];
  cart_uuid: string;
  ip_address: string;
};

type OrderTrackingRequest = {
  invoice_id: string;
  phone: string;
};

type OrderHistoryRequest = {
  phone: string;
  id: number;
};

export type {
  OrderJson,
  OrderCollectionJson,
  FilterOrder,
  OrderCheckRequest,
  OrderAddRequest,
  OrderTrackingRequest,
  OrderHistoryRequest,
};
