import { BaseCollectionJson } from "./BaseCollection";
import { FileJson } from "./File";
import { Filter } from "./Filter";

type ProductRatingReplyJson = {
  company_id: number;
  creator_id: number;
  product_rating_id: number;
  id: number;
  fullname: string;
  phone: string;
  email: string;
  customer_id: number;
  content: string;
  file_id_list: number[];
  files: FileJson[];
  date_created: number;
  date_verified: number;
  date_replied: number;
};

type ProductRatingReplyCollectionJson =
  BaseCollectionJson<ProductRatingReplyJson>;

type FilterProductRatingReply = Filter & {
  product_rating_id: number;
};

export type {
  FilterProductRatingReply,
  ProductRatingReplyCollectionJson,
  ProductRatingReplyJson,
};
