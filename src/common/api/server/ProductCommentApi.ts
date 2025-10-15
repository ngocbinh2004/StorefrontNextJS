import BaseApi from "./BaseApi";
import {
  FilterProductComment,
  ProductCommentCollectionJson,
  ProductCommentJson,
  ProductCommentRequest,
} from "@/common/types/ProductComment";
import ProductCommentCollection from "@/common/collections/ProductCommentCollection";
import { FetchError } from "ofetch";
import ProductCommentModel from "@/common/models/ProductCommentModel";

const SERVICE_URL = "/site/productcomments";

class ProductCommentApi extends BaseApi {
  static async getItems(
    filters: FilterProductComment
  ): Promise<ProductCommentCollection> {
    let collection = new ProductCommentCollection();

    await this.getInstance()<ProductCommentCollectionJson>(
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
        collection = new ProductCommentCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }

  static async add(
    product_id: number,
    data: ProductCommentRequest
  ): Promise<ProductCommentModel> {
    let item = new ProductCommentModel(ProductCommentModel.getDefaultData());
    await this.getInstance()<ProductCommentJson>(
      `${SERVICE_URL}/${product_id}`,
      {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify(data),
      }
    )
      .then((responseData) => {
        item = new ProductCommentModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }
}

export default ProductCommentApi;
