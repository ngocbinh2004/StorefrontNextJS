import BaseCollection from "@/common/collections/BaseCollection";
import PreOrderModel from "@/common/models/PreOrderModel";
import { PreOrderCollectionJson, PreOrderJson } from "@/common/types/PreOrder";

class PreOrderCollection extends BaseCollection<
  PreOrderJson,
  PreOrderModel,
  PreOrderCollectionJson
> {
  itemsFromJson(jsonItems: PreOrderJson[]): PreOrderModel[] {
    return jsonItems.map((item) => new PreOrderModel(item));
  }
}

export default PreOrderCollection;
