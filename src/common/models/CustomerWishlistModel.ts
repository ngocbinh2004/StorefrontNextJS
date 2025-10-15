import { BaseModelJson } from "../interfaces/BaseModelJson";
import { CustomerWishlistJson } from "../types/CustomerWishlist";

import BaseModel from "./BaseModel";

class CustomerWishlistModel
  extends BaseModel
  implements BaseModelJson<CustomerWishlistJson>
{
  id: number;
  product_id: number;
  from: number;

  constructor(json: CustomerWishlistJson) {
    super();

    this.id = json.id || 0;
    this.product_id = json.product_id || 0;
    this.from = json.from || 0;
  }

  static getDefaultData(): CustomerWishlistJson {
    return {
      id: 0,
      product_id: 0,
      from: 0,
    };
  }

  toJson(): CustomerWishlistJson {
    return {
      id: this.id,
      product_id: this.product_id,
      from: this.from,
    };
  }
}

export default CustomerWishlistModel;
