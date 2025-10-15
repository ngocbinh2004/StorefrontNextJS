import BaseCollection from "@/common/collections/BaseCollection";
import ProductModel from "@/common/models/ProductModel";
import { ProductCollectionJson, ProductJson } from "@/common/types/Product";

class ProductCollection extends BaseCollection<
  ProductJson,
  ProductModel,
  ProductCollectionJson
> {
  itemsFromJson(jsonItems: ProductJson[]): ProductModel[] {
    return jsonItems.map((item) => new ProductModel(item));
  }
}

export default ProductCollection;
