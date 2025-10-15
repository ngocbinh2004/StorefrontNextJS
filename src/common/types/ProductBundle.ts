import { BaseCollectionJson } from "./BaseCollection";
import { ProductBundleDetailJson } from "./ProductBundleDetail";

type ProductBundleJson = {
  company_id: number;
  id: number;
  name: string;
  code: string;
  description: string;
  external_id: string;
  discount_type: number;
  discount_value: number;
  details?: ProductBundleDetailJson[];
};

type ProductBundleCollectionJson = BaseCollectionJson<ProductBundleJson>;

type FilterProductBundle = {
  product_id: number;
};

export type {
  FilterProductBundle,
  ProductBundleCollectionJson,
  ProductBundleJson,
};
