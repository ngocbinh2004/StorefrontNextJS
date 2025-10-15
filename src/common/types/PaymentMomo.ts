import { BaseCollectionJson } from "./BaseCollection";

type PaymentMomoRequest = {
  order_id: number;
};

type PaymentMomoJson = {
  pay_url: string;
  message: string;
  result_code: number;
};

type PaymentMomoCollectionJson = BaseCollectionJson<PaymentMomoJson>;

export type { PaymentMomoCollectionJson, PaymentMomoJson, PaymentMomoRequest };
