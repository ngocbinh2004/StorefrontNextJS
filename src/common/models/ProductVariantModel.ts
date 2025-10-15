import { BaseModelJson } from "../interfaces/BaseModelJson";
import BaseModel from "./BaseModel";

import type {
  ProductVariantComboJson,
  ProductVariantJson,
  ProductVariantOverrideName,
} from "@/common/types/ProductVariant";
import FileModel from "./FileModel";
import ProductVariant from "../contants/ProductVariant";
import { isArray } from "util";
import { ProductImage } from "../types/Product";
class ProductVariantModel
  extends BaseModel
  implements BaseModelJson<ProductVariantJson>
{
  company_id: number;
  creator_id: number;
  product_id: number;
  id: number;
  sku: string;
  external_id: string;
  title: string;
  title_short: string;
  summary: string;
  description: string;
  color: number;
  color_name: string;
  size: number;
  weight: number;
  cost: number;
  price: number;
  listing_price: number;
  avatar_file_id_list: number[];
  avatar_file_list: ProductImage[];
  photo_gallery_file_id_list: number[];
  photo_gallery_file_list: ProductImage[];
  photo360_file_id_list: number[];
  embed_video_scripts: string;
  info_package: string;
  info_warranty: string;
  info_promotion: string;
  info_promotion_note: string;
  gift_accessory_id: number;
  gift_accessory_ignore: number;
  bundle_id: number;
  bundle_ignore: number;
  visibility: number[];
  payment_method: number[];
  installment: number[];
  status: number;
  seo_url: string;
  seo_title: string;
  seo_meta_description: string;
  seo_meta_keyword: string;
  seo_graph_file_id: number;
  seo_graph_file: FileModel;
  seo_canonical: string;
  seo_options: string;
  is_default: number;
  is_show_as_product: number;
  date_created: number;
  date_modified: number;
  key: number;
  override_fields: ProductVariantOverrideName[];
  combo_data: ProductVariantComboJson[];

  constructor(json: ProductVariantJson) {
    super();

    this.company_id = json.company_id || 0;
    this.creator_id = json.creator_id || 0;
    this.product_id = json.product_id || 0;
    this.id = json.id || 0;
    this.color_name = json.color_name || "";
    this.sku = json.sku || "";
    this.external_id = json.external_id || "";
    this.title = json.title || "";
    this.title_short = json.title_short || "";
    this.summary = json.summary || "";
    this.description = json.description || "";
    this.color = json.color || 0;
    this.size = json.size || 0;
    this.weight = json.weight || 0;
    this.cost = json.cost || 0;
    this.price = json.price || 0;
    this.listing_price = json.listing_price || 0;
    this.avatar_file_id_list = json.avatar_file_id_list || [];

    this.avatar_file_list = json.avatar_file_list || [];

    this.photo_gallery_file_id_list = json.photo_gallery_file_id_list || [];
    this.photo_gallery_file_list = json.photo_gallery_file_list || [];
    this.photo360_file_id_list = json.photo360_file_id_list || [];
    this.embed_video_scripts = json.embed_video_scripts || "";
    this.info_package = json.info_package || "";
    this.info_warranty = json.info_warranty || "";
    this.info_promotion = json.info_promotion || "";
    this.info_promotion_note = json.info_promotion_note || "";
    this.gift_accessory_id = json.gift_accessory_id || 0;
    this.gift_accessory_ignore = json.gift_accessory_ignore || 0;
    this.bundle_id = json.bundle_id || 0;
    this.bundle_ignore = json.bundle_ignore || 0;
    this.visibility = json.visibility || [];
    this.payment_method = json.payment_method || [];
    this.installment = json.installment || [];
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
    this.is_default = json.is_default || 0;
    this.is_show_as_product = json.is_show_as_product || 0;
    this.date_created = json.date_created || 0;
    this.date_modified = json.date_modified || 0;
    this.key = this.id || 0;
    this.override_fields = json.override_fields || [];
    this.combo_data = json.combo_data || [];
  }

  static getDefaultData(): ProductVariantJson {
    return {
      company_id: 0,
      creator_id: 0,
      product_id: 0,
      id: 0,
      sku: "",
      external_id: "",
      title: "",
      title_short: "",
      summary: "",
      description: "",
      color: 0,
      color_name: "",
      size: 0,
      weight: 0,
      cost: 0,
      price: 0,
      listing_price: 0,
      avatar_file_id_list: [],
      photo_gallery_file_id_list: [],
      photo360_file_id_list: [],
      embed_video_scripts: "",
      info_package: "",
      info_warranty: "",
      info_promotion: "",
      info_promotion_note: "",
      gift_accessory_id: 0,
      gift_accessory_ignore: 0,
      bundle_id: 0,
      bundle_ignore: 0,
      visibility: [
        ProductVariant.VISIBILITY_CATALOG,
        ProductVariant.VISIBILITY_SEARCH,
      ],
      payment_method: [ProductVariant.PAYMENT_ONLINE_IS_ALLOWED],
      installment: [],
      status: 0,
      seo_url: "",
      seo_title: "",
      seo_meta_description: "",
      seo_meta_keyword: "",
      seo_graph_file_id: 0,
      seo_graph_file: FileModel.getDefaultData(),
      seo_canonical: "",
      seo_options: "",
      is_default: 0,
      is_show_as_product: 0,
      date_created: 0,
      date_modified: 0,
      key: 0,
      avatar_file_list: [],
      photo_gallery_file_list: [],
      override_fields: [],
      combo_data: [],
    };
  }

  toJson(): ProductVariantJson {
    return {
      company_id: this.company_id,
      creator_id: this.creator_id,
      product_id: this.product_id,
      id: this.id,
      sku: this.sku,
      external_id: this.external_id,
      title: this.title,
      title_short: this.title_short,
      summary: this.summary,
      description: this.description,
      color: this.color,
      color_name: this.color_name,
      size: this.size,
      weight: this.weight,
      cost: this.cost,
      price: this.price,
      listing_price: this.listing_price,
      avatar_file_id_list: this.avatar_file_id_list,
      avatar_file_list: this.avatar_file_list,
      photo_gallery_file_id_list: this.photo_gallery_file_id_list,
      photo_gallery_file_list: this.photo_gallery_file_list,
      photo360_file_id_list: this.photo360_file_id_list,
      embed_video_scripts: this.embed_video_scripts,
      info_package: this.info_package,
      info_warranty: this.info_warranty,
      info_promotion: this.info_promotion,
      info_promotion_note: this.info_promotion_note,
      gift_accessory_id: this.gift_accessory_id,
      gift_accessory_ignore: this.gift_accessory_ignore,
      bundle_id: this.bundle_id,
      bundle_ignore: this.bundle_ignore,
      visibility: this.visibility,
      payment_method: this.payment_method,
      installment: this.installment,
      status: this.status,
      seo_url: this.seo_url,
      seo_title: this.seo_title,
      seo_meta_description: this.seo_meta_description,
      seo_meta_keyword: this.seo_meta_keyword,
      seo_graph_file_id: this.seo_graph_file_id,
      seo_graph_file: this.seo_graph_file.toJson(),
      seo_canonical: this.seo_canonical,
      seo_options: this.seo_options,
      is_default: this.is_default,
      is_show_as_product: this.is_show_as_product,
      date_created: this.date_created,
      date_modified: this.date_modified,
      key: this.id,
      override_fields: this.override_fields,
      combo_data: this.combo_data,
    };
  }
}

export default ProductVariantModel;
