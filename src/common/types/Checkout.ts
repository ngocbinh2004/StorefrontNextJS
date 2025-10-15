import { CartPrice } from "./WebUserCart";

type CheckoutForm = {
  contact_email: string;

  delivery_type: string;
  billing_full_name: string;
  billing_gender: number;
  billing_phone: string;
  billing_region_id: number;
  billing_sub_region_id: number;
  billing_sub_sub_region_id: number;
  billing_address: string;

  shipping_is_same_billing: number;
  shipping_full_name: string;
  shipping_gender: number;
  shipping_phone: string;
  shipping_region_id: number;
  shipping_sub_region_id: number;
  shipping_sub_sub_region_id: number;
  shipping_address: string;

  note: string;
  promotion_code: string;
  store_id: number;
  pickup_store_id: number;
  payment_method: number;
};

type CheckoutRequest = CheckoutForm & CartPrice;

export type { CheckoutForm, CheckoutRequest };
