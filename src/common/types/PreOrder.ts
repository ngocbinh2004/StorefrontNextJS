import { BaseCollectionJson } from "./BaseCollection";
import { Filter } from "./Filter";

type PreOrderRequest = {
  full_name: string;
  phone: string;
  email: string;
  note: string;
  deposit_method: string;
};

type PreOrderJsonAdd = PreOrderRequest & {
  product_id: number;
  product_variant_id: number;
  quantity: number;
  price_final: number;
  price_deposit: number;
  external_id: string;
  sale_order_id: number;
};

type PreOrderJson = PreOrderJsonAdd & {
  id: number;
  date_created: number;
};

type PreOrderCollectionJson = BaseCollectionJson<PreOrderJson>;

type FilterPreOrder = Filter & {
  product_variant_id: number;
};

export type {
  PreOrderRequest,
  PreOrderJsonAdd,
  PreOrderJson,
  PreOrderCollectionJson,
  FilterPreOrder,
};
