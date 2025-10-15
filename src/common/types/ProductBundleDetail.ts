import { BaseCollectionJson } from "./BaseCollection";
import { Filter } from "./Filter";

type ProductBundleDetailJson = {
  company_id: number;
  bundle_id: number;
  product_id: number;
  product_variant_id: number;
  id: number;
  external_id: number;
  note: string;
  discount_type: number;
  discount_value: number;
  variant_exchange_mode: number;
  variant_exchange_id_list: number[];
};

type BundlePriceJson = {
  product_variant_id: number;
  price_original: number;
  price_final: number;
};

type ProductBundleDetailCollectionJson =
  BaseCollectionJson<ProductBundleDetailJson>;

type FilterProductBundleDetail = Filter & {
  product_id: number;
};

export type {
  BundlePriceJson,
  FilterProductBundleDetail,
  ProductBundleDetailCollectionJson,
  ProductBundleDetailJson,
};
