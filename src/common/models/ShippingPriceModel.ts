import BaseModel from "./BaseModel";

import { BaseModelJson } from "../interfaces/BaseModelJson";
import { ShippingPriceJson } from "../types/ShippingPrice";
class ShippingPriceModel
  extends BaseModel
  implements BaseModelJson<ShippingPriceJson>
{
  id: number;
  name: string;
  region_id: number;
  sub_region_id: number;
  order_amount_from: number;
  order_amount_to: number;
  price_shipping: number;

  constructor(json: ShippingPriceJson) {
    super();

    this.id = json.id || 0;
    this.name = json.name || "";
    this.region_id = json.region_id || 0;
    this.sub_region_id = json.sub_region_id || 0;
    this.order_amount_from = json.order_amount_from || 0;
    this.order_amount_to = json.order_amount_to || 0;
    this.price_shipping = json.price_shipping || 0;
  }

  static getDefaultData(): ShippingPriceJson {
    return {
      id: 0,
      name: "",
      region_id: 0,
      sub_region_id: 0,
      order_amount_from: 0,
      order_amount_to: 0,
      price_shipping: 0,
    };
  }

  toJson(): ShippingPriceJson {
    return {
      id: this.id,
      name: this.name,
      region_id: this.region_id,
      sub_region_id: this.sub_region_id,
      order_amount_from: this.order_amount_from,
      order_amount_to: this.order_amount_to,
      price_shipping: this.price_shipping,
    };
  }
}

export default ShippingPriceModel;
