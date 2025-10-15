import LandingModel from "../models/LandingModel";
import { LandingCollectionJson, LandingJson } from "../types/Landing";
import BaseCollection from "./BaseCollection";

class LandingCollection extends BaseCollection<
  LandingJson,
  LandingModel,
  LandingCollectionJson
> {
  itemsFromJson(jsonItems: LandingJson[]): LandingModel[] {
    return jsonItems.map((item) => new LandingModel(item));
  }
}

export default LandingCollection;
