import { BaseCollectionJson } from "./BaseCollection";
import { FileJson } from "./File";
import { Filter } from "./Filter";
import { ProductRatingReplyJson } from "./ProductRatingReply";

type AddProductRatingRequest = {
  company_id: number;
  product_id: number;
  id: number;
  fullname: string;
  phone: string;
  email: string;
  customer_id: number;
  content: string;
  rating: number;
  ip_address: string;
};

type ProductRatingJson = {
  company_id: number;
  product_id: number;
  product_variant_id: number;
  id: number;
  fullname: string;
  phone: string;
  email: string;
  customer_id: number;
  content: string;
  rating: number;
  count_reply: number;
  file_id_list: number[];
  files: FileJson[];
  date_created: number;
  reply_list: ProductRatingReplyJson[];
};

type ProductRatingCollectionJson = BaseCollectionJson<ProductRatingJson>;

type FilterProductRating = Filter & {
  product_id: number;
  product_variant_id?: number;
};

export type {
  AddProductRatingRequest,
  FilterProductRating,
  ProductRatingCollectionJson,
  ProductRatingJson,
};
