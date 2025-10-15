import BaseCollection from "@/common/collections/BaseCollection";
import NewsCategoryModel from "@/common/models/NewsCategoryModel";
import {
  NewsCategoryCollectionJson,
  NewsCategoryJson,
} from "@/common/types/NewsCategory";

class NewsCategoryCollection extends BaseCollection<
  NewsCategoryJson,
  NewsCategoryModel,
  NewsCategoryCollectionJson
> {
  itemsFromJson(jsonItems: NewsCategoryJson[]): NewsCategoryModel[] {
    return jsonItems.map((item) => new NewsCategoryModel(item));
  }
}

export default NewsCategoryCollection;
