import { BaseModelJson } from "../interfaces/BaseModelJson";
import { ProductCommentJson } from "../types/ProductComment";
import { ProductCommentReplyJson } from "../types/ProductCommentReply";
import BaseModel from "./BaseModel";
import FileModel from "./FileModel";

class ProductCommentModel
  extends BaseModel
  implements BaseModelJson<ProductCommentJson>
{
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
  files: FileModel[];
  date_created: number;
  reply_list: ProductCommentReplyJson[];

  constructor(json: ProductCommentJson) {
    super();

    this.company_id = json.company_id || 0;
    this.product_id = json.product_id || 0;
    this.product_variant_id = json.product_variant_id || 0;
    this.id = json.id || 0;
    this.fullname = json.fullname || "";
    this.phone = json.phone || "";
    this.email = json.email || "";
    this.customer_id = json.customer_id || 0;
    this.content = json.content || "";
    this.count_reply = json.count_reply || 0;
    this.file_id_list = json.file_id_list || [];
    this.files = [];
    if (typeof json.files !== "undefined" && Array.isArray(json.files)) {
      this.files = json.files.map((file) => new FileModel(file));
    }
    this.date_created = json.date_created || 0;
    this.reply_list = json.reply_list || [];
  }

  static getDefaultData(): ProductCommentJson {
    return {
      company_id: 0,
      product_id: 0,
      product_variant_id: 0,
      id: 0,
      fullname: "",
      phone: "",
      email: "",
      customer_id: 0,
      content: "",
      count_reply: 0,
      file_id_list: [],
      files: [],
      date_created: 0,
      reply_list: [],
    };
  }

  toJson(): ProductCommentJson {
    return {
      company_id: this.company_id,
      product_id: this.product_id,
      product_variant_id: this.product_variant_id,
      id: this.id,
      fullname: this.fullname,
      phone: this.phone,
      email: this.email,
      customer_id: this.customer_id,
      content: this.content,
      count_reply: this.count_reply,
      file_id_list: this.file_id_list,
      files: this.files,
      date_created: this.date_created,
      reply_list: this.reply_list,
    };
  }
}

export default ProductCommentModel;
