import OrderDetailCollection from "@/common/collections/OrderDetailCollection";
import { OrderDetailCollectionJson } from "@/common/types/OrderDetail";
import { FetchError } from "ofetch";
import BaseApi from "./BaseApi";

const SERVICE_URL = "/site/orderdetails";

class OrderDetailApi extends BaseApi {
  static async getItems(order_id: number): Promise<OrderDetailCollection> {
    let collection = new OrderDetailCollection();

    await this.getInstance()<OrderDetailCollectionJson>(
      SERVICE_URL + `/${order_id}`,
      {
        method: "GET",
        cache: "no-store",
        query: {},
      }
    )
      .then((responseData) => {
        collection = new OrderDetailCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }
}

export default OrderDetailApi;
