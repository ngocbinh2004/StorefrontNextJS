import PageBlockModel from "../models/PageBlockModel";
import { PageBlockCollectionJson, PageBlockJson } from "../types/PageBlock";
import BaseCollection from "./BaseCollection";

class PageBlockCollection extends BaseCollection<
  PageBlockJson,
  PageBlockModel,
  PageBlockCollectionJson
> {
  itemsFromJson(jsonItems: PageBlockJson[]): PageBlockModel[] {
    return jsonItems.map((item) => new PageBlockModel(item));
  }
}

export default PageBlockCollection;
