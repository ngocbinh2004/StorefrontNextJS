import CustomerWishlistCollection from "@/common/collections/CustomerWishlistCollection";
import CustomerWishlistModel from "@/common/models/CustomerWishlistModel";
import {
  FilterCustomerWishlist,
  CustomerWishlistCollectionJson,
  CustomerWishlistJson,
  CustomerWishlistJsonAdd,
} from "@/common/types/CustomerWishlist";
import { FetchError } from "ofetch";
import BaseApi from "./BaseApi";

const SERVICE_URL = "/site/customerwishlists";

class CustomerWishlistApi extends BaseApi {
  static async getItems(
    filters: FilterCustomerWishlist
  ): Promise<CustomerWishlistCollection> {
    let collection = new CustomerWishlistCollection();

    await this.getInstance()<CustomerWishlistCollectionJson>(SERVICE_URL, {
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
        collection = new CustomerWishlistCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }

  static async getDetailByProductId(
    productId: number
  ): Promise<CustomerWishlistModel> {
    let item = new CustomerWishlistModel(
      CustomerWishlistModel.getDefaultData()
    );

    await this.getInstance()<CustomerWishlistJson>(
      `${SERVICE_URL}/productid/${productId}`,
      {
        method: "GET",
        cache: "no-store",
      }
    )
      .then((responseData) => {
        item = new CustomerWishlistModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }

  static async addData(
    data: CustomerWishlistJsonAdd
  ): Promise<CustomerWishlistModel> {
    let item = new CustomerWishlistModel(
      CustomerWishlistModel.getDefaultData()
    );
    await this.getInstance()<CustomerWishlistJson>(`${SERVICE_URL}`, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(data),
    })
      .then((responseData) => {
        item = new CustomerWishlistModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }

  static async deleteData(id: number): Promise<string[]> {
    let resultErrors: string[] = [];

    await this.getInstance()(`${SERVICE_URL}/${id}`, {
      method: "DELETE",
      cache: "no-store",
    })
      .then((responseData) => {
        // do not thing
        // if (responseData.status !== 204) {
        //   resultErrors.push("error_delete_response_not_204");
        // }
      })
      .catch((error: FetchError) => {
        resultErrors = BaseApi.handleError(error).errors;
      });

    return resultErrors;
  }
}

export default CustomerWishlistApi;
