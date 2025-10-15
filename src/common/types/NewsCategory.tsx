import { BaseCollectionJson } from "./BaseCollection";
import { FileJson } from "./File";
import { Filter } from "./Filter";

type NewsCategoryJson = {
  id: number;
  name: string;
  description: string;
  display_order: number;
  parent_id: number;
  external_id: string;
  avatar_file_id_list: number[];
  status: number;
  seo_url: string;
  seo_title: string;
  seo_meta_description: string;
  seo_meta_keyword: string;
  seo_graph_file_id: number;
  seo_canonical: string;
  avatar_file_list: FileJson[];
  seo_graph_file: FileJson;
  date_created: number;
  date_modified: number;
};

type NewsCategoryJsonWithChildren = NewsCategoryJson & {
  children?: any[];
};

type NewsCategoryCollectionJson = BaseCollectionJson<NewsCategoryJson>;

type FilterNewsCategory = Filter & { ids: string };

export type {
  FilterNewsCategory,
  NewsCategoryCollectionJson,
  NewsCategoryJson,
  NewsCategoryJsonWithChildren,
};
