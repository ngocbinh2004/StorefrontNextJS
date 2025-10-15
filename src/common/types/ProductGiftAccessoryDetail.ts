import { BaseCollectionJson } from "./BaseCollection";
import { Filter } from "./Filter";

type ProductGiftAccessoryDetailJson = {
  company_id: number;
  product_id: number;
  gift_accessory_id: number;
  product_variant_id: number;
  id: number;
  external_id: number;
  quantity: number;
  note: string;
  variant_exchange_mode: number;
  variant_exchange_id_list: number[];
};

type ProductGiftAccessoryDetailCollectionJson =
  BaseCollectionJson<ProductGiftAccessoryDetailJson>;

type FilterProductGiftAccessoryDetail = Filter & {
  product_id: number;
};

type VariantGiftJson = {
  id: number;
  variant_id: number;
};
export type {
  VariantGiftJson,
  FilterProductGiftAccessoryDetail,
  ProductGiftAccessoryDetailCollectionJson,
  ProductGiftAccessoryDetailJson,
};
