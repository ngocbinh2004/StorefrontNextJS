import {
  CompanySettingEntry,
  CompanySettingEntryValue,
} from "../types/CompanySetting";
import BaseModel from "./BaseModel";

class CompanySettingModel extends BaseModel {
  data: CompanySettingEntry;

  constructor(json: CompanySettingEntry) {
    super();

    this.data = json || {};
  }

  static getDefaultData(): CompanySettingEntry {
    return {};
  }

  toJson(): CompanySettingEntry {
    return this.data;
  }

  get(
    key: string,
    defaultValue?: CompanySettingEntryValue
  ): CompanySettingEntryValue {
    if (typeof this.data[key] !== "undefined") {
      return this.data[key];
    } else {
      return defaultValue || "";
    }
  }
}

export default CompanySettingModel;
