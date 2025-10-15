import { FetchError } from "ofetch";
import BaseApi from "./BaseApi";
import PaymentAlePayCollection from "@/common/collections/PaymentAlePayCollection";
import InstallmentAlePayCollection from "@/common/collections/InstallmentAlePayCollection";
import { PaymentAlePayResponse } from "@/common/types/PaymentAlePay";

const SERVICE_URL = "/site/alepaygateways";

class PaymentAlePayApi extends BaseApi {
  static async getBankList(): Promise<PaymentAlePayCollection> {
    let collection = new PaymentAlePayCollection();

    await this.getInstance()<PaymentAlePayCollection>(
      `${SERVICE_URL}/banklist`,
      {
        method: "GET",
        cache: "no-store",
      }
    )
      .then((responseData) => {
        collection = new PaymentAlePayCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }

  static async getInstallment(
    amount: number
  ): Promise<InstallmentAlePayCollection> {
    let collection = new InstallmentAlePayCollection();

    await this.getInstance()<InstallmentAlePayCollection>(
      `${SERVICE_URL}/installment`,
      {
        method: "GET",
        cache: "no-store",
        query: { amount: amount },
      }
    )
      .then((responseData) => {
        collection = new InstallmentAlePayCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }

  static async create(
    ecom_platform_order_id: string
  ): Promise<PaymentAlePayResponse> {
    let item: PaymentAlePayResponse = {
      code: "",
      message: "",
      checkoutUrl: "",
    };

    await this.getInstance()<PaymentAlePayResponse>(`${SERVICE_URL}/create`, {
      method: "POST",
      cache: "no-store",
      body: { ecom_platform_order_id: ecom_platform_order_id },
    })
      .then((responseData) => {
        item = responseData;
      })
      .catch((error: FetchError) => {});

    return item;
  }
}

export default PaymentAlePayApi;
