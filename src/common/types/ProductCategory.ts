import { AttributeJson } from "./Attribute";
import { AttributeGroupJson } from "./AttributeGroup";
import { BaseCollectionJson } from "./BaseCollection";
import { FileJson } from "./File";
import { Filter } from "./Filter";

type ProductCategoryJson = {
  id: number;
  uuid: string;
  name: string;
  name_short: string;
  description: string;
  display_order: number;
  parent_id: number;
  external_id: string;
  prepayment_percentage: number;
  attribute_category_id: number;
  avatar_file_id_list: number[];
  view_template: number;
  gift_accessory_id: number;
  bundle_id: number;
  status: number;
  seo_url: string;
  seo_title: string;
  seo_meta_description: string;
  seo_meta_keyword: string;
  seo_graph_file_id: number;
  seo_canonical: string;
  seo_options: string;
  avatar_file_list: FileJson[];
  seo_graph_file: FileJson;
  date_created: number;
  date_modified: number;
  date_lastsynced: number;
  attribute_group?: AttributeGroupJson[];
  attribute?: AttributeJson[];
};

type ProductCategoryJsonWithChildren = ProductCategoryJson & {
  children?: any[];
};

type ProductCategoryJsonArrayToTree = {
  id: number;
  parent_id: number;
  name: string;
  name_short: string;
  seo_url: string;
};

type ProductCategoryCollectionJson = BaseCollectionJson<ProductCategoryJson>;

type FilterProductCategory = Filter & {
  parent_id: number;
};

export type {
  ProductCategoryJsonWithChildren,
  ProductCategoryJson,
  ProductCategoryCollectionJson,
  FilterProductCategory,
  ProductCategoryJsonArrayToTree,
};
