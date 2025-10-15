import ProductCardCollection from "@/common/collections/ProductCardCollection";
import { FilterProduct, FilterStringFacet } from "@/common/types/Product";
import { default as BaseApi, default as BaseNextApi } from "./BaseNextApi";
import NextClient from "./NextClient";
import { ProductCardCollectionJson } from "@/common/types/ProductCard";

const SERVICE_URL = "/next-api/product";

class ProductNextApi extends BaseNextApi {
  static async search(
    filters: FilterProduct,
    string_facet: FilterStringFacet[],
  ): Promise<ProductCardCollection> {
    let collection = new ProductCardCollection();

    try {
      let queryData = {
        params: filters,
      };

      let data = {
        string_facet: string_facet,
      };

      const response = await NextClient().post<ProductCardCollection>(
        `${SERVICE_URL}/search`,
        data,
        queryData,
      );

      if (response.hasOwnProperty("data")) {
        collection.fromJson(response.data);
      }
    } catch (error) {
      collection.withError(BaseApi.handleError(error));
    }

    return collection;
  }

  static async getByIdList(ids: string): Promise<ProductCardCollection> {
    let collection = new ProductCardCollection();

    try {
      let queryData = {
        params: {
          ids: ids,
        },
      };

      const response = await NextClient().get<ProductCardCollectionJson>(
        `${SERVICE_URL}/byidlist`,
        queryData,
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

export default ProductNextApi;
