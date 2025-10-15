import { WebUserCartItem } from "./WebUserCart";

type PromotionCodeCheckRequestDetailItem = {
  product_variant_id: number;
  quantity: number;
};

type PromotionCodeCheckRequest = {
  code: string;
  details: PromotionCodeCheckRequestDetailItem[];
};

type PromotionCodeResultJson = {
  id: number;
  name: string;
  code: string;
  discount_type: number;
  discount_value: number;
};

export type {
  PromotionCodeCheckRequest,
  PromotionCodeResultJson,
  PromotionCodeCheckRequestDetailItem,
};
