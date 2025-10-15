import StoreCollection from "@/common/collections/StoreCollection";
import { StoreCollectionJson } from "@/common/types/Store";
import { FetchError } from "ofetch";
import BaseApi from "./BaseApi";

const SERVICE_URL = "/site/stores";

class StoreApi extends BaseApi {
  static async getAllItems(): Promise<StoreCollection> {
    let collection = new StoreCollection();

    await this.getInstance()<StoreCollectionJson>(SERVICE_URL, {
      method: "GET",
      cache: "no-store",
      query: {
        limit: 1000,
      },
    })
      .then((responseData) => {
        collection = new StoreCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }
}

export default StoreApi;
