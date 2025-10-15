import ProductBundleModel from "@/common/models/ProductBundleModel";
import {
  FilterProductBundle,
  ProductBundleJson,
} from "@/common/types/ProductBundle";
import { default as BaseApi, default as BaseNextApi } from "./BaseNextApi";
import NextClient from "./NextClient";

const SERVICE_URL = "/next-api/productbundle";

class ProductBundleNextApi extends BaseNextApi {
  static async getBundelDetail(
    filters: FilterProductBundle
  ): Promise<ProductBundleModel> {
    let item = new ProductBundleModel(ProductBundleModel.getDefaultData());

    try {
      let queryData = {
        params: filters,
      };

      const response = await NextClient().get<ProductBundleJson>(
        `${SERVICE_URL}/list`,
        queryData
      );

      if (response.hasOwnProperty("data")) {
        item = new ProductBundleModel(response.data);
      }
    } catch (error) {
      item.withError(BaseApi.handleError(error));
    }

    return item;
  }
}

export default ProductBundleNextApi;
