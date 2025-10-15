import { BaseCollectionJson } from "./BaseCollection";

type PeriodAlePayJson = {
  month: number;
  amountFee: number;
  amountFinal: number;
  amountByMonth: number;
  currency: string;
};

type PaymentMethod = {
  paymentMethod: string;
  periods: PeriodAlePayJson[];
};

type InstallmentAlePayJson = {
  bankCode: string;
  bankName: string;
  paymentMethods: PaymentMethod[];
};

type InstallmentAlePayCollectionJson =
  BaseCollectionJson<InstallmentAlePayJson>;

export type {
  InstallmentAlePayJson,
  InstallmentAlePayCollectionJson,
  PeriodAlePayJson,
  PaymentMethod,
};
