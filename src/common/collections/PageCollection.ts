import PageModel from "../models/PageModel";
import { PageCollectionJson, PageJson } from "../types/Page";
import BaseCollection from "./BaseCollection";

class PageCollection extends BaseCollection<
  PageJson,
  PageModel,
  PageCollectionJson
> {
  itemsFromJson(jsonItems: PageJson[]): PageModel[] {
    return jsonItems.map((item) => new PageModel(item));
  }
}

export default PageCollection;
