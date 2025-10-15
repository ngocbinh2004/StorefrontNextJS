import { BaseCollectionJson } from "./BaseCollection";
import { FileJson } from "./File";
import { Filter } from "./Filter";
import { ProductVariantJson } from "./ProductVariant";

type ProductAttributeOverrideJson = {
  id: number;
  value: string;
};

type ProductGroupJson = {
  product_id: number;
  name: string;
  seo_url: string;
};

type ProductDecorationDataJson = {
  type: number;
  id: number;
  file: FileJson;
  date_started: string;
  date_ended: string;
};

type ProductJsonAddEdit = {
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
  seo_canonical: string;
  seo_options: string;
  avatar_file_id_list: number[];
  photo_gallery_file_id_list: number[];
  photo360_file_id_list: number[];
  embed_video_scripts: string;
  decorations: ProductDecorationDataJson[];
  attribute_detail: ProductAttributeOverrideJson[];
  tags: string[];
  note: string;
  variants: ProductVariantJson[];
  category_slug: string;
  group: ProductGroupJson[];
  avg_rating: number;
};

type ProductJson = ProductJsonAddEdit & {
  company_id: number;
  creator_id: number;
  seo_graph_file: FileJson;
  avatar_file_list: ProductImage[];
  photo_gallery_file_list: ProductImage[];
  date_created: number;
  date_modified: number;
  date_last_synced_info: number;
  date_last_synced_stock: number;
  date_last_synced_price: number;
  prepayment_percentage: number;
};

type ProductCollectionJson = BaseCollectionJson<ProductJson>;

type FilterProduct = Filter & {
  ids?: string;
  category_id?: number;
  keyword?: string;
  brand?: string;
  aggs?: string;
  sorter?: string;
  price?: string;
  installment?: number;
};

type FilterStringFacet = {
  name: string;
  value: string[];
};

type FilterRequestBody = {
  string_facet?: FilterStringFacet[];
};

type ProductImage = {
  id: number;
  file_path: string;
  url: string;
  width: number;
  height: number;
};

type ProductGallary = {
  key: number;
  label: string;
  images: ProductImage[];
};
export type {
  ProductGallary,
  ProductImage,
  FilterProduct,
  ProductCollectionJson,
  ProductJson,
  ProductJsonAddEdit,
  ProductDecorationDataJson,
  ProductAttributeOverrideJson,
  ProductGroupJson,
  FilterStringFacet,
  FilterRequestBody,
};
