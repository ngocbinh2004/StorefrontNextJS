import BaseCollection from "./BaseCollection";
import InstallmentModel from "../models/InstallmentModel";
import {
  InstallmentCollectionJson,
  InstallmentJson,
} from "../types/Installment";

class InstallmentCollection extends BaseCollection<
  InstallmentJson,
  InstallmentModel,
  InstallmentCollectionJson
> {
  itemsFromJson(jsonItems: InstallmentJson[]): InstallmentModel[] {
    return jsonItems.map((item) => new InstallmentModel(item));
  }
}

export default InstallmentCollection;
