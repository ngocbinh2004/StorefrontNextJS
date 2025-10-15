import ProductRatingModel from "@/common/models/ProductRatingModel";
import {
  ProductRatingJson,
  AddProductRatingRequest,
} from "@/common/types/ProductRating";
import { default as BaseApi, default as BaseNextApi } from "./BaseNextApi";
import NextClient from "./NextClient";
import ProductAvgRatingModel from "@/common/models/ProductAvgRatingModel";
import { ProductAvgRatingJson } from "@/common/types/ProductAvgRating";

const SERVICE_URL = "/next-api/productrating";

class ProductRatingNextApi extends BaseNextApi {
  static async add(data: AddProductRatingRequest): Promise<ProductRatingModel> {
    let item = new ProductRatingModel(ProductRatingModel.getDefaultData());

    try {
      const response = await NextClient().post<ProductRatingJson>(
        SERVICE_URL + "/add",
        data
      );

      if (response.hasOwnProperty("data")) {
        item = new ProductRatingModel(response.data);
      }
    } catch (error) {
      item.withError(BaseApi.handleError(error));
    }

    return item;
  }

  static async getAvgRating(
    product_id: number
  ): Promise<ProductAvgRatingModel> {
    let item = new ProductAvgRatingModel(
      ProductAvgRatingModel.getDefaultData()
    );

    try {
      const response = await NextClient().get<ProductAvgRatingJson>(
        SERVICE_URL + "/average/" + product_id
      );

      if (response.hasOwnProperty("data")) {
        item = new ProductAvgRatingModel(response.data);
      }
    } catch (error) {
      item.withError(BaseApi.handleError(error));
    }

    return item;
  }
}

export default ProductRatingNextApi;
