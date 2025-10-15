import BaseCollection from "@/common/collections/BaseCollection";
import ProductCardModel from "@/common/models/ProductCardModel";
import {
  ProductCardCollectionJson,
  ProductCardJson,
} from "@/common/types/ProductCard";

class ProductCardCollection extends BaseCollection<
  ProductCardJson,
  ProductCardModel,
  ProductCardCollectionJson
> {
  itemsFromJson(jsonItems: ProductCardJson[]): ProductCardModel[] {
    return jsonItems.map((item) => new ProductCardModel(item));
  }
}

export default ProductCardCollection;
