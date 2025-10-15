import BaseCollection from "./BaseCollection";
import OrderModel from "../models/OrderModel";
import { OrderCollectionJson, OrderJson } from "../types/Order";

class OrderCollection extends BaseCollection<
  OrderJson,
  OrderModel,
  OrderCollectionJson
> {
  itemsFromJson(jsonItems: OrderJson[]): OrderModel[] {
    return jsonItems.map((item) => new OrderModel(item));
  }
}

export default OrderCollection;
