import { BaseCollectionJson } from "./BaseCollection";
import { Filter } from "./Filter";

type AttributeCategoryJson = {
  count_attributegroup: number;
  id: number;
  name: string;
  code: string;
  external_id: string;
  description: string;
  status: number;
  count_attribute: number;
};

type AttributeCategoryCollectionJson =
  BaseCollectionJson<AttributeCategoryJson>;

type FilterAttributeCategory = Filter & {
  id: number;
  id_list: string;
};

export type {
  AttributeCategoryJson,
  AttributeCategoryCollectionJson,
  FilterAttributeCategory,
};
