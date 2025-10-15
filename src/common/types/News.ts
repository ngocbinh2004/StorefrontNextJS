import { BaseCollectionJson } from "./BaseCollection";
import { FileJson } from "./File";
import { Filter } from "./Filter";

type NewsJson = {
  id: number;
  category_id: number;
  title: string;
  short_description: string;
  content: string;
  display_order: number;
  avatar_file_id_list: number[];
  tags: string[];
  seo_url: string;
  seo_title: string;
  seo_meta_description: string;
  seo_meta_keyword: string;
  seo_graph_file_id: number;
  seo_canonical: string;
  avatar_file_list: FileJson[];
  seo_options: string[];
  seo_graph_file: FileJson;
  date_created: number;
  date_modified: number;
  category_slug: string;
  date_last_synced_indexer: number;
};

type NewsCollectionJson = BaseCollectionJson<NewsJson>;

type FilterNews = Filter & {
  category_id: number;
};

export type { NewsJson, NewsCollectionJson, FilterNews };
