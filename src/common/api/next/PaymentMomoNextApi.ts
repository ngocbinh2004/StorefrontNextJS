import PaymentMomoModel from "@/common/models/PaymentMomoModel";
import {
  PaymentMomoJson,
  PaymentMomoRequest,
} from "@/common/types/PaymentMomo";
import { default as BaseApi, default as BaseNextApi } from "./BaseNextApi";
import NextClient from "./NextClient";

const SERVICE_URL = "/next-api/payment";

class PaymentMomoNextApi extends BaseNextApi {
  static async add(data: PaymentMomoRequest): Promise<PaymentMomoModel> {
    let item = new PaymentMomoModel(PaymentMomoModel.getDefaultData());

    try {
      const response = await NextClient().post<PaymentMomoJson>(
        SERVICE_URL + "/momo/create",
        data
      );

      if (response.hasOwnProperty("data")) {
        item = new PaymentMomoModel(response.data);
      }
    } catch (error) {
      item.withError(BaseApi.handleError(error));
    }

    return item;
  }
}

export default PaymentMomoNextApi;
