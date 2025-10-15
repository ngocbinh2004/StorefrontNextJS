import { BaseCollectionJson } from "./BaseCollection";

type ShippingPriceCheckRequest = {
  order_amount: number;
  region_id: number;
  sub_region_id: number;
};

type ShippingPriceJson = {
  id: number;
  name: string;
  region_id: number;
  sub_region_id: number;
  order_amount_from: number;
  order_amount_to: number;
  price_shipping: number;
};

type ShippingPriceCollectionJson = BaseCollectionJson<ShippingPriceJson>;

export type {
  ShippingPriceCheckRequest,
  ShippingPriceJson,
  ShippingPriceCollectionJson,
};
