import { BaseModelJson } from "../interfaces/BaseModelJson";
import { AttributeJson } from "../types/Attribute";
import { AttributeGroupJson } from "../types/AttributeGroup";
import {
  FilterProductCategory,
  ProductCategoryJson,
} from "../types/ProductCategory";
import BaseModel from "./BaseModel";
import FileModel from "./FileModel";

class ProductCategoryModel
  extends BaseModel
  implements BaseModelJson<ProductCategoryJson>
{
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
  avatar_file_list: FileModel[];
  view_template: number;
  gift_accessory_id: number;
  bundle_id: number;
  status: number;
  seo_url: string;
  seo_title: string;
  seo_meta_description: string;
  seo_meta_keyword: string;
  seo_graph_file_id: number;
  seo_graph_file: FileModel;
  seo_canonical: string;
  seo_options: string;
  date_created: number;
  date_modified: number;
  date_lastsynced: number;
  attribute_group?: AttributeGroupJson[];
  attribute?: AttributeJson[];

  constructor(json: ProductCategoryJson) {
    super();

    this.id = json.id || 0;
    this.uuid = json.uuid || "";
    this.name = json.name || "";
    this.name_short = json.name_short || "";
    this.description = json.description || "";
    this.display_order = json.display_order || 0;
    this.parent_id = json.parent_id || 0;
    this.external_id = json.external_id || "";
    this.prepayment_percentage = json.prepayment_percentage || 0;
    this.attribute_category_id = json.attribute_category_id || 0;
    this.avatar_file_id_list = json.avatar_file_id_list || [];
    this.avatar_file_list =
      typeof json.avatar_file_list !== "undefined"
        ? json.avatar_file_list.map((i) => new FileModel(i)) || [
            new FileModel(FileModel.getDefaultData()),
          ]
        : [];
    this.view_template = json.view_template || 0;
    this.gift_accessory_id = json.gift_accessory_id || 0;
    this.bundle_id = json.bundle_id || 0;
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
    this.seo_options = json.seo_options || "";
    this.date_created = json.date_created || 0;
    this.date_modified = json.date_modified || 0;
    this.date_lastsynced = json.date_lastsynced || 0;
    this.attribute_group = json.attribute_group || [];
    this.attribute = json.attribute || [];
  }

  static getDefaultData(): ProductCategoryJson {
    return {
      id: 0,
      uuid: "",
      name: "",
      name_short: "",
      description: "",
      display_order: 0,
      parent_id: 0,
      external_id: "",
      prepayment_percentage: 0,
      attribute_category_id: 0,
      avatar_file_id_list: [],
      avatar_file_list: [new FileModel(FileModel.getDefaultData())],
      view_template: 0,
      gift_accessory_id: 0,
      bundle_id: 0,
      status: 0,
      seo_url: "",
      seo_title: "",
      seo_meta_description: "",
      seo_meta_keyword: "",
      seo_graph_file_id: 0,
      seo_graph_file: new FileModel(FileModel.getDefaultData()),
      seo_canonical: "",
      seo_options: "",
      date_created: 0,
      date_modified: 0,
      date_lastsynced: 0,
      attribute_group: [],
      attribute: [],
    };
  }

  static getDefaultFilters(): FilterProductCategory {
    return {
      page: 1,
      limit: 5000,
      sortby: "display_order",
      sorttype: "ASC",
      parent_id: -1,
    };
  }

  toJson(): ProductCategoryJson {
    return {
      id: this.id,
      uuid: this.uuid,
      name: this.name,
      name_short: this.name_short,
      description: this.description,
      display_order: this.display_order,
      parent_id: this.parent_id,
      external_id: this.external_id,
      prepayment_percentage: this.prepayment_percentage,
      attribute_category_id: this.attribute_category_id,
      avatar_file_id_list: this.avatar_file_id_list,
      avatar_file_list: this.avatar_file_list,
      view_template: this.view_template,
      gift_accessory_id: this.gift_accessory_id,
      bundle_id: this.bundle_id,
      status: this.status,
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
      date_lastsynced: this.date_lastsynced,
      attribute_group: this.attribute_group,
      attribute: this.attribute,
    };
  }

  static getMarkUrl(item: ProductCategoryModel): string {
    let url = "/";
    if (item.seo_url.length > 0) {
      url += item.seo_url;
    } else {
      url += item.id;
    }

    return url;
  }
}

export default ProductCategoryModel;
