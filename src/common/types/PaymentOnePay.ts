import { BaseCollectionJson } from "./BaseCollection";

type PaymentOnePayRequest = {
  ecom_platform_order_id: string;
};

type PaymentOnePayJson = {
  url: string;
};

type PaymentOnePayCollectionJson = BaseCollectionJson<PaymentOnePayJson>;

export type {
  PaymentOnePayCollectionJson,
  PaymentOnePayJson,
  PaymentOnePayRequest,
};
