import OrderCollection from "@/common/collections/OrderCollection";
import OrderHistoryCollection from "@/common/collections/OrderHistoryCollection";
import OrderHistoryModel from "@/common/models/OrderHistoryModel";
import OrderModel from "@/common/models/OrderModel";
import { InstallmentRequest } from "@/common/types/Installment";
import {
  FilterOrder,
  OrderAddRequest,
  OrderCheckRequest,
  OrderCollectionJson,
  OrderJson,
} from "@/common/types/Order";
import {
  OrderHistoryCollectionJson,
  OrderHistoryJson,
} from "@/common/types/OrderHistory";
import { FetchError } from "ofetch";
import BaseApi from "./BaseApi";

const SERVICE_URL = "/site/orders";

class OrderApi extends BaseApi {
  // getListOfCurrentWebUser
  static async getItems(filters: FilterOrder): Promise<OrderCollection> {
    let collection = new OrderCollection();

    await this.getInstance()<OrderCollectionJson>(SERVICE_URL, {
      method: "GET",
      cache: "no-store",
      query: {
        page: filters.page,
        limit: filters.limit,
        sort_by: filters.sortby,
        sort_type: filters.sorttype,
      },
    })
      .then((responseData) => {
        collection = new OrderCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }

  static async getItem(id: number): Promise<OrderModel> {
    let item = new OrderModel(OrderModel.getDefaultData());

    await this.getInstance()<OrderJson>(`${SERVICE_URL}/${id}`, {
      method: "GET",
      cache: "no-store",
    })
      .then((responseData) => {
        item = new OrderModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }

  static async getOrderByKey(key: string): Promise<OrderModel> {
    let item = new OrderModel(OrderModel.getDefaultData());

    await this.getInstance()<OrderJson>(`${SERVICE_URL}/${key}/hashkey`, {
      method: "GET",
      cache: "no-store",
    })
      .then((responseData) => {
        item = new OrderModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }

  // getDetailPublicByPhone
  static async check(data: OrderCheckRequest): Promise<OrderModel> {
    let item = new OrderModel(OrderModel.getDefaultData());

    await this.getInstance()<OrderJson>(
      `${SERVICE_URL}/public/${data.id}/${data.phone}`,
      {
        method: "GET",
        cache: "no-store",
      }
    )
      .then((responseData) => {
        item = new OrderModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }

  static async add(data: OrderAddRequest): Promise<OrderModel> {
    let item = new OrderModel(OrderModel.getDefaultData());

    await this.getInstance()<OrderJson>(`${SERVICE_URL}`, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(data),
    })
      .then((responseData) => {
        item = new OrderModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }

  static async createInstallment(
    data: InstallmentRequest
  ): Promise<OrderModel> {
    let item = new OrderModel(OrderModel.getDefaultData());

    await this.getInstance()<OrderJson>(`${SERVICE_URL}/createinstallment`, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(data),
    })
      .then((responseData) => {
        item = new OrderModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }

  static async getListByPhone(phone: string): Promise<OrderHistoryCollection> {
    let collection = new OrderHistoryCollection();

    await this.getInstance()<OrderHistoryCollectionJson>(
      `${SERVICE_URL}/byphone/${phone}`,
      {
        method: "GET",
        cache: "no-store",
      }
    )
      .then((responseData) => {
        collection = new OrderHistoryCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }

  static async getDetailByInvoiceId(id: number): Promise<OrderHistoryModel> {
    let item = new OrderHistoryModel(OrderHistoryModel.getDefaultData());

    await this.getInstance()<OrderHistoryJson>(
      `${SERVICE_URL}/byinvoiceid/${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    )
      .then((responseData) => {
        item = new OrderHistoryModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }
}

export default OrderApi;
