import BaseCollection from "@/common/collections/BaseCollection";
import ProductCategoryModel from "@/common/models/ProductCategoryModel";
import {
  ProductCategoryCollectionJson,
  ProductCategoryJson,
} from "@/common/types/ProductCategory";

class ProductCategoryCollection extends BaseCollection<
  ProductCategoryJson,
  ProductCategoryModel,
  ProductCategoryCollectionJson
> {
  itemsFromJson(jsonItems: ProductCategoryJson[]): ProductCategoryModel[] {
    return jsonItems.map((item) => new ProductCategoryModel(item));
  }
}

export default ProductCategoryCollection;
