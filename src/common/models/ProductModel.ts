import { BaseModelJson } from "@/common/interfaces/BaseModelJson";

import BaseModel from "./BaseModel";
import FileModel from "./FileModel";

import type {
  ProductAttributeOverrideJson,
  ProductDecorationDataJson,
  ProductGroupJson,
  ProductJson,
  ProductImage,
  ProductJsonAddEdit,
} from "@/common/types/Product";
import Product from "../contants/Product";
import ProductVariantModel from "./ProductVariantModel";
import { SelectOption } from "../types/SelectOption";
import { PriceRangeOption } from "../types/PriceRange";

class ProductModel extends BaseModel implements BaseModelJson<ProductJson> {
  company_id: number;
  creator_id: number;
  id: number;
  uuid: string;
  type: number;
  name: string;
  name_short: string;
  summary: string;
  description: string;
  code: string;
  external_id: string;
  category_primary: number;
  category_id_list: number[];
  brand_id: number;
  supplier_id: number[];
  unit: number;
  sell_on_zero: number;
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
  avatar_file_id_list: number[];
  avatar_file_list: ProductImage[];
  photo_gallery_file_id_list: number[];
  photo_gallery_file_list: ProductImage[];
  photo360_file_id_list: number[];
  embed_video_scripts: string;
  decorations: ProductDecorationDataJson[];
  attribute_detail: ProductAttributeOverrideJson[];
  date_created: number;
  date_modified: number;
  date_last_synced_info: number;
  date_last_synced_stock: number;
  date_last_synced_price: number;
  tags: string[];
  note: string;
  variants: ProductVariantModel[];
  category_slug: string;
  group: ProductGroupJson[];
  avg_rating: number;
  prepayment_percentage: number;

  constructor(json: ProductJson) {
    super();

    this.company_id = json.company_id || 0;
    this.creator_id = json.creator_id || 0;
    this.id = json.id || 0;
    this.uuid = json.uuid || "";
    this.type = json.type || 0;
    this.name = json.name || "";
    this.name_short = json.name_short || "";
    this.summary = json.summary || "";
    this.description = json.description || "";
    this.code = json.code || "";
    this.external_id = json.external_id || "";
    this.category_primary = json.category_primary || 0;
    this.category_id_list = json.category_id_list || [];
    this.supplier_id = json.supplier_id || [];
    this.brand_id = json.brand_id || 0;
    this.unit = json.unit || 0;
    this.sell_on_zero = json.sell_on_zero || 0;
    this.info_package = json.info_package || "";
    this.info_warranty = json.info_warranty || "";
    this.info_promotion = json.info_promotion || "";
    this.info_promotion_note = json.info_promotion_note || "";
    this.gift_accessory_id = json.gift_accessory_id || 0;
    this.gift_accessory_ignore = json.gift_accessory_ignore || 0;
    this.bundle_id = json.bundle_id || 0;
    this.bundle_ignore = json.bundle_ignore || 0;
    this.avg_rating = json.avg_rating || 0;
    this.visibility = json.visibility || [];
    this.payment_method = json.payment_method || [];
    this.prepayment_percentage = json.prepayment_percentage || 0;
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
    this.avatar_file_id_list = json.avatar_file_id_list || [];
    this.avatar_file_list = json.avatar_file_list || [];

    this.photo_gallery_file_id_list = json.photo_gallery_file_id_list || [];

    this.photo_gallery_file_list = json.photo_gallery_file_list || [];

    this.photo360_file_id_list = json.photo360_file_id_list || [];
    this.embed_video_scripts = json.embed_video_scripts || "";
    this.decorations = json.decorations || [];
    this.attribute_detail = json.attribute_detail || [];
    this.date_created = json.date_created || 0;
    this.date_modified = json.date_modified || 0;
    this.date_last_synced_info = json.date_last_synced_info || 0;
    this.date_last_synced_stock = json.date_last_synced_stock || 0;
    this.date_last_synced_price = json.date_last_synced_price || 0;
    this.tags = json.tags || [];
    this.note = json.note || "";
    this.variants = json.variants.map((i) => new ProductVariantModel(i)) || [
      new ProductVariantModel(ProductVariantModel.getDefaultData()),
    ];
    this.category_slug = json.category_slug || "";
    this.group = json.group || [];
  }

  static getDefaultProductJsonAddEditData(): ProductJsonAddEdit {
    return {
      id: 0,
      uuid: "",
      type: Product.TYPE_GOODS_NORMAL,
      name: "",
      name_short: "",
      summary: "",
      description: "",
      code: "",
      external_id: "",
      category_primary: 0,
      category_id_list: [],
      brand_id: 0,
      supplier_id: [],
      unit: Product.UNIT_DEFAULT,
      sell_on_zero: 0,
      info_package: "",
      info_warranty: "",
      info_promotion: "",
      info_promotion_note: "",
      gift_accessory_id: 0,
      gift_accessory_ignore: 0,
      bundle_id: 0,
      bundle_ignore: 0,
      avg_rating: 0,
      visibility: [Product.VISIBILITY_CATALOG, Product.VISIBILITY_SEARCH],
      payment_method: [Product.PAYMENT_ONLINE_IS_ALLOWED],
      installment: [],
      status: Product.STATUS_DRAFT,
      seo_url: "",
      seo_title: "",
      seo_meta_description: "",
      seo_meta_keyword: "",
      seo_graph_file_id: 0,
      seo_canonical: "",
      seo_options: "",
      avatar_file_id_list: [],
      photo_gallery_file_id_list: [],
      photo360_file_id_list: [],
      embed_video_scripts: "",
      decorations: [],
      attribute_detail: [],
      tags: [],
      note: "",
      variants: [],
      category_slug: "",
      group: [],
    };
  }

  static getDefaultData(): ProductJson {
    return {
      ...this.getDefaultProductJsonAddEditData(),
      company_id: 0,
      creator_id: 0,
      seo_graph_file: FileModel.getDefaultData(),
      avatar_file_list: [],
      photo_gallery_file_list: [],
      date_created: 0,
      date_modified: 0,
      date_last_synced_info: 0,
      date_last_synced_stock: 0,
      date_last_synced_price: 0,
      prepayment_percentage: 0,
    };
  }

  toJson(): ProductJson {
    return {
      company_id: this.company_id,
      creator_id: this.creator_id,
      id: this.id,
      uuid: this.uuid,
      type: this.type,
      name: this.name,
      name_short: this.name_short,
      summary: this.summary,
      description: this.description,
      code: this.code,
      external_id: this.external_id,
      category_primary: this.category_primary,
      category_id_list: this.category_id_list,
      brand_id: this.brand_id,
      supplier_id: this.supplier_id,
      unit: this.unit,
      sell_on_zero: this.sell_on_zero,
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
      prepayment_percentage: this.prepayment_percentage,
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
      avatar_file_id_list: this.avatar_file_id_list,
      avatar_file_list: this.avatar_file_list,
      photo_gallery_file_id_list: this.photo_gallery_file_id_list,
      photo_gallery_file_list: this.photo_gallery_file_list,
      photo360_file_id_list: this.photo360_file_id_list,
      embed_video_scripts: this.embed_video_scripts,
      decorations: this.decorations,
      attribute_detail: this.attribute_detail,
      date_created: this.date_created,
      date_modified: this.date_modified,
      date_last_synced_info: this.date_last_synced_info,
      date_last_synced_stock: this.date_last_synced_stock,
      date_last_synced_price: this.date_last_synced_price,
      tags: this.tags,
      note: this.note,
      variants: this.variants.map((i) => i.toJson()),
      category_slug: this.category_slug,
      group: this.group,
      avg_rating: this.avg_rating,
    };
  }

  static getInstallmentList(): SelectOption[] {
    return [
      {
        value: Product.INSTALLMENT_ENABLED,
        label: "Cho phép mua trả góp",
        color: "",
      },
      {
        value: Product.INSTALLMENT_ALLOW_ZERO_RATE,
        label: "Cho phép trả góp 0%",
        color: "",
      },
      {
        value: Product.INSTALLMENT_ALLOW_PREORDER,
        label: "Cho phép đặt trước",
        color: "",
      },
      {
        value: Product.INSTALLMENT_COMING_SOON,
        label: "Hàng sắp về",
        color: "",
      },
    ];
  }

  static getInstallment(value: number): SelectOption | undefined {
    return this.getInstallmentList().find((item) => item.value === value);
  }

  getUrl(prefix: string): string {
    let url = "/" + prefix;
    if (this.seo_url.length > 0) {
      url += this.seo_url;
    } else {
      url += "product-" + this.id;
    }

    return url;
  }

  static getMarkUrl(prefix: string, seoUrl: string, id: number): string {
    let url = "";
    if (prefix.length > 0) {
      url += "/" + prefix;
    } else {
      url += "/collection";
    }

    if (seoUrl.length > 0) {
      url += `/${seoUrl}.html`;
    } else {
      url += `/${id}`;
    }

    return url;
  }

  static getPriceRangeOptions(): PriceRangeOption[] {
    const options: PriceRangeOption[] = [
      {
        id: 1,
        text: "Dưới 2 triệu",
        value: [0, 2000000],
      },
      {
        id: 2,
        text: "Từ 2 - 4 triệu",
        value: [2000000, 4000000],
      },
      {
        id: 3,
        text: "Từ 4 - 7 triệu",
        value: [4000000, 7000000],
      },
      {
        id: 4,
        text: "Từ 7 - 13 triệu",
        value: [7000000, 13000000],
      },
      {
        id: 5,
        text: "Từ 13 - 20 triệu",
        value: [13000000, 20000000],
      },
      {
        id: 6,
        text: "Trên 20 triệu",
        value: [20000000, 50000000],
      },
    ];

    return options;
  }

  static buildPriceRangeQueryString(idListString: string): string {
    const idList = idListString.split(".").map((id) => +id);
    const items: string[] = [];

    const options = this.getPriceRangeOptions();
    for (let i = 0; i < idList.length; i++) {
      const foundOption = options.find((op) => op.id === idList[i]);
      if (typeof foundOption !== "undefined") {
        items.push(`${foundOption.value[0]}-${foundOption.value[1]}`);
      }
    }

    return items.join(".");
  }

  static buildPriceQueryString(paramPr: string, paramCr: string): string {
    //parsing the price range
    let queryPrice = "";
    if (typeof paramPr !== "undefined" && paramPr.length > 0) {
      const idList = paramPr.split(".").map((id) => +id);
      const items: string[] = [];

      const options = this.getPriceRangeOptions();
      for (let i = 0; i < idList.length; i++) {
        const foundOption = options.find((op) => op.id === idList[i]);
        if (typeof foundOption !== "undefined") {
          items.push(`${foundOption.value[0]}-${foundOption.value[1]}`);
        }
      }

      queryPrice = items.join(".");
    } else if (typeof paramCr !== "undefined" && paramCr.length > 0) {
      queryPrice = paramCr;
    }

    return queryPrice;
  }
}

export default ProductModel;
