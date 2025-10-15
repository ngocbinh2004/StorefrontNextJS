import CustomerModel from "@/common/models/CustomerModel";
import { CustomerJson } from "@/common/types/Customer";
import { FetchError } from "ofetch";
import BaseApi from "./BaseApi";

const SERVICE_URL = "/site/customersessions";

class CustomerSessionApi extends BaseApi {
  static async getCurrentLoggedUserDetail(): Promise<CustomerModel> {
    let item = new CustomerModel(CustomerModel.getDefaultData());

    await this.getInstance()<CustomerJson>(SERVICE_URL + "/me", {
      method: "GET",
      cache: "no-store",
    })
      .then((responseData) => {
        item = new CustomerModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }

  static async logout(): Promise<string[]> {
    let resultErrors: string[] = [];

    await this.getInstance()(SERVICE_URL + "/logout", {
      method: "GET",
      cache: "no-store",
    }).catch((error: FetchError) => {
      resultErrors = BaseApi.handleError(error).errors;
    });

    return resultErrors;
  }
}

export default CustomerSessionApi;
