import BaseCollection from "./BaseCollection";
import {
  OrderHistoryCollectionJson,
  OrderHistoryJson,
} from "../types/OrderHistory";
import OrderHistoryModel from "../models/OrderHistoryModel";

class OrderHistoryCollection extends BaseCollection<
  OrderHistoryJson,
  OrderHistoryModel,
  OrderHistoryCollectionJson
> {
  itemsFromJson(jsonItems: OrderHistoryJson[]): OrderHistoryModel[] {
    return jsonItems.map((item) => new OrderHistoryModel(item));
  }
}

export default OrderHistoryCollection;
