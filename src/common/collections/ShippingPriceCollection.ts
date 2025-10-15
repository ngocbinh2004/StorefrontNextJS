import BaseCollection from "./BaseCollection";
import ShippingPriceModel from "../models/ShippingPriceModel";
import {
  ShippingPriceCollectionJson,
  ShippingPriceJson,
} from "../types/ShippingPrice";

class ShippingPriceCollection extends BaseCollection<
  ShippingPriceJson,
  ShippingPriceModel,
  ShippingPriceCollectionJson
> {
  itemsFromJson(jsonItems: ShippingPriceJson[]): ShippingPriceModel[] {
    return jsonItems.map((item) => new ShippingPriceModel(item));
  }
}

export default ShippingPriceCollection;
