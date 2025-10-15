import {
  ProductCategoryCollectionJson,
  ProductCategoryJson,
} from "@/common/types/ProductCategory";
import BaseApi from "./BaseApi";

const SERVICE_URL = "/site/productcategories";

class ProductCategoryServerApi extends BaseApi {
  static async getAllItems(): Promise<ProductCategoryCollectionJson> {
    const categories = await this.getInstance()<ProductCategoryCollectionJson>(
      SERVICE_URL,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    return categories;
  }

  static async getDetailBySlug(slug: string): Promise<ProductCategoryJson> {
    const foundCategory = await this.getInstance()<ProductCategoryJson>(
      `${SERVICE_URL}/slug/${slug}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    return foundCategory;
  }
}

export default ProductCategoryServerApi;
