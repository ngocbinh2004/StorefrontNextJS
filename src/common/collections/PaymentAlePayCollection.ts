import BaseCollection from "./BaseCollection";
import PaymentAlePayModel from "../models/PaymentAlePayModel";
import {
  PaymentAlePayCollectionJson,
  PaymentAlePayJson,
} from "../types/PaymentAlePay";

class PaymentAlePayCollection extends BaseCollection<
  PaymentAlePayJson,
  PaymentAlePayModel,
  PaymentAlePayCollectionJson
> {
  itemsFromJson(jsonItems: PaymentAlePayJson[]): PaymentAlePayModel[] {
    return jsonItems.map((item) => new PaymentAlePayModel(item));
  }
}

export default PaymentAlePayCollection;
