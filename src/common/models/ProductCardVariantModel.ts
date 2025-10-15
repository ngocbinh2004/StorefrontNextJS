import { BaseModelJson } from "@/common/interfaces/BaseModelJson";
import BaseModel from "./BaseModel";

import {
  ProductCardImage,
  ProductCardVariantColorJson,
  ProductCardVariant,
  ProductCardVariantSizeJson,
} from "../types/ProductCard";

class ProductCardVariantModel
  extends BaseModel
  implements BaseModelJson<ProductCardVariant>
{
  id: number;
  title: string;
  title_short: string;
  size: ProductCardVariantSizeJson;
  color: ProductCardVariantColorJson;
  price: number;
  discount_percent: number;
  listing_price: number;
  date_modified: number;
  thumbnails: ProductCardImage[];

  constructor(json: ProductCardVariant) {
    super();

    this.id = json.id || 0;
    this.title = json.title || "";
    this.title_short = json.title_short || "";
    this.size = json.size || { id: 0, name: "", file_url: "" };
    this.color = json.color || {
      id: 0,
      name: "",
      file_url: "",
      color_hex: "",
    };
    this.price = json.price || 0;
    this.discount_percent = json.discount_percent || 0;
    this.listing_price = json.listing_price || 0;
    this.date_modified = json.date_modified || 0;
    this.thumbnails = json.thumbnails || [];
  }

  static getDefaultData(): ProductCardVariant {
    return {
      id: 0,
      title: "",
      title_short: "",
      size: { id: 0, name: "", file_url: "" },
      color: {
        id: 0,
        name: "",
        file_url: "",
        color_hex: "",
      },
      price: 0,
      discount_percent: 0,
      listing_price: 0,
      date_modified: 0,
      thumbnails: [],
    };
  }

  toJson(): ProductCardVariant {
    return {
      id: this.id,
      title: this.title,
      title_short: this.title_short,
      size: this.size,
      color: this.color,
      price: this.price,
      discount_percent: this.discount_percent,
      listing_price: this.listing_price,
      date_modified: this.date_modified,
      thumbnails: this.thumbnails,
    };
  }
}

export default ProductCardVariantModel;
