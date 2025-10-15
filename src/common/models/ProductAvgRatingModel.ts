import { BaseModelJson } from "../interfaces/BaseModelJson";
import { ProductAvgRatingJson } from "../types/ProductAvgRating";

import BaseModel from "./BaseModel";

class ProductAvgRatingModel
  extends BaseModel
  implements BaseModelJson<ProductAvgRatingJson>
{
  total_rating: number;
  avg_rating: number;
  details: any[];

  constructor(json: ProductAvgRatingJson) {
    super();

    this.total_rating = json.total_rating || 0;
    this.avg_rating = json.avg_rating || 0;
    this.details = json.details || [];
  }

  static getDefaultData(): ProductAvgRatingJson {
    return {
      total_rating: 0,
      avg_rating: 0,
      details: [],
    };
  }

  toJson(): ProductAvgRatingJson {
    return {
      total_rating: this.total_rating,
      avg_rating: this.avg_rating,
      details: this.details,
    };
  }
}

export default ProductAvgRatingModel;
