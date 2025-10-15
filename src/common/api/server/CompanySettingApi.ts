import CompanySettingModel from "@/common/models/CompanySettingModel";
import { CompanySettingEntry } from "@/common/types/CompanySetting";
import { FetchError } from "ofetch";
import BaseApi from "./BaseApi";

const SERVICE_URL = "/site/companysettings";

class CompanySettingApi extends BaseApi {
  static async getSetting(): Promise<CompanySettingModel> {
    let item = new CompanySettingModel(CompanySettingModel.getDefaultData());

    //get cache
    const key = `company-setting`;
    const data = await this.cacheGet(key);
    if (data.length > 0) {
      item = new CompanySettingModel(JSON.parse(data));
    } else {
      await this.getInstance()<CompanySettingEntry>(`${SERVICE_URL}/setting`)
        .then((responseData) => {
          item = new CompanySettingModel(responseData);

          //store cache data
          this.cacheSet(key, JSON.stringify(responseData));
        })
        .catch((error: FetchError) => {
          item.withError(BaseApi.handleError(error));
        });
    }

    return item;
  }
}

export default CompanySettingApi;
