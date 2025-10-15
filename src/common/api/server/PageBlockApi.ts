import { FetchError } from "ofetch";
import BaseApi from "./BaseApi";
import PageBlockModel from "@/common/models/PageBlockModel";
import {
  PageBlockCollectionJson,
  PageBlockJson,
} from "@/common/types/PageBlock";
import PageBlockCollection from "@/common/collections/PageBlockCollection";

const SERVICE_URL = "/site/pageblocks";

class PageBlockApi extends BaseApi {
  static async getItems(): Promise<PageBlockCollection> {
    let collection = new PageBlockCollection();

    await this.getInstance()<PageBlockCollectionJson>(SERVICE_URL, {
      method: "GET",
      cache: "no-store",
      query: {},
    })
      .then((responseData) => {
        collection = new PageBlockCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }

  static async getPageBlockByPageId(
    pageId: number
  ): Promise<PageBlockCollection> {
    let collection = new PageBlockCollection();

    await this.getInstance()<PageBlockCollectionJson>(
      `${SERVICE_URL}/pageid/${pageId}`,
      {
        method: "GET",
        cache: "no-store",
        query: {},
      }
    )
      .then((responseData) => {
        collection = new PageBlockCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }

  static async getPageBlockByGroupIdentifier(
    groupIdentifier: string
  ): Promise<PageBlockCollection> {
    let collection = new PageBlockCollection();

    //get cache
    const key = `page-block-groupidentifier-${groupIdentifier}`;
    const data = await this.cacheGet(key);
    if (data.length > 0) {
      collection = new PageBlockCollection(JSON.parse(data));
    } else {
      await this.getInstance()<PageBlockCollectionJson>(
        `${SERVICE_URL}/groupidentifier/${groupIdentifier}`
      )
        .then((responseData) => {
          collection = new PageBlockCollection(responseData);

          //store cache data
          this.cacheSet(key, JSON.stringify(responseData));
        })
        .catch((error: FetchError) => {
          collection.withError(BaseApi.handleError(error));
        });
    }

    return collection;
  }

  static async getDetailByIdentifier(
    identifier: string
  ): Promise<PageBlockModel> {
    let item = new PageBlockModel(PageBlockModel.getDefaultData());

    //get cache
    const key = `page-block-identifier-${identifier}`;
    const data = await this.cacheGet(key);
    if (data.length > 0) {
      item = new PageBlockModel(JSON.parse(data));
    }

    if (item.id === 0) {
      await this.getInstance()<PageBlockJson>(
        `${SERVICE_URL}/identifier/${identifier}`
      )
        .then((responseData) => {
          item = new PageBlockModel(responseData);

          //store cache data
          this.cacheSet(key, JSON.stringify(responseData));
        })
        .catch((error: FetchError) => {
          item.withError(BaseApi.handleError(error));
        });
    }

    return item;
  }
}

export default PageBlockApi;
