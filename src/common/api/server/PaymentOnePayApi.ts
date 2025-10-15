import PaymentOnePayModel from "@/common/models/PaymentOnePayModel";
import {
  PaymentOnePayJson,
  PaymentOnePayRequest,
} from "@/common/types/PaymentOnePay";
import { FetchError } from "ofetch";
import BaseApi from "./BaseApi";

const SERVICE_URL = "/site/onepaygateways";

class PaymentOnePayApi extends BaseApi {
  static async add(data: PaymentOnePayRequest): Promise<PaymentOnePayModel> {
    let item = new PaymentOnePayModel(PaymentOnePayModel.getDefaultData());
    await this.getInstance()<PaymentOnePayJson>(`${SERVICE_URL}/create`, {
      method: "POST",
      cache: "no-store",
      body: data,
    })
      .then((responseData) => {
        item = new PaymentOnePayModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }
}

export default PaymentOnePayApi;
