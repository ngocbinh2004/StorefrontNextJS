import PaymentOnePayModel from "@/common/models/PaymentOnePayModel";
import {
  PaymentOnePayJson,
  PaymentOnePayRequest,
} from "@/common/types/PaymentOnePay";
import { default as BaseApi, default as BaseNextApi } from "./BaseNextApi";
import NextClient from "./NextClient";

const SERVICE_URL = "/next-api/payment";

class PaymentOnePayNextApi extends BaseNextApi {
  static async add(data: PaymentOnePayRequest): Promise<PaymentOnePayModel> {
    let item = new PaymentOnePayModel(PaymentOnePayModel.getDefaultData());

    try {
      const response = await NextClient().post<PaymentOnePayJson>(
        SERVICE_URL + "/onepay/create",
        data
      );

      if (response.hasOwnProperty("data")) {
        item = new PaymentOnePayModel(response.data);
      }
    } catch (error) {
      item.withError(BaseApi.handleError(error));
    }

    return item;
  }
}

export default PaymentOnePayNextApi;
