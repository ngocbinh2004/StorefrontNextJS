import BaseCollection from "./BaseCollection";
import StoreModel from "../models/StoreModel";
import { StoreCollectionJson, StoreJson } from "../types/Store";

class StoreCollection extends BaseCollection<
  StoreJson,
  StoreModel,
  StoreCollectionJson
> {
  itemsFromJson(jsonItems: StoreJson[]): StoreModel[] {
    return jsonItems.map((item) => new StoreModel(item));
  }
}

export default StoreCollection;
