import BaseCollection from "./BaseCollection";
import OrderDetailModel from "../models/OrderDetailModel";
import {
  OrderDetailCollectionJson,
  OrderDetailJson,
} from "../types/OrderDetail";

class OrderDetailCollection extends BaseCollection<
  OrderDetailJson,
  OrderDetailModel,
  OrderDetailCollectionJson
> {
  itemsFromJson(jsonItems: OrderDetailJson[]): OrderDetailModel[] {
    return jsonItems.map((item) => new OrderDetailModel(item));
  }
}

export default OrderDetailCollection;
