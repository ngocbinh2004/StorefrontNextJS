import {
  FilterProductGiftAccessory,
  ProductGiftAccessoryCollectionJson,
  ProductGiftAccessoryJson,
} from "@/common/types/ProductGiftAccessory";
import BaseApi from "./BaseApi";
import ProductGiftAccessoryCollection from "@/common/collections/ProductGiftAccessoryCollection";
import { FetchError } from "ofetch";
import ProductGiftAccessoryModel from "@/common/models/ProductGiftAccessoryModel";

const SERVICE_URL = "/site/productgiftaccessories";

class ProductGiftAccessoryApi extends BaseApi {
  static async getItems(
    filters: FilterProductGiftAccessory
  ): Promise<ProductGiftAccessoryCollection> {
    let collection = new ProductGiftAccessoryCollection();

    await this.getInstance()<ProductGiftAccessoryCollectionJson>(
      `${SERVICE_URL}/${filters.product_id}`,
      {
        method: "GET",
        cache: "no-store",
        query: {
          query: {
            product_id: filters.product_id,
          },
        },
      }
    )
      .then((responseData) => {
        collection = new ProductGiftAccessoryCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }

  static async getGiftAccessory(
    filters: FilterProductGiftAccessory
  ): Promise<ProductGiftAccessoryModel> {
    let item = new ProductGiftAccessoryModel(
      ProductGiftAccessoryModel.getDefaultData()
    );

    await this.getInstance()<ProductGiftAccessoryJson>(
      `${SERVICE_URL}/${filters.product_id}/detail`,
      {
        method: "GET",
        cache: "no-store",
      }
    )
      .then((responseData) => {
        item = new ProductGiftAccessoryModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }
}

export default ProductGiftAccessoryApi;
