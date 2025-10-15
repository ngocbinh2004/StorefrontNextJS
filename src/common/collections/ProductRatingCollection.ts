import BaseCollection from "./BaseCollection";
import ProductRatingModel from "../models/ProductRatingModel";
import {
  ProductRatingCollectionJson,
  ProductRatingJson,
} from "../types/ProductRating";

class ProductRatingCollection extends BaseCollection<
  ProductRatingJson,
  ProductRatingModel,
  ProductRatingCollectionJson
> {
  itemsFromJson(jsonItems: ProductRatingJson[]): ProductRatingModel[] {
    return jsonItems.map((item) => new ProductRatingModel(item));
  }
}

export default ProductRatingCollection;
