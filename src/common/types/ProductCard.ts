import { BaseCollectionJson } from "./BaseCollection";
import { FileJson } from "./File";

type ProductCardCategoryJson = {
  id: number;
  name: string;
  seo_url: string;
};

type ProductCardVariantSizeJson = {
  id: number;
  name: string;
  file_url: string;
};

type ProductCardVariantColorJson = {
  id: number;
  name: string;
  file_url: string;
  color_hex: string;
};

type ProductCardVariant = {
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
};

type ProductCardImage = {
  id: number;
  file_path: string;
  url: string;
  width: number;
  height: number;
};

type ProductDecorationDataJson = {
  type: number;
  id: number;
  file: FileJson;
};

type ProductCardJson = {
  id: number;
  name: string;
  thumbnails: ProductCardImage[];
  gallery: ProductCardImage[];
  visibility: number[];
  installment: number[];
  promotion_note: string;
  info_promotion: string;
  seo_url: string;
  avg_rating: number;
  category: ProductCardCategoryJson;
  variants: ProductCardVariant[];
  decorations: ProductDecorationDataJson[];
};

type ProductCardCollectionJson = BaseCollectionJson<ProductCardJson>;

export type {
  ProductCardCollectionJson,
  ProductCardCategoryJson,
  ProductCardImage,
  ProductCardJson,
  ProductCardVariant,
  ProductCardVariantColorJson,
  ProductCardVariantSizeJson,
  ProductDecorationDataJson,
};
