import ProductCommentModel from "@/common/models/ProductCommentModel";
import {
  ProductCommentJson,
  ProductCommentRequest,
} from "@/common/types/ProductComment";
import { default as BaseApi, default as BaseNextApi } from "./BaseNextApi";
import NextClient from "./NextClient";

const SERVICE_URL = "/next-api/productcomment";

class ProductCommentNextApi extends BaseNextApi {
  static async add(data: ProductCommentRequest): Promise<ProductCommentModel> {
    let item = new ProductCommentModel(ProductCommentModel.getDefaultData());

    try {
      const response = await NextClient().post<ProductCommentJson>(
        SERVICE_URL + "/add",
        data
      );

      if (response.hasOwnProperty("data")) {
        item = new ProductCommentModel(response.data);
      }
    } catch (error) {
      item.withError(BaseApi.handleError(error));
    }

    return item;
  }
}

export default ProductCommentNextApi;
