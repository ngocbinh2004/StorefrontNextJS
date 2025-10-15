import NewsCategoryModel from "@/common/models/NewsCategoryModel";
import {
  NewsCategoryCollectionJson,
  NewsCategoryJson,
} from "@/common/types/NewsCategory";
import { FetchError } from "ofetch";
import BaseApi from "./BaseApi";
import NewsCategoryCollection from "@/common/collections/NewsCategoryCollection";

const SERVICE_URL = "/site/newscategories";

class NewsCategoryApi extends BaseApi {
  static async getByParent(parentId: number): Promise<NewsCategoryCollection> {
    let collection = new NewsCategoryCollection();

    await this.getInstance()<NewsCategoryCollectionJson>(
      `${SERVICE_URL}/parent/${parentId}`,
      {
        method: "GET",
        cache: "no-store",
        query: {},
      }
    )
      .then((responseData) => {
        collection = new NewsCategoryCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }

  static async getDataByChild(
    childId: number
  ): Promise<NewsCategoryCollection> {
    let collection = new NewsCategoryCollection();

    await this.getInstance()<NewsCategoryCollectionJson>(
      `${SERVICE_URL}/child/${childId}`,
      {
        method: "GET",
        cache: "no-store",
        query: {},
      }
    )
      .then((responseData) => {
        collection = new NewsCategoryCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }

  static async getDetailBySlug(slug: string): Promise<NewsCategoryModel> {
    let item = new NewsCategoryModel(NewsCategoryModel.getDefaultData());

    await this.getInstance()<NewsCategoryJson>(`${SERVICE_URL}/slug/${slug}`, {
      method: "GET",
      cache: "no-store",
    })
      .then((responseData) => {
        item = new NewsCategoryModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }
}

export default NewsCategoryApi;
