import BaseApi from "./BaseApi";
import {
  FilterProductVariant,
  ProductVariantCollectionJson,
  ProductVariantJson,
} from "@/common/types/ProductVariant";
import ProductVariantCollection from "@/common/collections/ProductVariantCollection";
import { FetchError } from "ofetch";
import ProductVariantModel from "@/common/models/ProductVariantModel";

const SERVICE_URL = "/site/productvariants";

class ProductVariantApi extends BaseApi {
  static async getItems(
    filters: FilterProductVariant
  ): Promise<ProductVariantCollection> {
    let collection = new ProductVariantCollection();

    await this.getInstance()<ProductVariantCollectionJson>(SERVICE_URL, {
      method: "GET",
      cache: "no-store",
      query: {
        page: filters.page,
        limit: filters.limit,
        sort_by: filters.sortby,
        sort_type: filters.sorttype,
        product_id:
          typeof filters.product_id !== "undefined" && filters.product_id > 0
            ? filters.product_id
            : null,
        ids:
          typeof filters.ids !== "undefined" && filters.ids.length > 0
            ? filters.ids
            : null,
      },
    })
      .then((responseData) => {
        collection = new ProductVariantCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }

  static async getDetailBySlug(slug: string): Promise<ProductVariantModel> {
    let item = new ProductVariantModel(ProductVariantModel.getDefaultData());

    await this.getInstance()<ProductVariantJson>(
      `${SERVICE_URL}/slug/${slug}`,
      {
        method: "GET",
        cache: "no-store",
      }
    )
      .then((responseData) => {
        item = new ProductVariantModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }
}

export default ProductVariantApi;
