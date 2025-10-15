import BannerModel from "../models/BannerModel";
import { BannerCollectionJson, BannerJson } from "../types/Banner";
import BaseCollection from "./BaseCollection";

class BannerCollection extends BaseCollection<
  BannerJson,
  BannerModel,
  BannerCollectionJson
> {
  itemsFromJson(jsonItems: BannerJson[]): BannerModel[] {
    return jsonItems.map((item) => new BannerModel(item));
  }
}

export default BannerCollection;
