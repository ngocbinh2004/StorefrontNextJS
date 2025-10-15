import BaseModel from "./BaseModel";
import FileModel from "./FileModel";
import { BaseModelJson } from "../interfaces/BaseModelJson";
import { NewsCategoryJson } from "../types/NewsCategory";
class NewsCategoryModel
  extends BaseModel
  implements BaseModelJson<NewsCategoryJson>
{
  id: number;
  name: string;
  description: string;
  display_order: number;
  parent_id: number;
  external_id: string;
  avatar_file_id_list: number[];
  avatar_file_list: FileModel[];
  status: number;
  seo_url: string;
  seo_title: string;
  seo_meta_description: string;
  seo_meta_keyword: string;
  seo_graph_file_id: number;
  seo_graph_file: FileModel;
  seo_canonical: string;
  date_created: number;
  date_modified: number;

  constructor(json: NewsCategoryJson) {
    super();

    this.id = json.id || 0;
    this.name = json.name || "";
    this.description = json.description || "";
    this.display_order = json.display_order || 0;
    this.parent_id = json.parent_id || 0;
    this.external_id = json.external_id || "";
    this.avatar_file_id_list = json.avatar_file_id_list || [];
    this.avatar_file_list =
      typeof json.avatar_file_list !== "undefined"
        ? json.avatar_file_list.map((i) => new FileModel(i)) || [
            new FileModel(FileModel.getDefaultData()),
          ]
        : [];
    this.status = json.status || 0;
    this.seo_url = json.seo_url || "";
    this.seo_title = json.seo_title || "";
    this.seo_meta_description = json.seo_meta_description || "";
    this.seo_meta_keyword = json.seo_meta_keyword || "";
    this.seo_graph_file_id = json.seo_graph_file_id || 0;
    this.seo_graph_file = new FileModel(
      json.seo_graph_file || FileModel.getDefaultData()
    );
    this.seo_canonical = json.seo_canonical || "";
    this.date_created = json.date_created || 0;
    this.date_modified = json.date_modified || 0;
  }

  static getDefaultData(): NewsCategoryJson {
    return {
      id: 0,
      name: "",
      description: "",
      display_order: 0,
      parent_id: 0,
      external_id: "",
      avatar_file_id_list: [],
      avatar_file_list: [new FileModel(FileModel.getDefaultData())],
      status: 0,
      seo_url: "",
      seo_title: "",
      seo_meta_description: "",
      seo_meta_keyword: "",
      seo_graph_file_id: 0,
      seo_graph_file: new FileModel(FileModel.getDefaultData()),
      seo_canonical: "",
      date_created: 0,
      date_modified: 0,
    };
  }

  toJson(): NewsCategoryJson {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      display_order: this.display_order,
      parent_id: this.parent_id,
      external_id: this.external_id,
      avatar_file_id_list: this.avatar_file_id_list,
      avatar_file_list: this.avatar_file_list,
      status: this.status,
      seo_url: this.seo_url,
      seo_title: this.seo_title,
      seo_meta_description: this.seo_meta_description,
      seo_meta_keyword: this.seo_meta_keyword,
      seo_graph_file_id: this.seo_graph_file_id,
      seo_graph_file: this.seo_graph_file,
      seo_canonical: this.seo_canonical,
      date_created: this.date_created,
      date_modified: this.date_modified,
    };
  }

  static getMarkSlug(categoryId: number, seo_url: string): string {
    let slug = "/news/";
    if (seo_url.length > 0) {
      slug += seo_url;
    } else {
      slug += categoryId;
    }

    return slug;
  }
}

export default NewsCategoryModel;
