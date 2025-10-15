import ProductCategoryCollection from "@/common/collections/ProductCategoryCollection";
import { default as BaseApi, default as BaseNextApi } from "./BaseNextApi";
import NextClient from "./NextClient";

const SERVICE_URL = "/next-api/productcategory";

class ProductCategoryNextApi extends BaseNextApi {
  static async getAttributeCategory(
    category_id: number
  ): Promise<ProductCategoryCollection> {
    let collection = new ProductCategoryCollection();

    try {
      const response = await NextClient().get<ProductCategoryCollection>(
        SERVICE_URL + "/attributecategory",
        {
          params: { category_id: category_id },
        }
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

export default ProductCategoryNextApi;
