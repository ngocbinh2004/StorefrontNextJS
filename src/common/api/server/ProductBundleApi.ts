import {
  FilterProductBundle,
  ProductBundleCollectionJson,
  ProductBundleJson,
} from "@/common/types/ProductBundle";
import BaseApi from "./BaseApi";
import ProductBundleCollection from "@/common/collections/ProductBundleCollection";
import { FetchError } from "ofetch";
import ProductBundleModel from "@/common/models/ProductBundleModel";

const SERVICE_URL = "/site/productbundles";

class ProductBundleApi extends BaseApi {
  static async getItems(
    filters: FilterProductBundle
  ): Promise<ProductBundleCollection> {
    let collection = new ProductBundleCollection();

    await this.getInstance()<ProductBundleCollectionJson>(
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
        collection = new ProductBundleCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }

  static async getBundle(
    filters: FilterProductBundle
  ): Promise<ProductBundleModel> {
    let item = new ProductBundleModel(ProductBundleModel.getDefaultData());

    await this.getInstance()<ProductBundleJson>(
      `${SERVICE_URL}/${filters.product_id}/detail`,
      {
        method: "GET",
        cache: "no-store",
      }
    )
      .then((responseData) => {
        item = new ProductBundleModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }
}

export default ProductBundleApi;
