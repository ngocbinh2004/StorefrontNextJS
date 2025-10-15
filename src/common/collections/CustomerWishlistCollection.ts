import BaseCollection from "./BaseCollection";
import CustomerWishlistModel from "../models/CustomerWishlistModel";
import {
  CustomerWishlistCollectionJson,
  CustomerWishlistJson,
} from "../types/CustomerWishlist";

class CustomerWishlistCollection extends BaseCollection<
  CustomerWishlistJson,
  CustomerWishlistModel,
  CustomerWishlistCollectionJson
> {
  itemsFromJson(jsonItems: CustomerWishlistJson[]): CustomerWishlistModel[] {
    return jsonItems.map((item) => new CustomerWishlistModel(item));
  }
}

export default CustomerWishlistCollection;
