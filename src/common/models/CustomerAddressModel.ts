import { BaseModelJson } from "../interfaces/BaseModelJson";
import { CustomerAddressJson } from "../types/CustomerAddress";
import BaseModel from "./BaseModel";

class CustomerAddressModel
  extends BaseModel
  implements BaseModelJson<CustomerAddressJson>
{
  customer_id: number;
  id: number;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  region_id: number;
  sub_region_id: number;
  sub_sub_region_id: number;
  note: string;
  is_default: number;

  constructor(json: CustomerAddressJson) {
    super();

    this.id = json.id || 0;
    this.customer_id = json.customer_id || 0;
    this.full_name = json.full_name || "";
    this.email = json.email || "";
    this.phone = json.phone || "";
    this.address = json.address || "";
    this.region_id = json.region_id || 0;
    this.sub_region_id = json.sub_region_id || 0;
    this.sub_sub_region_id = json.sub_sub_region_id || 0;
    this.note = json.note || "";
    this.is_default = json.is_default || 0;
  }

  static getDefaultData(): CustomerAddressJson {
    return {
      id: 0,
      customer_id: 0,
      full_name: "",
      email: "",
      phone: "",
      address: "",
      region_id: 0,
      sub_region_id: 0,
      sub_sub_region_id: 0,
      note: "",
      is_default: 0,
    };
  }

  toJson(): CustomerAddressJson {
    return {
      id: this.id,
      customer_id: this.customer_id,
      full_name: this.full_name,
      email: this.email,
      phone: this.phone,
      address: this.address,
      region_id: this.region_id,
      sub_region_id: this.sub_region_id,
      sub_sub_region_id: this.sub_sub_region_id,
      note: this.note,
      is_default: this.is_default,
    };
  }
}

export default CustomerAddressModel;
