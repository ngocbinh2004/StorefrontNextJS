import ProductCardCollection from "@/common/collections/ProductCardCollection";
import ProductModel from "@/common/models/ProductModel";
import {
  FilterProduct,
  FilterRequestBody,
  FilterStringFacet,
  ProductJson,
} from "@/common/types/Product";
import { ProductCardCollectionJson } from "@/common/types/ProductCard";
import { FetchError } from "ofetch";
import BaseApi from "./BaseApi";

const SERVICE_URL = "/site/products";

class ProductApi extends BaseApi {
  static async search(
    filters: FilterProduct,
    requestBody?: FilterRequestBody
  ): Promise<ProductCardCollection> {
    let collection = new ProductCardCollection();

    await this.getInstance()<ProductCardCollectionJson>(
      `${SERVICE_URL}/search`,
      {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify(requestBody),
        query: {
          page: filters.page,
          limit: filters.limit,
          sorter:
            typeof filters.sortby !== "undefined"
              ? filters.sortby.toString()
              : null,
          category_id:
            typeof filters.category_id !== "undefined" &&
            filters.category_id > 0
              ? filters.category_id
              : null,
          ids:
            typeof filters.ids !== "undefined" && filters.ids.length > 0
              ? filters.ids
              : null,
          keyword:
            typeof filters.keyword !== "undefined" && filters.keyword.length > 0
              ? filters.keyword
              : null,
          brand:
            typeof filters.brand !== "undefined" && filters.brand.length > 0
              ? filters.brand
              : null,
          price:
            typeof filters.price !== "undefined" && filters.price.length > 0
              ? filters.price
              : null,
          aggs:
            typeof filters.aggs !== "undefined" && filters.aggs.length > 0
              ? filters.aggs
              : null,
        },
      }
    )
      .then((responseData) => {
        collection = new ProductCardCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }

  static async getByIdList(ids: string): Promise<ProductCardCollection> {
    let collection = new ProductCardCollection();

    await this.getInstance()<ProductCardCollectionJson>(`${SERVICE_URL}/ids`, {
      method: "GET",
      cache: "no-store",
      query: {
        ids: ids,
      },
    })
      .then((responseData) => {
        collection = new ProductCardCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }

  static async getDetailBySlug(slug: string): Promise<ProductModel> {
    let item = new ProductModel(ProductModel.getDefaultData());
    if (slug.endsWith(".html")) {
      slug = slug.slice(0, -5);
    }

    await this.getInstance()<ProductJson>(`${SERVICE_URL}/slug/${slug}`, {
      method: "GET",
      cache: "no-store",
    })
      .then((responseData) => {
        item = new ProductModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }
}

export default ProductApi;
