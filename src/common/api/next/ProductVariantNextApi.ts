import { FilterProductVariant } from "@/common/types/ProductVariant";
import { default as BaseApi, default as BaseNextApi } from "./BaseNextApi";
import NextClient from "./NextClient";
import ProductVariantCollection from "@/common/collections/ProductVariantCollection";

const SERVICE_URL = "/next-api/productvariant";

class ProductVariantNextApi extends BaseNextApi {
  static async getItems(
    filters: FilterProductVariant
  ): Promise<ProductVariantCollection> {
    let collection = new ProductVariantCollection();

    try {
      let queryData = {
        params: filters,
      };

      const response = await NextClient().get<ProductVariantCollection>(
        `${SERVICE_URL}/list`,
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

export default ProductVariantNextApi;
