import ShippingPriceCollection from "@/common/collections/ShippingPriceCollection";
import {
  ShippingPriceCheckRequest,
  ShippingPriceCollectionJson,
} from "@/common/types/ShippingPrice";
import { default as BaseApi, default as BaseNextApi } from "./BaseNextApi";
import NextClient from "./NextClient";
import {
  PromotionCodeCheckRequest,
  PromotionCodeResultJson,
} from "@/common/types/PromotionCode";
import PromotionCodeResultModel from "@/common/models/PromotionCodeResultModel";

const SERVICE_URL = "/next-api/checkout";

class CheckoutNextApi extends BaseNextApi {
  static async checkShippingPrice(
    data: ShippingPriceCheckRequest
  ): Promise<ShippingPriceCollection> {
    let collection = new ShippingPriceCollection();
    try {
      const response = await NextClient().post<ShippingPriceCollectionJson>(
        SERVICE_URL + "/checkshippingprice",
        data
      );
      if (response.hasOwnProperty("data")) {
        collection.fromJson(response.data);
      }
    } catch (error) {
      collection.withError(BaseApi.handleError(error));
    }

    return collection;
  }

  static async checkPromotionCode(
    code: string
  ): Promise<PromotionCodeResultModel> {
    let item = new PromotionCodeResultModel(
      PromotionCodeResultModel.getDefaultData()
    );
    try {
      const response = await NextClient().post<PromotionCodeResultJson>(
        SERVICE_URL + "/checkpromotioncode",
        { code }
      );
      if (response.hasOwnProperty("data")) {
        item = new PromotionCodeResultModel(response.data);
      }
    } catch (error) {
      item.withError(BaseApi.handleError(error));
    }

    return item;
  }
}

export default CheckoutNextApi;
