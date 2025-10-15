import InventoryStockCollection from "@/common/collections/InventoryStockCollection";
import { InventoryStockCollectionJson } from "@/common/types/InventoryStock";
import { default as BaseApi, default as BaseNextApi } from "./BaseNextApi";
import NextClient from "./NextClient";

const SERVICE_URL = "/next-api/inventorystock";

class InventoryStockNextApi extends BaseNextApi {
  static async getListProductVariantQuantity(
    ids: string,
    from: string
  ): Promise<InventoryStockCollection> {
    let collection = new InventoryStockCollection();

    try {
      let queryData = {
        params: { ids, from },
      };

      const response = await NextClient().get<InventoryStockCollectionJson>(
        `${SERVICE_URL}/productvariant`,
        queryData
      );

      if (response.hasOwnProperty("data")) {
        collection.fromJson(response.data);
      }
    } catch (error) {
      collection.withError(BaseApi.handleError(error));
    }

    return collection;
  }
}

export default InventoryStockNextApi;
