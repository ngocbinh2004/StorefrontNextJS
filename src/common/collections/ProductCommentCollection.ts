import BaseCollection from "./BaseCollection";
import ProductCommentModel from "../models/ProductCommentModel";
import {
  ProductCommentCollectionJson,
  ProductCommentJson,
} from "../types/ProductComment";

class ProductCommentCollection extends BaseCollection<
  ProductCommentJson,
  ProductCommentModel,
  ProductCommentCollectionJson
> {
  itemsFromJson(jsonItems: ProductCommentJson[]): ProductCommentModel[] {
    return jsonItems.map((item) => new ProductCommentModel(item));
  }
}

export default ProductCommentCollection;
