import { BaseModelJson } from "../interfaces/BaseModelJson";
import { ProductCommentReplyJson } from "../types/ProductCommentReply";
import BaseModel from "./BaseModel";
import FileModel from "./FileModel";

class ProductCommentReplyModel
  extends BaseModel
  implements BaseModelJson<ProductCommentReplyJson>
{
  company_id: number;
  creator_id: number;
  product_comment_id: number;
  id: number;
  fullname: string;
  phone: string;
  email: string;
  customer_id: number;
  content: string;
  file_id_list: number[];
  files: FileModel[];
  date_created: number;
  date_verified: number;
  date_replied: number;

  constructor(json: ProductCommentReplyJson) {
    super();

    this.company_id = json.company_id || 0;
    this.creator_id = json.creator_id || 0;
    this.product_comment_id = json.product_comment_id || 0;
    this.id = json.id || 0;
    this.fullname = json.fullname || "";
    this.phone = json.phone || "";
    this.email = json.email || "";
    this.customer_id = json.customer_id || 0;
    this.content = json.content || "";
    this.file_id_list = json.file_id_list || [];
    this.files = [];
    if (typeof json.files !== "undefined" && Array.isArray(json.files)) {
      this.files = json.files.map((file) => new FileModel(file));
    }
    this.date_created = json.date_created || 0;
    this.date_verified = json.date_verified || 0;
    this.date_replied = json.date_replied || 0;
  }

  static getDefaultData(): ProductCommentReplyJson {
    return {
      company_id: 0,
      creator_id: 0,
      product_comment_id: 0,
      id: 0,
      fullname: "",
      phone: "",
      email: "",
      customer_id: 0,
      content: "",
      file_id_list: [],
      files: [],
      date_created: 0,
      date_verified: 0,
      date_replied: 0,
    };
  }

  toJson(): ProductCommentReplyJson {
    return {
      company_id: this.company_id,
      creator_id: this.creator_id,
      product_comment_id: this.product_comment_id,
      id: this.id,
      fullname: this.fullname,
      phone: this.phone,
      email: this.email,
      customer_id: this.customer_id,
      content: this.content,
      file_id_list: this.file_id_list,
      files: this.files,
      date_created: this.date_created,
      date_verified: this.date_verified,
      date_replied: this.date_replied,
    };
  }
}

export default ProductCommentReplyModel;
