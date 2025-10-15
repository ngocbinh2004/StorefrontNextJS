import BaseCollection from "@/common/collections/BaseCollection";
import ProductBundleModel from "@/common/models/ProductBundleModel";
import {
  ProductBundleCollectionJson,
  ProductBundleJson,
} from "@/common/types/ProductBundle";

class ProductBundleCollection extends BaseCollection<
  ProductBundleJson,
  ProductBundleModel,
  ProductBundleCollectionJson
> {
  itemsFromJson(jsonItems: ProductBundleJson[]): ProductBundleModel[] {
    return jsonItems.map((item) => new ProductBundleModel(item));
  }
}

export default ProductBundleCollection;
