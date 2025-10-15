import { BaseCollectionJson } from "./BaseCollection";
import { FileJson } from "./File";
import { Filter } from "./Filter";

type PageSearchParams = {
  searchParams: { [key: string]: string | string[] | undefined };
};

type PaginationParams = {
  currentpage: number;
  total: number;
  limit: number;
};

type PageJson = {
  id: number;
  title: string;
  content: string;
  status: number;
  avatar_file_id_list: number[];
  seo_url: string;
  seo_title: string;
  seo_meta_description: string;
  seo_meta_keyword: string;
  seo_graph_file_id: number;
  seo_canonical: string;
  seo_options: string;
  avatar_file_list: FileJson[];
  seo_graph_file: FileJson;
  is_mandatory: number;
};

type PageCollectionJson = BaseCollectionJson<PageJson>;

type FilterPage = Filter & {};

export type {
  PageSearchParams,
  PaginationParams,
  PageJson,
  PageCollectionJson,
  FilterPage,
};
