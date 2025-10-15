import { BaseModelJson } from "@/common/interfaces/BaseModelJson";
import BaseModel from "./BaseModel";

import {
  ProductCardCategoryJson,
  ProductCardImage,
  ProductCardJson,
  ProductCardVariant,
} from "../types/ProductCard";
import { ProductDecorationDataJson } from "../types/ProductCard";
import ProductCardVariantModel from "./ProductCardVariantModel";

class ProductCardModel
  extends BaseModel
  implements BaseModelJson<ProductCardJson>
{
  id: number;
  name: string;
  thumbnails: ProductCardImage[];
  gallery: ProductCardImage[];
  installment: number[];
  visibility: number[];
  promotion_note: string;
  info_promotion: string;
  seo_url: string;
  avg_rating: number;
  category: ProductCardCategoryJson;
  variants: ProductCardVariant[];
  decorations: ProductDecorationDataJson[];

  constructor(json: ProductCardJson) {
    super();

    this.id = json.id || 0;
    this.name = json.name || "";
    this.thumbnails = json.thumbnails || [];
    this.gallery = json.gallery || [];
    this.installment = json.installment || [];
    this.visibility = json.visibility || [];
    this.promotion_note = json.promotion_note || "";
    this.info_promotion = json.info_promotion || "";
    this.seo_url = json.seo_url || "";
    this.avg_rating = json.avg_rating || 0;
    this.category = json.category || [];
    this.variants = json.variants || [ProductCardVariantModel.getDefaultData()];
    this.decorations = json.decorations || [];
  }

  static getDefaultData(): ProductCardJson {
    return {
      id: 0,
      name: "",
      thumbnails: [],
      gallery: [],
      installment: [],
      visibility: [],
      promotion_note: "",
      info_promotion: "",
      seo_url: "",
      avg_rating: 0,
      category: { id: 0, name: "", seo_url: "" },
      variants: [ProductCardVariantModel.getDefaultData()],
      decorations: [],
    };
  }

  toJson(): ProductCardJson {
    return {
      id: this.id,
      name: this.name,
      thumbnails: this.thumbnails,
      gallery: this.gallery,
      installment: this.installment,
      visibility: this.visibility,
      promotion_note: this.promotion_note,
      info_promotion: this.info_promotion,
      seo_url: this.seo_url,
      avg_rating: this.avg_rating,
      category: this.category,
      variants: this.variants,
      decorations: this.decorations,
    };
  }
}

export default ProductCardModel;
