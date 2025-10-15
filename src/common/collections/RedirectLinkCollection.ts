import BaseCollection from "@/common/collections/BaseCollection";
import RedirectLinkModel from "@/common/models/RedirectLinkModel";
import {
  RedirectLinkCollectionJson,
  RedirectLinkJson,
} from "@/common/types/RedirectLink";

class RedirectLinkCollection extends BaseCollection<
  RedirectLinkJson,
  RedirectLinkModel,
  RedirectLinkCollectionJson
> {
  itemsFromJson(jsonItems: RedirectLinkJson[]): RedirectLinkModel[] {
    return jsonItems.map((item) => new RedirectLinkModel(item));
  }
}

export default RedirectLinkCollection;
