import { FetchError } from "ofetch";
import BaseApi from "./BaseApi";
import {
  CustomerAddressJson,
  CustomerAddressJsonAddEdit,
  FilterCustomerAddress,
} from "@/common/types/CustomerAddress";
import CustomerAddressCollection from "@/common/collections/CustomerAddressCollection";
import CustomerAddressModel from "@/common/models/CustomerAddressModel";

const SERVICE_URL = "/site/customeraddresses";

class CustomerAddressApi extends BaseApi {
  static async getItems(
    filters: FilterCustomerAddress
  ): Promise<CustomerAddressCollection> {
    let collection = new CustomerAddressCollection();

    await this.getInstance()<CustomerAddressCollection>(`${SERVICE_URL}`, {
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
        collection = new CustomerAddressCollection(responseData);
        console.log("responseData", responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }

  static async add(
    data: CustomerAddressJsonAddEdit
  ): Promise<CustomerAddressModel> {
    let item = new CustomerAddressModel(CustomerAddressModel.getDefaultData());

    await this.getInstance()<CustomerAddressJson>(`${SERVICE_URL}`, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(data),
    })
      .then((responseData) => {
        item = new CustomerAddressModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }

  static async edit(
    data: CustomerAddressJsonAddEdit
  ): Promise<CustomerAddressModel> {
    let item = new CustomerAddressModel(CustomerAddressModel.getDefaultData());

    await this.getInstance()<CustomerAddressJson>(`${SERVICE_URL}/${data.id}`, {
      method: "PUT",
      cache: "no-store",
      body: JSON.stringify(data),
    })
      .then((responseData) => {
        item = new CustomerAddressModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }

  static async setAddressesAsDefault(
    id: number
  ): Promise<CustomerAddressModel> {
    let item = new CustomerAddressModel(CustomerAddressModel.getDefaultData());

    await this.getInstance()<CustomerAddressJson>(
      `${SERVICE_URL}/default/${id}`,
      {
        method: "PUT",
        cache: "no-store",
      }
    )
      .then((responseData) => {
        item = new CustomerAddressModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }

  static async delete(id: number): Promise<string[]> {
    let resultErrors: string[] = [];

    await this.getInstance()(`${SERVICE_URL}/${id}`, {
      method: "DELETE",
      cache: "no-store",
    })
      .then((responseData) => {
        if (responseData.status !== 204) {
          resultErrors.push("error_delete_response_not_204");
        }
      })
      .catch((error: FetchError) => {
        resultErrors = BaseApi.handleError(error).errors;
      });

    return resultErrors;
  }
}

export default CustomerAddressApi;
