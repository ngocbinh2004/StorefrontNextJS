import ProductCategoryModel from "@/common/models/ProductCategoryModel";
import {
  ProductCategoryCollectionJson,
  ProductCategoryJson,
} from "@/common/types/ProductCategory";
import { FetchError } from "ofetch";
import BaseApi from "./BaseApi";
import ProductCategoryCollection from "@/common/collections/ProductCategoryCollection";

const SERVICE_URL = "/site/productcategories";

class ProductCategoryApi extends BaseApi {
  static async getByIdList(ids: string): Promise<ProductCategoryCollection> {
    let collection = new ProductCategoryCollection();

    await this.getInstance()<ProductCategoryCollectionJson>(
      `${SERVICE_URL}/ids`,
      {
        method: "GET",
        cache: "no-store",
        query: {
          ids: ids,
        },
      }
    )
      .then((responseData) => {
        collection = new ProductCategoryCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }

  static async getDataByParent(
    parentId: number
  ): Promise<ProductCategoryCollection> {
    let collection = new ProductCategoryCollection();

    await this.getInstance()<ProductCategoryCollectionJson>(
      `${SERVICE_URL}/parent/${parentId}`,
      {
        method: "GET",
        cache: "no-store",
        query: {},
      }
    )
      .then((responseData) => {
        collection = new ProductCategoryCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }

  static async getDataByChild(
    childId: number
  ): Promise<ProductCategoryCollection> {
    let collection = new ProductCategoryCollection();

    await this.getInstance()<ProductCategoryCollectionJson>(
      `${SERVICE_URL}/child/${childId}`,
      {
        method: "GET",
        cache: "no-store",
        query: {},
      }
    )
      .then((responseData) => {
        collection = new ProductCategoryCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }

  static async getDetailBySlug(slug: string): Promise<ProductCategoryModel> {
    let item = new ProductCategoryModel(ProductCategoryModel.getDefaultData());

    //get cache
    const key = `product-category-slug-${slug}`;
    const data = await this.cacheGet(key);
    if (data.length > 0) {
      item = new ProductCategoryModel(JSON.parse(data));
    }

    //cache not found
    if (item.id === 0) {
      await this.getInstance()<ProductCategoryJson>(
        `${SERVICE_URL}/slug/${slug}`
      )
        .then(async (responseData) => {
          item = new ProductCategoryModel(responseData);

          //store cache data
          this.cacheSet(key, JSON.stringify(responseData));
        })
        .catch((error: FetchError) => {
          item.withError(BaseApi.handleError(error));
        });
    }

    return item;
  }

  static async getAttributeCategory(
    category_id: number
  ): Promise<ProductCategoryCollection> {
    let collection = new ProductCategoryCollection();

    await this.getInstance()<ProductCategoryCollectionJson>(
      `${SERVICE_URL}/getattributecategory/${category_id}`,
      {
        method: "GET",
        cache: "no-store",
        query: {},
      }
    )
      .then((responseData) => {
        collection = new ProductCategoryCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }
}

export default ProductCategoryApi;
