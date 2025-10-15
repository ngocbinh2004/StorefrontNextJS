import BaseApi from "./BaseApi";
import {
  FilterProductRating,
  ProductRatingCollectionJson,
  ProductRatingJson,
  AddProductRatingRequest,
} from "@/common/types/ProductRating";
import ProductRatingCollection from "@/common/collections/ProductRatingCollection";
import { FetchError } from "ofetch";
import ProductRatingModel from "@/common/models/ProductRatingModel";
import ProductAvgRatingModel from "@/common/models/ProductAvgRatingModel";
import { ProductAvgRatingJson } from "@/common/types/ProductAvgRating";

const SERVICE_URL = "/site/productratings";

class ProductRatingApi extends BaseApi {
  static async getItems(
    filters: FilterProductRating
  ): Promise<ProductRatingCollection> {
    let collection = new ProductRatingCollection();

    await this.getInstance()<ProductRatingCollectionJson>(
      `${SERVICE_URL}/${filters.product_id}`,
      {
        method: "GET",
        cache: "no-store",
        query: {
          query: {
            page: filters.page,
            limit: filters.limit,
            sort_by: filters.sortby,
            sort_type: filters.sorttype,
            product_id: filters.product_id,
          },
        },
      }
    )
      .then((responseData) => {
        collection = new ProductRatingCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }

  static async add(
    product_id: number,
    data: AddProductRatingRequest
  ): Promise<ProductRatingModel> {
    let item = new ProductRatingModel(ProductRatingModel.getDefaultData());
    await this.getInstance()<ProductRatingJson>(
      `${SERVICE_URL}/${product_id}`,
      {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify(data),
      }
    )
      .then((responseData) => {
        item = new ProductRatingModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }

  static async getAvgRating(
    product_id: number
  ): Promise<ProductAvgRatingModel> {
    let item = new ProductAvgRatingModel(
      ProductAvgRatingModel.getDefaultData()
    );

    await this.getInstance()<ProductAvgRatingJson>(
      `${SERVICE_URL}/${product_id}/avgrating`,
      {
        method: "GET",
        cache: "no-store",
      }
    )
      .then((responseData) => {
        item = new ProductAvgRatingModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }
}

export default ProductRatingApi;
