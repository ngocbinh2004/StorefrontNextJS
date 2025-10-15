import BaseCollection from "@/common/collections/BaseCollection";
import NewsModel from "@/common/models/NewsModel";
import { NewsCollectionJson, NewsJson } from "@/common/types/News";

class NewsCollection extends BaseCollection<
  NewsJson,
  NewsModel,
  NewsCollectionJson
> {
  itemsFromJson(jsonItems: NewsJson[]): NewsModel[] {
    return jsonItems.map((item) => new NewsModel(item));
  }
}

export default NewsCollection;
