import { BaseCollectionJson } from "./BaseCollection";
import { Filter } from "./Filter";
import { ProductGiftAccessoryDetailJson } from "./ProductGiftAccessoryDetail";

type ProductGiftAccessoryJson = {
  company_id: number;
  id: number;
  name: string;
  code: string;
  description: string;
  external_id: string;
  details?: ProductGiftAccessoryDetailJson[];
};

type ProductGiftAccessoryCollectionJson =
  BaseCollectionJson<ProductGiftAccessoryJson>;

type FilterProductGiftAccessory = {
  product_id: number;
};

export type {
  FilterProductGiftAccessory,
  ProductGiftAccessoryCollectionJson,
  ProductGiftAccessoryJson,
};
