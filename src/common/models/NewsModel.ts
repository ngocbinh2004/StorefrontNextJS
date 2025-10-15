import { BaseModelJson } from "../interfaces/BaseModelJson";
import { NewsJson } from "../types/News";
import BaseModel from "./BaseModel";
import FileModel from "./FileModel";

class NewsModel extends BaseModel implements BaseModelJson<NewsJson> {
  id: number;
  category_id: number;
  title: string;
  short_description: string;
  content: string;
  display_order: number;
  avatar_file_id_list: number[];
  avatar_file_list: FileModel[];
  tags: string[];
  seo_url: string;
  seo_title: string;
  seo_meta_description: string;
  seo_meta_keyword: string;
  seo_graph_file_id: number;
  seo_graph_file: FileModel;
  seo_canonical: string;
  seo_options: string[];
  date_created: number;
  date_modified: number;
  date_last_synced_indexer: number;
  category_slug: string;

  constructor(json: NewsJson) {
    super();

    this.id = json.id || 0;
    this.category_id = json.category_id || 0;
    this.title = json.title || "";
    this.short_description = json.short_description || "";
    this.content = json.content || "";
    this.display_order = json.display_order || 0;
    this.avatar_file_id_list = json.avatar_file_id_list || [];
    this.avatar_file_list = json.avatar_file_list.map(
      (i) => new FileModel(i)
    ) || [new FileModel(FileModel.getDefaultData())];
    this.tags = json.tags || [];
    this.category_slug = json.category_slug || "";
    this.seo_url = json.seo_url || "";
    this.seo_title = json.seo_title || "";
    this.seo_meta_description = json.seo_meta_description || "";
    this.seo_meta_keyword = json.seo_meta_keyword || "";
    this.seo_graph_file_id = json.seo_graph_file_id || 0;
    this.seo_graph_file = new FileModel(
      json.seo_graph_file || FileModel.getDefaultData()
    );
    this.seo_canonical = json.seo_canonical || "";
    this.seo_options = json.seo_options || "";
    this.date_created = json.date_created || 0;
    this.date_modified = json.date_modified || 0;
    this.date_last_synced_indexer = json.date_last_synced_indexer || 0;
  }

  static getDefaultData(): NewsJson {
    return {
      id: 0,
      category_id: 0,
      title: "",
      short_description: "",
      content: "",
      display_order: 0,
      avatar_file_id_list: [],
      avatar_file_list: [new FileModel(FileModel.getDefaultData())],
      tags: [],
      seo_url: "",
      seo_title: "",
      seo_meta_description: "",
      seo_meta_keyword: "",
      seo_graph_file_id: 0,
      seo_graph_file: new FileModel(FileModel.getDefaultData()),
      seo_canonical: "",
      seo_options: [""],
      date_created: 0,
      date_modified: 0,
      date_last_synced_indexer: 0,
      category_slug: "",
    };
  }

  toJson(): NewsJson {
    return {
      id: this.id,
      category_id: this.category_id,
      title: this.title,
      short_description: this.short_description,
      content: this.content,
      display_order: this.display_order,
      avatar_file_id_list: this.avatar_file_id_list,
      avatar_file_list: this.avatar_file_list,
      tags: this.tags,
      seo_url: this.seo_url,
      seo_title: this.seo_title,
      seo_meta_description: this.seo_meta_description,
      seo_meta_keyword: this.seo_meta_keyword,
      seo_graph_file_id: this.seo_graph_file_id,
      seo_graph_file: this.seo_graph_file,
      seo_canonical: this.seo_canonical,
      seo_options: this.seo_options,
      date_created: this.date_created,
      date_modified: this.date_modified,
      date_last_synced_indexer: this.date_last_synced_indexer,
      category_slug: this.category_slug,
    };
  }

  static getMarkSlug(
    newsId: number,
    seo_url: string,
    category_slug: string
  ): string {
    let slug = "/news/" + category_slug + "/";
    if (seo_url.length > 0) {
      slug += seo_url;
    } else {
      slug += newsId;
    }

    return slug;
  }
}

export default NewsModel;
