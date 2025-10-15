import { FetchError } from "ofetch";
import BaseApi from "./BaseApi";
import { BannerCollectionJson, FilterBanner } from "@/common/types/Banner";
import BannerCollection from "@/common/collections/BannerCollection";
import BannerModel from "@/common/models/BannerModel";

const SERVICE_URL = "/site/banners";

class BannerApi extends BaseApi {
  static async getItems(filters: FilterBanner): Promise<BannerCollection> {
    let collection = new BannerCollection();

    await this.getInstance()<BannerCollectionJson>(SERVICE_URL, {
      method: "GET",
      cache: "no-store",
      query: {
        id: filters.id,
        identifier: filters.identifier,
        identifier_list: filters.identifier_list,
      },
    })
      .then((responseData) => {
        collection = new BannerCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }

  static async getItemByIdentifier(identifier: string): Promise<BannerModel> {
    let item = new BannerModel(BannerModel.getDefaultData());

    //get cache
    const key = `banner-identifier-${identifier}`;
    const data = await this.cacheGet(key);
    if (data.length > 0) {
      item = new BannerModel(JSON.parse(data));
    } else {
      const collection = await this.getItems({ identifier });

      if (collection.hasError()) {
        item.withError(collection.error);
      } else {
        if (collection.items.length > 0) {
          item = collection.items[0];

          //store cache data
          this.cacheSet(key, JSON.stringify(item.toJson()));
        }
      }
    }

    return item;
  }

  static async getItemById(id: number): Promise<BannerModel> {
    let item = new BannerModel(BannerModel.getDefaultData());

    const collection = await this.getItems({ id });

    if (collection.hasError()) {
      item.withError(collection.error);
    } else {
      if (collection.items.length > 0) {
        item = collection.items[0];
      }
    }

    return item;
  }
}

export default BannerApi;
