import CustomerCartModel from "@/common/models/CustomerCartModel";
import { CustomerCartJson } from "@/common/types/CustomerCart";
import {
  AddToCartRequest,
  CartItemEditRequest,
} from "@/common/types/CustomerCart";
import { cookies } from "next/headers";
import { FetchError } from "ofetch";
import BaseApi from "./BaseApi";

const SERVICE_URL = "/site/customercarts";

class CustomerCartApi extends BaseApi {
  static async getDetail(): Promise<CustomerCartModel> {
    const cookieStore = cookies();
    const cartUuid =
      cookieStore.get(process.env.NEXT_PUBLIC_SHOPPING_CART_COOKIE_NAME || "")
        ?.value || "";

    // empty cart
    let item = new CustomerCartModel({
      ...CustomerCartModel.getDefaultData(),
      uuid: cartUuid,
    });

    //only fetch cart detail via api if found cart UUID
    if (cartUuid.length > 0) {
      await this.getInstance()<CustomerCartJson>(`${SERVICE_URL}/${cartUuid}`, {
        method: "GET",
        cache: "no-store",
      })
        .then((responseData) => {
          item = new CustomerCartModel(responseData);
        })
        .catch((error: FetchError) => {
          item.withError(BaseApi.handleError(error));
        });
    }

    return item;
  }

  static async initCart(
    clientIp: string | null,
    data: AddToCartRequest[],
    section: string
  ): Promise<CustomerCartModel> {
    let item = new CustomerCartModel(CustomerCartModel.getDefaultData());
    await this.getInstance()<CustomerCartJson>(`${SERVICE_URL}`, {
      method: "POST",
      cache: "no-store",
      body: {
        section: section,
        ip_address: clientIp,
        data,
      },
    })
      .then((responseData) => {
        item = new CustomerCartModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }

  static async addToCart(
    cartUuid: string,
    data: AddToCartRequest
  ): Promise<CustomerCartModel> {
    let item = new CustomerCartModel(CustomerCartModel.getDefaultData());
    await this.getInstance()<CustomerCartJson>(
      `${SERVICE_URL}/${cartUuid}/additem`,
      {
        method: "PUT",
        cache: "no-store",
        body: data,
      }
    )
      .then((responseData) => {
        item = new CustomerCartModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }

  static async editCartItem(
    cartUuid: string,
    data: CartItemEditRequest
  ): Promise<CustomerCartModel> {
    let item = new CustomerCartModel(CustomerCartModel.getDefaultData());
    await this.getInstance()<CustomerCartJson>(
      `${SERVICE_URL}/${cartUuid}/edititem`,
      {
        method: "PUT",
        cache: "no-store",
        body: data,
      }
    )
      .then((responseData) => {
        item = new CustomerCartModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }

  static async finishCart(
    cartUuid: string,
    orderId: string
  ): Promise<string[]> {
    let errors: string[] = [];

    await this.getInstance()(`${SERVICE_URL}/${cartUuid}/finish`, {
      method: "PUT",
      cache: "no-store",
      body: {
        sale_order_id: orderId,
      },
    })
      .then(() => {
        //nothing
      })
      .catch((error: FetchError) => {
        errors = BaseApi.handleError(error).errors;
      });

    return errors;
  }
}

export default CustomerCartApi;
