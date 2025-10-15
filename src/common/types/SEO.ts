import { FileJson } from "./File";

type SEO = {
  seo_url: string;
  seo_title: string;
  seo_meta_description: string;
  seo_meta_keyword: string;
  seo_graph_file_id: number;
  seo_graph_file: FileJson;
  seo_canonical: string;
  seo_options: string;
}

export type { SEO }