import { FetchError } from "ofetch";
import BaseApi from "./BaseApi";
import LandingModel from "@/common/models/LandingModel";
import { LandingJson } from "@/common/types/Landing";

const SERVICE_URL = "/site/pages";

class LandingApi extends BaseApi {
  static async getDetailBySlug(slug: string): Promise<LandingModel> {
    let item = new LandingModel(LandingModel.getDefaultData());

    await this.getInstance()<LandingJson>(`${SERVICE_URL}/slug/${slug}`, {
      method: "GET",
      cache: "no-store",
    })
      .then((responseData) => {
        item = new LandingModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }
}

export default LandingApi;
