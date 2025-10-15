import { FetchError } from "ofetch";
import BaseApi from "./BaseApi";
import {
  PreOrderJson,
  PreOrderJsonAdd,
  FilterPreOrder,
} from "@/common/types/PreOrder";
import PreOrderCollection from "@/common/collections/PreOrderCollection";
import PreOrderModel from "@/common/models/PreOrderModel";

const SERVICE_URL = "/site/preorders";

class PreOrderApi extends BaseApi {
  static async getItems(filters: FilterPreOrder): Promise<PreOrderCollection> {
    let collection = new PreOrderCollection();

    await this.getInstance()<PreOrderCollection>(`${SERVICE_URL}`, {
      method: "GET",
      cache: "no-store",
      query: {
        page: filters.page,
        limit: filters.limit,
        sort_by: filters.sortby,
        sort_type: filters.sorttype,
        product_variant_id: filters.product_variant_id,
      },
    })
      .then((responseData) => {
        collection = new PreOrderCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }

  static async add(data: PreOrderJsonAdd): Promise<PreOrderModel> {
    let item = new PreOrderModel(PreOrderModel.getDefaultData());

    await this.getInstance()<PreOrderJson>(`${SERVICE_URL}`, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(data),
    })
      .then((responseData) => {
        item = new PreOrderModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }
}

export default PreOrderApi;
