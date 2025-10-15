import { BaseCollectionJson } from "./BaseCollection";
import { FileJson } from "./File";
import { Filter } from "./Filter";
import { ProductCommentReplyJson } from "./ProductCommentReply";

type ProductCommentRequest = {
  company_id: number;
  product_id: number;
  id: number;
  fullname: string;
  phone: string;
  email: string;
  customer_id: number;
  content: string;
  ip_address: string;
};

type ProductCommentJson = {
  company_id: number;
  product_id: number;
  product_variant_id: number;
  id: number;
  fullname: string;
  phone: string;
  email: string;
  customer_id: number;
  content: string;
  count_reply: number;
  file_id_list: number[];
  files: FileJson[];
  date_created: number;
  reply_list: ProductCommentReplyJson[];
};

type ProductCommentCollectionJson = BaseCollectionJson<ProductCommentJson>;

type FilterProductComment = Filter & {
  product_id: number;
  product_variant_id?: number;
};

export type {
  ProductCommentRequest,
  FilterProductComment,
  ProductCommentCollectionJson,
  ProductCommentJson,
};
