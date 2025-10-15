import BaseCollection from "@/common/collections/BaseCollection";
import ProductGiftAccessoryModel from "@/common/models/ProductGiftAccessoryModel";
import {
  ProductGiftAccessoryCollectionJson,
  ProductGiftAccessoryJson,
} from "@/common/types/ProductGiftAccessory";

class ProductGiftAccessoryCollection extends BaseCollection<
  ProductGiftAccessoryJson,
  ProductGiftAccessoryModel,
  ProductGiftAccessoryCollectionJson
> {
  itemsFromJson(
    jsonItems: ProductGiftAccessoryJson[]
  ): ProductGiftAccessoryModel[] {
    return jsonItems.map((item) => new ProductGiftAccessoryModel(item));
  }
}

export default ProductGiftAccessoryCollection;
