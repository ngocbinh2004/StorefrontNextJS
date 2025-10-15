import PreOrderModel from "@/common/models/PreOrderModel";
import {
  FilterPreOrder,
  PreOrderCollectionJson,
  PreOrderJson,
  PreOrderJsonAdd,
} from "@/common/types/PreOrder";
import { default as BaseApi, default as BaseNextApi } from "./BaseNextApi";
import NextClient from "./NextClient";
import PreOrderCollection from "@/common/collections/PreOrderCollection";

const SERVICE_URL = "/next-api/preorder";

class PreOrderNextApi extends BaseNextApi {
  static async getItems(filters: FilterPreOrder): Promise<PreOrderCollection> {
    let collection = new PreOrderCollection();

    try {
      let queryData = {
        params: filters,
      };

      const response = await NextClient().get<PreOrderCollectionJson>(
        `${SERVICE_URL}/list`,
        queryData,
      );

      if (response.hasOwnProperty("data")) {
        collection.fromJson(response.data);
      }
    } catch (error) {
      collection.withError(BaseApi.handleError(error));
    }
    return collection;
  }

  static async add(data: PreOrderJsonAdd): Promise<PreOrderModel> {
    let item = new PreOrderModel(PreOrderModel.getDefaultData());
    try {
      const response = await NextClient().post<PreOrderJson>(
        SERVICE_URL + "/add",
        data,
      );
      if (response.hasOwnProperty("data")) {
        item = new PreOrderModel(response.data);
      }
    } catch (error) {
      item.withError(BaseApi.handleError(error));
    }

    return item;
  }
}

export default PreOrderNextApi;
