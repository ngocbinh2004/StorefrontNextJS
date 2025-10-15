import CustomerCartModel from "@/common/models/CustomerCartModel";
import {
  AddToCartRequest,
  CartItemEditRequest,
  CustomerCartJson,
} from "@/common/types/CustomerCart";
import { default as BaseApi, default as BaseNextApi } from "./BaseNextApi";
import NextClient from "./NextClient";

const SERVICE_URL = "/next-api/cart";

class CartNextApi extends BaseNextApi {
  static async getDetail(): Promise<CustomerCartModel> {
    let item = new CustomerCartModel(CustomerCartModel.getDefaultData());
    try {
      const response = await NextClient().get<CustomerCartJson>(
        SERVICE_URL + "/detail"
      );
      if (response.hasOwnProperty("data")) {
        item = new CustomerCartModel(response.data);
      }
    } catch (error) {
      item.withError(BaseApi.handleError(error));
    }

    return item;
  }

  static async addToCart(data: AddToCartRequest): Promise<CustomerCartModel> {
    let item = new CustomerCartModel(CustomerCartModel.getDefaultData());
    try {
      const response = await NextClient().post<CustomerCartJson>(
        SERVICE_URL + "/addtocart",
        data
      );
      if (response.hasOwnProperty("data")) {
        item = new CustomerCartModel(response.data);
      }
    } catch (error) {
      item.withError(BaseApi.handleError(error));
    }

    return item;
  }

  static async editCartItem(
    data: CartItemEditRequest
  ): Promise<CustomerCartModel> {
    let item = new CustomerCartModel(CustomerCartModel.getDefaultData());
    try {
      const response = await NextClient().post<CustomerCartJson>(
        SERVICE_URL + "/editcartitem",
        data
      );
      if (response.hasOwnProperty("data")) {
        item = new CustomerCartModel(response.data);
      }
    } catch (error) {
      item.withError(BaseApi.handleError(error));
    }

    return item;
  }
}

export default CartNextApi;
