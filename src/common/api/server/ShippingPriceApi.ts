import BaseApi from "./BaseApi";
import {
  ShippingPriceCheckRequest,
  ShippingPriceCollectionJson,
} from "@/common/types/ShippingPrice";
import ShippingPriceCollection from "@/common/collections/ShippingPriceCollection";
import { FetchError } from "ofetch";

const SERVICE_URL = "/site/shippingprices";

class ShippingPriceApi extends BaseApi {
  static async check(
    data: ShippingPriceCheckRequest
  ): Promise<ShippingPriceCollection> {
    let collection = new ShippingPriceCollection();

    await this.getInstance()<ShippingPriceCollectionJson>(SERVICE_URL, {
      method: "GET",
      cache: "no-store",
      query: data,
    })
      .then((responseData) => {
        collection = new ShippingPriceCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }
}

export default ShippingPriceApi;
