import BaseApi from "./BaseApi";
import InventoryStockCollection from "@/common/collections/InventoryStockCollection";
import { FetchError } from "ofetch";
import { InventoryStockCollectionJson } from "@/common/types/InventoryStock";

const SERVICE_URL = "/site/inventorystocks";

class InventoryStockApi extends BaseApi {
  static async getItems(
    ids: string,
    from: string
  ): Promise<InventoryStockCollection> {
    let collection = new InventoryStockCollection();

    await this.getInstance()<InventoryStockCollectionJson>(
      `${SERVICE_URL}/productvariant`,
      {
        method: "GET",
        cache: "no-store",
        query: {
          ids,
          from,
        },
      }
    )
      .then((responseData) => {
        collection = new InventoryStockCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }
}

export default InventoryStockApi;
