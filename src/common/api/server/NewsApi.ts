import NewsCollection from "@/common/collections/NewsCollection";
import NewsModel from "@/common/models/NewsModel";
import { FilterNews, NewsJson } from "@/common/types/News";
import { NewsCollectionJson } from "@/common/types/News";
import { FetchError } from "ofetch";
import BaseApi from "./BaseApi";

const SERVICE_URL = "/site/news";

class NewsApi extends BaseApi {
  static async getItems(filters: FilterNews): Promise<NewsCollection> {
    let collection = new NewsCollection();

    await this.getInstance()<NewsCollectionJson>(SERVICE_URL, {
      method: "GET",
      cache: "no-store",
      query: {
        page: filters.page,
        limit: filters.limit,
        sort_by: filters.sortby,
        sort_type: filters.sorttype,
        category_id: filters.category_id,
      },
    })
      .then((responseData) => {
        collection = new NewsCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }

  static async getDetailBySlug(slug: string): Promise<NewsModel> {
    let item = new NewsModel(NewsModel.getDefaultData());
    await this.getInstance()<NewsJson>(`${SERVICE_URL}/slug/${slug}`, {
      method: "GET",
      cache: "no-store",
    })
      .then((responseData) => {
        item = new NewsModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }
}

export default NewsApi;
