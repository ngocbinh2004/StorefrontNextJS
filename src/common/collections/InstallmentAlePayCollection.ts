import BaseCollection from "./BaseCollection";
import InstallmentAlePayModel from "../models/InstallmentAlePayModel";
import {
  InstallmentAlePayCollectionJson,
  InstallmentAlePayJson,
} from "../types/InstallmentAlePay";

class InstallmentAlePayCollection extends BaseCollection<
  InstallmentAlePayJson,
  InstallmentAlePayModel,
  InstallmentAlePayCollectionJson
> {
  itemsFromJson(jsonItems: InstallmentAlePayJson[]): InstallmentAlePayModel[] {
    return jsonItems.map((item) => new InstallmentAlePayModel(item));
  }
}

export default InstallmentAlePayCollection;
