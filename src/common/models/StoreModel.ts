import Store from "../contants/Store";
import { BaseModelJson } from "../interfaces/BaseModelJson";
import { SelectOption } from "../types/SelectOption";
import { StoreJson } from "../types/Store";
import BaseModel from "./BaseModel";

class StoreModel extends BaseModel implements BaseModelJson<StoreJson> {
  company_id: number;
  creator_id: number;
  id: number;
  name: string;
  code: string;
  phone: string;
  address: string;
  lat: number;
  long: number;
  region_id: number;
  sub_region_id: number;
  sub_sub_region_id: number;
  embed_map: string;
  open_time: string;
  close_time: string;
  status: number;
  date_created: number;
  date_modified: number;

  constructor(json: StoreJson) {
    super();

    this.id = json.id || 0;
    this.creator_id = json.creator_id || 0;
    this.company_id = json.company_id || 0;
    this.name = json.name || "";
    this.code = json.code || "";
    this.phone = json.phone || "";
    this.address = json.address || "";
    this.lat = json.lat || 0;
    this.long = json.long || 0;
    this.region_id = json.region_id || 0;
    this.sub_region_id = json.sub_region_id || 0;
    this.sub_sub_region_id = json.sub_sub_region_id || 0;
    this.embed_map = json.embed_map || "";
    this.open_time = json.open_time || "";
    this.close_time = json.close_time || "";
    this.status = json.status || 0;
    this.date_created = json.date_created || 0;
    this.date_modified = json.date_modified || 0;
  }

  static getDefaultData(): StoreJson {
    return {
      id: 0,
      creator_id: 0,
      company_id: 0,
      name: "",
      code: "",
      phone: "",
      address: "",
      lat: 0,
      long: 0,
      region_id: 0,
      sub_region_id: 0,
      sub_sub_region_id: 0,
      embed_map: "",
      open_time: "",
      close_time: "",
      status: 0,
      date_created: 0,
      date_modified: 0,
    };
  }

  toJson(): StoreJson {
    return {
      company_id: this.company_id,
      creator_id: this.creator_id,
      id: this.id,
      name: this.name,
      code: this.code,
      phone: this.phone,
      address: this.address,
      lat: this.lat,
      long: this.long,
      region_id: this.region_id,
      sub_region_id: this.sub_region_id,
      sub_sub_region_id: this.sub_sub_region_id,
      embed_map: this.embed_map,
      open_time: this.open_time,
      close_time: this.close_time,
      status: this.status,
      date_created: this.date_created,
      date_modified: this.date_modified,
    };
  }

  static getStatusList(): SelectOption[] {
    return [
      {
        value: Store.STATUS_ENABLE,
        label: "Đang hoạt động",
        color: "",
      },
      {
        value: Store.STATUS_DISABLED,
        label: "Ngừng hoạt động",
        color: "",
      },
    ];
  }

  static getStatus(value: number): SelectOption | undefined {
    return this.getStatusList().find((item) => item.value === value);
  }
}

export default StoreModel;
