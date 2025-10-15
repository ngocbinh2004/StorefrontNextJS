import { BaseCollectionJson } from "./BaseCollection";
import { FileJson } from "./File";

type OrderHistoryItemJson = {
  external_id: string;
  product_name: string;
  product_code: string;
  quantity: number;
  discount_amount: number;
  product_price: number;
  product_id: number;
  avatar_file_id_list: number[];
  avatar_file_list: FileJson[];
};

type OrderHistoryPaymentJson = {
  id: number;
  payment_name: string;
  payment_ref_code: string;
  payment_code: string;
  payment_amount: string;
};

type OrderHistoryJson = {
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
};

type OrderHistoryCollectionJson = BaseCollectionJson<OrderHistoryJson>;

export type {
  OrderHistoryItemJson,
  OrderHistoryCollectionJson,
  OrderHistoryJson,
  OrderHistoryPaymentJson,
};
