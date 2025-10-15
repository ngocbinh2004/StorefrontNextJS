import OrderCollection from "@/common/collections/OrderCollection";
import OrderHistoryModel from "@/common/models/OrderHistoryModel";
import OrderModel from "@/common/models/OrderModel";
import { CheckoutRequest } from "@/common/types/Checkout";
import { InstallmentRequest } from "@/common/types/Installment";
import {
  FilterOrder,
  OrderCheckRequest,
  OrderCollectionJson,
  OrderJson,
} from "@/common/types/Order";
import { OrderHistoryJson } from "@/common/types/OrderHistory";
import { default as BaseApi, default as BaseNextApi } from "./BaseNextApi";
import NextClient from "./NextClient";

const SERVICE_URL = "/next-api/order";

class OrderNextApi extends BaseNextApi {
  // getListOfCurrentWebUser
  static async getItems(filters: FilterOrder): Promise<OrderCollection> {
    let collection = new OrderCollection();

    try {
      let queryData = {
        params: filters,
      };

      const response = await NextClient().get<OrderCollectionJson>(
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

  // getDetailPublicByPhone
  static async check(data: OrderCheckRequest): Promise<OrderModel> {
    let item = new OrderModel(OrderModel.getDefaultData());
    try {
      const response = await NextClient().post<OrderJson>(
        `${SERVICE_URL}/check`,
        data
      );
      if (response.hasOwnProperty("data")) {
        item = new OrderModel(response.data);
      }
    } catch (error) {
      item.withError(BaseApi.handleError(error));
    }

    return item;
  }

  static async getDetail(id: number): Promise<OrderModel> {
    let item = new OrderModel(OrderModel.getDefaultData());
    try {
      const response = await NextClient().post<OrderJson>(
        `${SERVICE_URL}/detail`,
        { id }
      );
      if (response.hasOwnProperty("data")) {
        item = new OrderModel(response.data);
      }
    } catch (error) {
      item.withError(BaseApi.handleError(error));
    }

    return item;
  }

  static async add(data: CheckoutRequest): Promise<OrderModel> {
    let item = new OrderModel(OrderModel.getDefaultData());
    try {
      const response = await NextClient().post<OrderJson>(
        SERVICE_URL + "/add",
        data
      );
      console.log("orderAdd response", response);
      if (response.hasOwnProperty("data")) {
        item = new OrderModel(response.data);
      }
    } catch (error) {
      item.withError(BaseApi.handleError(error));
    }

    return item;
  }

  static async createInstallment(
    data: InstallmentRequest
  ): Promise<OrderModel> {
    let item = new OrderModel(OrderModel.getDefaultData());
    try {
      const response = await NextClient().post<OrderJson>(
        SERVICE_URL + "/installment/add",
        data
      );
      console.log("orderAdd response", response);
      if (response.hasOwnProperty("data")) {
        item = new OrderModel(response.data);
      }
    } catch (error) {
      item.withError(BaseApi.handleError(error));
    }

    return item;
  }

  static async getDetailByInvoiceId(id: number): Promise<OrderHistoryModel> {
    let item = new OrderHistoryModel(OrderHistoryModel.getDefaultData());
    try {
      const response = await NextClient().get<OrderHistoryJson>(
        `${SERVICE_URL}/byinvoiceid/${id.toString()}`,
        {}
      );
      if (response.hasOwnProperty("data")) {
        item = new OrderHistoryModel(response.data);
      }
    } catch (error) {
      item.withError(BaseApi.handleError(error));
    }

    return item;
  }
}

export default OrderNextApi;
