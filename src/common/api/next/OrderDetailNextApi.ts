import OrderDetailCollection from "@/common/collections/OrderDetailCollection";
import { OrderDetailCollectionJson } from "@/common/types/OrderDetail";
import { default as BaseApi, default as BaseNextApi } from "./BaseNextApi";
import NextClient from "./NextClient";

const SERVICE_URL = "/next-api/orderdetail";

class OrderDetailNextApi extends BaseNextApi {
  static async getItems(order_id: number): Promise<OrderDetailCollection> {
    let collection = new OrderDetailCollection();

    try {
      let queryData = {
        params: { order_id: order_id },
      };

      const response = await NextClient().get<OrderDetailCollectionJson>(
        `${SERVICE_URL}/list`,
        queryData
      );

      if (response.hasOwnProperty("data")) {
        collection.fromJson(response.data);
      }
    } catch (error) {
      collection.withError(BaseApi.handleError(error));
    }
    return collection;
  }
}

export default OrderDetailNextApi;
