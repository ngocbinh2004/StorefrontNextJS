import { BaseModelJson } from "../interfaces/BaseModelJson";
import { PageJson } from "../types/Page";
import BaseModel from "./BaseModel";
import FileModel from "./FileModel";

class PageModel extends BaseModel implements BaseModelJson<PageJson> {
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
  avatar_file_list: FileModel[];
  seo_graph_file: FileModel;
  is_mandatory: number;

  constructor(json: PageJson) {
    super();

    this.id = json.id || 0;
    this.title = json.title || "";
    this.content = json.content || "";
    this.status = json.status || 0;
    this.avatar_file_id_list = json.avatar_file_id_list || [];
    this.avatar_file_list = json.avatar_file_list.map(
      (i) => new FileModel(i),
    ) || [new FileModel(FileModel.getDefaultData())];
    this.seo_url = json.seo_url || "";
    this.seo_title = json.seo_title || "";
    this.seo_meta_description = json.seo_meta_description || "";
    this.seo_meta_keyword = json.seo_meta_keyword || "";
    this.seo_graph_file_id = json.seo_graph_file_id || 0;
    this.seo_graph_file = new FileModel(
      json.seo_graph_file || FileModel.getDefaultData(),
    );
    this.seo_canonical = json.seo_canonical || "";
    this.seo_options = json.seo_options || "";
    this.is_mandatory = json.is_mandatory || 0;
  }

  static getDefaultData(): PageJson {
    return {
      id: 0,
      title: "",
      content: "",
      status: 0,
      avatar_file_id_list: [],
      seo_url: "",
      seo_title: "",
      seo_meta_description: "",
      seo_meta_keyword: "",
      seo_graph_file_id: 0,
      seo_canonical: "",
      seo_options: "",
      avatar_file_list: [new FileModel(FileModel.getDefaultData())],
      seo_graph_file: new FileModel(FileModel.getDefaultData()),
      is_mandatory: 0,
    };
  }

  toJson(): PageJson {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      status: this.status,
      avatar_file_id_list: this.avatar_file_id_list,
      avatar_file_list: this.avatar_file_list,
      seo_url: this.seo_url,
      seo_title: this.seo_title,
      seo_meta_description: this.seo_meta_description,
      seo_meta_keyword: this.seo_meta_keyword,
      seo_graph_file_id: this.seo_graph_file_id,
      seo_graph_file: this.seo_graph_file,
      seo_canonical: this.seo_canonical,
      seo_options: this.seo_options,
      is_mandatory: this.is_mandatory,
    };
  }
}

export default PageModel;
