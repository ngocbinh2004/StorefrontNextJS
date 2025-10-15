import { BaseCollectionJson } from "./BaseCollection";
import { Filter } from "./Filter";

type CustomerWishlistJsonAdd = {
  product_id: number;
  from: number;
};

type CustomerWishlistJsonDelete = {
  id: number;
};

type CustomerWishlistJson = CustomerWishlistJsonAdd &
  CustomerWishlistJsonDelete;

type CustomerWishlistCollectionJson = BaseCollectionJson<CustomerWishlistJson>;

type FilterCustomerWishlist = Filter & {};

export type {
  CustomerWishlistJsonAdd,
  CustomerWishlistJson,
  CustomerWishlistCollectionJson,
  FilterCustomerWishlist,
  CustomerWishlistJsonDelete,
};
