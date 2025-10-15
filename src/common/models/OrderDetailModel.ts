import { BaseModelJson } from "../interfaces/BaseModelJson";
import { OrderDetailJson } from "../types/OrderDetail";
import { ProductImage } from "../types/Product";
import BaseModel from "./BaseModel";

class OrderDetailModel
  extends BaseModel
  implements BaseModelJson<OrderDetailJson>
{
  order_id: number;
  product_id: number;
  product_variant_id: number;
  id: number;
  sku: string;
  is_gift_product: number;
  item_name: string;
  item_title: string;
  item_color: number;
  item_size: number;
  item_quantity: number;
  item_unit_price_original: number;
  item_unit_price: number;
  price_discount: number;
  avatar_file_list: ProductImage[];

  constructor(json: OrderDetailJson) {
    super();

    this.order_id = json.order_id || 0;
    this.product_id = json.product_id || 0;
    this.product_variant_id = json.product_variant_id || 0;
    this.id = json.id || 0;
    this.sku = json.sku || "";
    this.is_gift_product = json.is_gift_product || 0;
    this.item_name = json.item_name || "";
    this.item_title = json.item_title || "";
    this.item_color = json.item_color || 0;
    this.item_size = json.item_size || 0;
    this.item_quantity = json.item_quantity || 0;
    this.item_unit_price_original = json.item_unit_price_original || 0;
    this.item_unit_price = json.item_unit_price || 0;
    this.price_discount = json.price_discount || 0;
    this.avatar_file_list = json.avatar_file_list || [];
  }

  static getDefaultData(): OrderDetailJson {
    return {
      order_id: 0,
      product_id: 0,
      product_variant_id: 0,
      id: 0,
      sku: "",
      is_gift_product: 0,
      item_name: "",
      item_title: " ",
      item_size: 0,
      item_color: 0,
      item_quantity: 0,
      item_unit_price_original: 0,
      item_unit_price: 0,
      price_discount: 0,
      avatar_file_list: [],
    };
  }

  toJson(): OrderDetailJson {
    return {
      order_id: this.order_id,
      product_id: this.product_id,
      product_variant_id: this.product_variant_id,
      id: this.id,
      sku: this.sku,
      is_gift_product: this.is_gift_product,
      item_name: this.item_name,
      item_title: this.item_title,
      item_size: this.item_size,
      item_color: this.item_color,
      item_quantity: this.item_quantity,
      item_unit_price_original: this.item_unit_price_original,
      item_unit_price: this.item_unit_price,
      price_discount: this.price_discount,
      avatar_file_list: this.avatar_file_list,
    };
  }
}

export default OrderDetailModel;
