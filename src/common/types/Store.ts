import { BaseCollectionJson } from "./BaseCollection";
import { Filter } from "./Filter";

type StoreJson = {
  company_id: number;
  creator_id: number;
  id: number;
  name: string;
  code: string;
  phone: string;
  region_id: number;
  sub_region_id: number;
  sub_sub_region_id: number;
  address: string;
  lat: number;
  long: number;
  embed_map: string;
  open_time: string;
  close_time: string;
  status: number;
  date_created: number;
  date_modified: number;
};

type StoreCollectionJson = BaseCollectionJson<StoreJson>;

type FilterStore = Filter & {};

export type { FilterStore, StoreCollectionJson, StoreJson };
