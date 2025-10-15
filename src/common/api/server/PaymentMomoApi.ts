import PaymentMomoModel from "@/common/models/PaymentMomoModel";
import {
  PaymentMomoJson,
  PaymentMomoRequest,
} from "@/common/types/PaymentMomo";
import { FetchError } from "ofetch";
import BaseApi from "./BaseApi";

const SERVICE_URL = "/site/momogateways";

class PaymentMomoApi extends BaseApi {
  static async add(data: PaymentMomoRequest): Promise<PaymentMomoModel> {
    let item = new PaymentMomoModel(PaymentMomoModel.getDefaultData());
    await this.getInstance()<PaymentMomoJson>(`${SERVICE_URL}/create`, {
      method: "POST",
      cache: "no-store",
      body: data,
    })
      .then((responseData) => {
        item = new PaymentMomoModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }
}

export default PaymentMomoApi;
