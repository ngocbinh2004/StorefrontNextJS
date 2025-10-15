import CustomerWishlistCollection from "@/common/collections/CustomerWishlistCollection";
import CustomerWishlistModel from "@/common/models/CustomerWishlistModel";
import {
  FilterCustomerWishlist,
  CustomerWishlistCollectionJson,
  CustomerWishlistJson,
  CustomerWishlistJsonAdd,
} from "@/common/types/CustomerWishlist";
import { default as BaseApi, default as BaseNextApi } from "./BaseNextApi";
import NextClient from "./NextClient";

const SERVICE_URL = "/next-api/customerwishlist";

class CustomerWishlistNextApi extends BaseNextApi {
  static async getItems(
    filters: FilterCustomerWishlist
  ): Promise<CustomerWishlistCollection> {
    let collection = new CustomerWishlistCollection();

    try {
      let queryData = {
        params: filters,
      };

      const response = await NextClient().get<CustomerWishlistCollectionJson>(
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

  static async getDetailByProductId(
    productId: number
  ): Promise<CustomerWishlistModel> {
    let item = new CustomerWishlistModel(
      CustomerWishlistModel.getDefaultData()
    );
    try {
      const response = await NextClient().get<CustomerWishlistJson>(
        `${SERVICE_URL}/byproductid/${productId.toString()}`,
        {}
      );
      if (response.hasOwnProperty("data")) {
        item = new CustomerWishlistModel(response.data);
      }
    } catch (error) {
      item.withError(BaseApi.handleError(error));
    }

    return item;
  }

  static async addData(
    data: CustomerWishlistJsonAdd
  ): Promise<CustomerWishlistModel> {
    let item = new CustomerWishlistModel(
      CustomerWishlistModel.getDefaultData()
    );

    try {
      const response = await NextClient().post<CustomerWishlistJson>(
        SERVICE_URL + "/add",
        data
      );
      if (response.hasOwnProperty("data")) {
        item = new CustomerWishlistModel(response.data);
      }
    } catch (error) {
      item.withError(BaseApi.handleError(error));
    }

    return item;
  }

  static async deleteData(id: number): Promise<string[]> {
    let resultErrors: string[] = [];

    try {
      const response = await NextClient().delete<CustomerWishlistJson>(
        `${SERVICE_URL}/delete/${id.toString()}`,
        {}
      );
      if (response.hasOwnProperty("data")) {
        // do notthing
      }
    } catch (error) {
      resultErrors = BaseApi.handleError(error).errors;
    }
    return resultErrors;
  }
}

export default CustomerWishlistNextApi;
