import { Filter } from "@/common/types/Filter";
import BaseApi from "./BaseApi";
import { ProductCollectionJson, ProductJson } from "@/common/types/Product";

const SERVICE_URL = "/site/products";

class ProductServerApi extends BaseApi {
  //will remove SOOON
  static async getItems(
    filters: Filter & { category_id?: number }
  ): Promise<ProductCollectionJson> {
    const buildURLQuery = (filters: Filter) =>
      Object.entries(filters)
        .map((pair) => pair.map(encodeURIComponent).join("="))
        .join("&");

    const Products = await this.getInstance()<ProductCollectionJson>(
      `${SERVICE_URL}/search?${buildURLQuery(filters)}`,
      {
        method: "POST",
        cache: "no-store",
      }
    );

    return Products;
  }

  static async getDetailBySlug(slug: string | number): Promise<ProductJson> {
    const foundProduct = await this.getInstance()<ProductJson>(
      `${SERVICE_URL}/slug/${slug}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    return foundProduct;
  }
}

export default ProductServerApi;
