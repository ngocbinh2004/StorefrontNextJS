import CustomerAddressModel from "@/common/models/CustomerAddressModel";
import {
  FilterCustomerAddress,
  CustomerAddressCollectionJson,
  CustomerAddressJson,
  CustomerAddressJsonAddEdit,
} from "@/common/types/CustomerAddress";
import { default as BaseApi, default as BaseNextApi } from "./BaseNextApi";
import NextClient from "./NextClient";
import CustomerAddressCollection from "@/common/collections/CustomerAddressCollection";

const SERVICE_URL = "/next-api/customeraddress";

class CustomerAddressNextApi extends BaseNextApi {
  static async getItems(
    filters: FilterCustomerAddress
  ): Promise<CustomerAddressCollection> {
    let collection = new CustomerAddressCollection();

    try {
      let queryData = {
        params: filters,
      };

      const response = await NextClient().get<CustomerAddressCollectionJson>(
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

  static async add(
    data: CustomerAddressJsonAddEdit
  ): Promise<CustomerAddressModel> {
    let item = new CustomerAddressModel(CustomerAddressModel.getDefaultData());
    try {
      const response = await NextClient().post<CustomerAddressJson>(
        SERVICE_URL + "/add",
        data
      );
      // console.log("orderAdd response", response);
      if (response.hasOwnProperty("data")) {
        item = new CustomerAddressModel(response.data);
      }
    } catch (error) {
      item.withError(BaseApi.handleError(error));
    }

    return item;
  }

  static async edit(
    data: CustomerAddressJsonAddEdit
  ): Promise<CustomerAddressModel> {
    let item = new CustomerAddressModel(CustomerAddressModel.getDefaultData());
    try {
      const response = await NextClient().put<CustomerAddressJson>(
        `${SERVICE_URL}/edit/${data.id.toString()}`,
        data
      );
      if (response.hasOwnProperty("data")) {
        item = new CustomerAddressModel(response.data);
      }
    } catch (error) {
      item.withError(BaseApi.handleError(error));
    }

    return item;
  }

  static async setAddressesAsDefault(
    id: number
  ): Promise<CustomerAddressModel> {
    let item = new CustomerAddressModel(CustomerAddressModel.getDefaultData());
    try {
      const response = await NextClient().put<CustomerAddressJson>(
        `${SERVICE_URL}/default/${id.toString()}`,
        {}
      );
      if (response.hasOwnProperty("data")) {
        item = new CustomerAddressModel(response.data);
      }
    } catch (error) {
      item.withError(BaseApi.handleError(error));
    }

    return item;
  }

  static async delete(id: number): Promise<string[]> {
    let resultErrors: string[] = [];

    try {
      const response = await NextClient().delete<CustomerAddressJson>(
        `${SERVICE_URL}/delete/${id.toString()}`,
        {}
      );
      console.log("delete response", response);
      if (response.hasOwnProperty("data")) {
        // do notthing
      }
    } catch (error) {
      resultErrors = BaseApi.handleError(error).errors;
    }
    return resultErrors;
  }
}

export default CustomerAddressNextApi;
