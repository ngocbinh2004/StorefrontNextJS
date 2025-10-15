import { BaseCollectionJson } from "./BaseCollection";
import { Filter } from "./Filter";

type CustomerAddressJsonAddEdit = {
  id: number;
  customer_id: number;
  full_name: string;
  address: string;
  phone: string;
  note: string;
  region_id: number;
  sub_region_id: number;
  sub_sub_region_id: number;
  is_default: number;
};

type CustomerAddressJson = CustomerAddressJsonAddEdit & {
  email: string;
};

type CustomerAddressCollectionJson = BaseCollectionJson<CustomerAddressJson>;

type FilterCustomerAddress = Filter & {};

export type {
  CustomerAddressCollectionJson,
  CustomerAddressJson,
  CustomerAddressJsonAddEdit,
  FilterCustomerAddress,
};
