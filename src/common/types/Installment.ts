import { BaseCollectionJson } from "./BaseCollection";
import { CheckoutRequest } from "./Checkout";
import { Filter } from "./Filter";

type InstallmentRequest = CheckoutRequest & {
  contact_identification: string;
  contact_birthday: string;
  contact_email: string;
  relationship_phone: string;
  ip_address: string;
  details: {
    product_variant_id: number;
    quantity: number;
  }[];
  order_installment: number;
  tenor: number;
  merchant_id: number;
  prepaid_percentage: number;
};

type PeriodJson = {
  id: number;
  label: string;
};

type PrepaymentJson = {
  value: number;
  label: string;
};

type InstallmentDataJson = {
  label: string;
  options: {
    label: string;
  }[];
};

type MerchantBankJson = {
  merchant_id: number;
  color: string;
  name: string;
  note: string;
  logo: string;
};

type CardJson = {
  value: string;
  label: string;
  logo: string;
};

type InstallmentJson = {
  merchant_id: number;
  price: number;
  tenor: number;
  pre_paid_percent: number;
  pre_paid_amount: number;
  warranty_fee_per_month: number;
  interest_rate: number;
  payment_per_month: number;
  charge_month: number;
  total_interest: number;
  total_price_after_installment: number;
};

type InstallmentCollectionJson = BaseCollectionJson<InstallmentJson>;

type FilterInstallment = {
  product_variant_id: number;
  prepaid_percentage: number;
  tenor?: number;
};

export type {
  CardJson,
  FilterInstallment,
  InstallmentCollectionJson,
  InstallmentDataJson,
  InstallmentJson,
  InstallmentRequest,
  MerchantBankJson,
  PeriodJson,
  PrepaymentJson,
};
