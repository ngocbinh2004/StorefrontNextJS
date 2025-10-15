import PromotionCodeResultModel from "@/common/models/PromotionCodeResultModel";
import {
  PromotionCodeCheckRequest,
  PromotionCodeResultJson,
} from "@/common/types/PromotionCode";
import { FetchError } from "ofetch";
import BaseApi from "./BaseApi";

const SERVICE_URL = "/site/promotioncodes";

class PromotionCodeApi extends BaseApi {
  static async check(
    data: PromotionCodeCheckRequest
  ): Promise<PromotionCodeResultModel> {
    let item = new PromotionCodeResultModel(
      PromotionCodeResultModel.getDefaultData()
    );

    await this.getInstance()<PromotionCodeResultJson>(`${SERVICE_URL}/check`, {
      method: "POST",
      cache: "no-store",
      body: data,
    })
      .then((responseData) => {
        item = new PromotionCodeResultModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }
}

export default PromotionCodeApi;
