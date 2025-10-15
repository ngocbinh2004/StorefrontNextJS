import BaseCollection from "@/common/collections/BaseCollection";
import AttributeCategoryModel from "@/common/models/AttributeCategoryModel";
import {
  AttributeCategoryCollectionJson,
  AttributeCategoryJson,
} from "@/common/types/AttributeCategory";

class AttributeCategoryCollection extends BaseCollection<
  AttributeCategoryJson,
  AttributeCategoryModel,
  AttributeCategoryCollectionJson
> {
  itemsFromJson(jsonItems: AttributeCategoryJson[]): AttributeCategoryModel[] {
    return jsonItems.map((item) => new AttributeCategoryModel(item));
  }
}

export default AttributeCategoryCollection;
