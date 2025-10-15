import { RecentlyViewedProductJson } from "@/common/types/ProductRecentlyViewed";
import { default as BaseNextApi } from "./BaseNextApi";
import NextClient from "./NextClient";

const SERVICE_URL = "/next-api/productrecentlyviewed";
class ProductRecentlyViewedNextApi extends BaseNextApi {
  static async getItems(): Promise<RecentlyViewedProductJson> {
    let idList = { idList: "" };
    try {
      const response = await NextClient().get<RecentlyViewedProductJson>(
        SERVICE_URL + "/list",
      );
      if (response.hasOwnProperty("data")) {
        idList = response.data;
      }
    } catch (error) {}

    return idList;
  }

  static async addData(productIdList: string): Promise<string> {
    let idList = "";
    try {
      const response = await NextClient().post<string>(SERVICE_URL + "/add", {
        idList: productIdList,
      });
      if (response.hasOwnProperty("data")) {
        idList = response.data;
      }
    } catch (error) {}

    return idList;
  }
}

export default ProductRecentlyViewedNextApi;
