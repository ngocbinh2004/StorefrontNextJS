import { ListInputItems } from "../interfaces/ListInput";
import { BaseCollectionJson } from "./BaseCollection";

type CSSProperties = {
  [key: string]: string | number | undefined;
};

type PageBlockDataImageLayout =
  | ""
  | "slider"
  | "listing"
  | "left"
  | "right"
  | "background";

type PageBlockDataTypeJson = {
  image_layout?: PageBlockDataImageLayout;
  html?: string;
  title?: string;
  product_id_list?: string;
  items?: ListInputItems;
  photos?: ListInputItems;
  item_column?: number;
  item_height?: string;
  item_column_width?: string;
  photo_column?: number;
  photo_height?: string;
  photo_column_width?: string;
  number_of_img_in_slide?: number;
  is_display_border?: number;
  title_style?: string;

  banner_id?: number;
  text_color?: string;
  background_color?: string;
  padding?: string;
  rounded_size?: string;

  title_color?: string;
  title_padding?: string;
  title_size?: string;
  title_align?: string;
};

type PageBlockJson = {
  page_id: number;
  id: number;
  mode: number;
  group_id: number;
  type: number;
  name: string;
  identifier: string;
  class_name: string;
  display_order: number;
  data: PageBlockDataTypeJson;
  is_mandatory: number;
  style: string;
};

type PageBlockCollectionJson = BaseCollectionJson<PageBlockJson>;

export type { PageBlockJson, PageBlockDataTypeJson, PageBlockCollectionJson };
