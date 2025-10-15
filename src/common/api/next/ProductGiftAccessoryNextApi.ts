import ProductGiftAccessoryModel from "@/common/models/ProductGiftAccessoryModel";
import {
  FilterProductGiftAccessory,
  ProductGiftAccessoryJson,
} from "@/common/types/ProductGiftAccessory";
import { default as BaseApi, default as BaseNextApi } from "./BaseNextApi";
import NextClient from "./NextClient";

const SERVICE_URL = "/next-api/productgiftaccessory";

class ProductGiftAccessoryNextApi extends BaseNextApi {
  static async getGiftAccessoryDetail(
    filters: FilterProductGiftAccessory
  ): Promise<ProductGiftAccessoryModel> {
    let item = new ProductGiftAccessoryModel(
      ProductGiftAccessoryModel.getDefaultData()
    );

    try {
      let queryData = {
        params: filters,
      };

      const response = await NextClient().get<ProductGiftAccessoryJson>(
        `${SERVICE_URL}/list`,
        queryData
      );

      if (response.hasOwnProperty("data")) {
        item = new ProductGiftAccessoryModel(response.data);
      }
    } catch (error) {
      item.withError(BaseApi.handleError(error));
    }

    return item;
  }
}

export default ProductGiftAccessoryNextApi;
