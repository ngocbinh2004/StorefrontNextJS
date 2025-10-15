import BaseCollection from "@/common/collections/BaseCollection";
import ProductFilterGroupModel from "@/common/models/ProductFilterGroupModel";
import {
  ProductFilterGroupCollectionJson,
  ProductFilterGroupJson,
} from "@/common/types/ProductFilterGroup";

class ProductFilterGroupCollection extends BaseCollection<
  ProductFilterGroupJson,
  ProductFilterGroupModel,
  ProductFilterGroupCollectionJson
> {
  itemsFromJson(
    jsonItems: ProductFilterGroupJson[]
  ): ProductFilterGroupModel[] {
    return jsonItems.map((item) => new ProductFilterGroupModel(item));
  }
}

export default ProductFilterGroupCollection;
