import BaseCollection from "@/common/collections/BaseCollection";
import ProductVariantModel from "@/common/models/ProductVariantModel";
import {
  ProductVariantCollectionJson,
  ProductVariantJson,
} from "@/common/types/ProductVariant";

class ProductVariantCollection extends BaseCollection<
  ProductVariantJson,
  ProductVariantModel,
  ProductVariantCollectionJson
> {
  itemsFromJson(jsonItems: ProductVariantJson[]): ProductVariantModel[] {
    return jsonItems.map((item) => new ProductVariantModel(item));
  }
}

export default ProductVariantCollection;
