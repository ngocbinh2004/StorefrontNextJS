import { BaseCollectionJson } from "./BaseCollection";
import { FileJson } from "./File";
import { Filter } from "./Filter";
import { ProductImage } from "./Product";

type ProductVariantOverrideName =
  | "seo"
  | "introduction"
  | "promotion"
  | "package";

type ProductVariantComboJson = {
  product_id: number;
  product_variant_id: number;
  quantity: number;
  variant_exchange_mode: number;
  variant_exchange_id_list: number[];
};

type ProductVariantJsonBase = {
  product_id: number;
  id: number;
  sku: string;
  external_id: string;
  title: string;
  title_short: string;
  summary: string;
  description: string;
  color: number;
  size: number;
  cost: number;
  price: number;
  listing_price: number;
  avatar_file_id_list: number[];
  photo_gallery_file_id_list: number[];
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
  seo_canonical: string;
  seo_options: string;
  is_default: number;
  is_show_as_product: number;
  override_fields: ProductVariantOverrideName[];
  combo_data: ProductVariantComboJson[];
};

type ProductVariantJson = ProductVariantJsonBase & {
  company_id: number;
  creator_id: number;
  weight: number;
  date_created: number;
  date_modified: number;
  key: number;
  avatar_file_list: ProductImage[];
  photo_gallery_file_list: ProductImage[];
  seo_graph_file: FileJson;
  color_name: string;
};

type ProductVariantCollectionJson = BaseCollectionJson<ProductVariantJson>;

type FilterProductVariant = Filter & { product_id?: number; ids?: string };

export type {
  ProductVariantOverrideName,
  ProductVariantComboJson,
  ProductVariantJson,
  ProductVariantCollectionJson,
  FilterProductVariant,
};
