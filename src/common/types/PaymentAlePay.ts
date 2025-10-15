import { BaseCollectionJson } from "./BaseCollection";

type PaymentAlePayRequest = {
  ecom_platform_order_id: string;
};

type PaymentAlePayJson = {
  bankId: number;
  methodCode: string;
  bankFullName: string;
  tradeName: string;
  bankCode: string;
  urlBankLogo: string;
};

type PaymentAlePayCollectionJson = BaseCollectionJson<PaymentAlePayJson>;

type PaymentAlePayResponse = {
  code: string;
  message: string;
  checkoutUrl: string;
};

export type {
  PaymentAlePayResponse,
  PaymentAlePayJson,
  PaymentAlePayCollectionJson,
  PaymentAlePayRequest,
};
