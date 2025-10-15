import { BaseCollectionJson } from "./BaseCollection";
import { Filter } from "./Filter";
import { ProductImage } from "./Product";

type OrderDetailJson = {
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
};

type OrderDetailJsonAddEdit = OrderDetailJson & {};

type OrderDetailCollectionJson = BaseCollectionJson<OrderDetailJson>;

type FilterOrderDetail = Filter & {
  order_id: number;
};

export type {
  OrderDetailJson,
  OrderDetailJsonAddEdit,
  OrderDetailCollectionJson,
  FilterOrderDetail,
};
