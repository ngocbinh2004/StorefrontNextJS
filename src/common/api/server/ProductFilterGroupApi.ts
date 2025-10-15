import ProductFilterGroupCollection from "@/common/collections/ProductFilterGroupCollection";
import {
  FilterProductFilterGroup,
  ProductFilterGroupCollectionJson,
} from "@/common/types/ProductFilterGroup";
import { FetchError } from "ofetch";
import BaseApi from "./BaseApi";

const SERVICE_URL = "/site/productfiltergroups";

class ProductFilterGroupApi extends BaseApi {
  static async getItems(
    filters: FilterProductFilterGroup
  ): Promise<ProductFilterGroupCollection> {
    let collection = new ProductFilterGroupCollection();

    await this.getInstance()<ProductFilterGroupCollectionJson>(
      `${SERVICE_URL}`,
      {
        method: "GET",
        cache: "no-store",
        query: {
          category_id: filters.category_id,
        },
      }
    )
      .then((responseData) => {
        collection = new ProductFilterGroupCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }

  static async getItemsByCategoryId(
    category_id: number
  ): Promise<ProductFilterGroupCollection> {
    let collection = new ProductFilterGroupCollection();

    //get cache
    const key = `product-filter-group-category-id-${category_id}`;
    const data = await this.cacheGet(key);
    if (data.length > 0) {
      collection = new ProductFilterGroupCollection(JSON.parse(data));
    } else {
      collection = await this.getItems({
        category_id,
      });

      if (!collection.hasError()) {
        //store cache data
        this.cacheSet(key, JSON.stringify(collection.toJson()));
      }
    }

    return collection;
  }
}

export default ProductFilterGroupApi;
