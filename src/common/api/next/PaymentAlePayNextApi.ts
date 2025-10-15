import PaymentAlePayCollection from "@/common/collections/PaymentAlePayCollection";
import { default as BaseApi, default as BaseNextApi } from "./BaseNextApi";
import NextClient from "./NextClient";
import InstallmentAlePayCollection from "@/common/collections/InstallmentAlePayCollection";
import { PaymentAlePayResponse } from "@/common/types/PaymentAlePay";

const SERVICE_URL = "/next-api/payment";

class PaymentAlePayNextApi extends BaseNextApi {
  static async banklist(): Promise<PaymentAlePayCollection> {
    let collection = new PaymentAlePayCollection();

    try {
      const response = await NextClient().get<PaymentAlePayCollection>(
        `${SERVICE_URL}/alepay/list`
      );

      if (response.hasOwnProperty("data")) {
        collection.fromJson(response.data);
      }
    } catch (error) {
      collection.withError(BaseApi.handleError(error));
    }

    return collection;
  }

  static async installment(
    amount: number
  ): Promise<InstallmentAlePayCollection> {
    let collection = new InstallmentAlePayCollection();

    try {
      const response = await NextClient().get<InstallmentAlePayCollection>(
        `${SERVICE_URL}/alepay/installment`,
        { params: { amount: amount } }
      );

      if (response.hasOwnProperty("data")) {
        collection.fromJson(response.data);
      }
    } catch (error) {
      collection.withError(BaseApi.handleError(error));
    }

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

    try {
      const response = await NextClient().post<PaymentAlePayResponse>(
        `${SERVICE_URL}/alepay/create`,
        { ecom_platform_order_id: ecom_platform_order_id }
      );
      if (response.hasOwnProperty("data")) {
        item = response.data;
      }
    } catch (error) {
      //
    }

    return item;
  }

  // static async getTenorDetail(
  //   filters: FilterPaymentAlePay
  // ): Promise<PaymentAlePayCollection> {
  //   let collection = new PaymentAlePayCollection();

  //   try {
  //     let queryData = {
  //       params: filters,
  //     };

  //     const response = await NextClient().get<PaymentAlePayCollection>(
  //       `${SERVICE_URL}/detail`,
  //       queryData
  //     );

  //     if (response.hasOwnProperty("data")) {
  //       collection.fromJson(response.data);
  //     }
  //   } catch (error) {
  //     collection.withError(BaseApi.handleError(error));
  //   }

  //   return collection;
  // }
}

export default PaymentAlePayNextApi;
