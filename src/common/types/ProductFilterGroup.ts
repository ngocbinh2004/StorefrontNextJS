import { BaseCollectionJson } from "./BaseCollection";
import { ProductFilterJson } from "./ProductFilter";

type ProductFilterGroupJson = {
  id: number;
  visibility: number;
  filters: ProductFilterJson[];
};

type ProductFilterGroupCollectionJson =
  BaseCollectionJson<ProductFilterGroupJson>;

type FilterProductFilterGroup = {
  category_id: number;
};

export type {
  FilterProductFilterGroup,
  ProductFilterGroupCollectionJson,
  ProductFilterGroupJson,
};
