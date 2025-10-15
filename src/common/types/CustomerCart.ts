import { ProductJson } from "./Product";
import { ProductCardJson, ProductCardVariant } from "./ProductCard";
import { ProductVariantJson } from "./ProductVariant";

type GiftAccessory = {
  gift_accessory_id: number;
  variants: number[];
};

type CustomerCartItem = {
  id: number;
  product_id: number;
  product_name: string;
  product_variant_id: number;
  quantity: number;
  sku: string;
  price: number;
  title: string;
  color: string;
  size: string;
  image: string;
  gift_accessory: GiftAccessory;
};

type CustomerCartJson = {
  uuid: string;
  details: CustomerCartItem[];
  price_sell: number;
  price_shipping: number;
  price_discount: number;
  date_created: number;
  date_modified: number;
};

type AddToCartRequest = {
  product_variant_id: number;
  quantity: number;
};

type CartItemEditRequest = AddToCartRequest;

type CartPrice = {
  price_sell: number;
  price_handling: number;
  price_discount: number;
  price_shipping: number;
  price_final: number;
  quantity: number;
};

export type {
  CustomerCartItem,
  CustomerCartJson,
  AddToCartRequest,
  CartItemEditRequest,
  CartPrice,
};
