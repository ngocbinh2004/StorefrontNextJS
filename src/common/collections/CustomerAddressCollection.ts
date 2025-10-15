import BaseCollection from "./BaseCollection";
import CustomerAddressModel from "../models/CustomerAddressModel";
import {
  CustomerAddressCollectionJson,
  CustomerAddressJson,
} from "../types/CustomerAddress";

class CustomerAddressCollection extends BaseCollection<
  CustomerAddressJson,
  CustomerAddressModel,
  CustomerAddressCollectionJson
> {
  itemsFromJson(jsonItems: CustomerAddressJson[]): CustomerAddressModel[] {
    return jsonItems.map((item) => new CustomerAddressModel(item));
  }
}

export default CustomerAddressCollection;
