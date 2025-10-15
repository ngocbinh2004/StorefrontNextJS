import RedirectLinkModel from "@/common/models/RedirectLinkModel";
import { RedirectLinkJson } from "@/common/types/RedirectLink";
import { FetchError } from "ofetch";
import BaseApi from "./BaseApi";

const SERVICE_URL = "/site/redirectlinks";

class RedirectLinkApi extends BaseApi {
  static async getDetailBySourceUrl(
    sourceUrl: string
  ): Promise<RedirectLinkModel> {
    let item = new RedirectLinkModel(RedirectLinkModel.getDefaultData());

    await this.getInstance()<RedirectLinkJson>(`${SERVICE_URL}/sourceurl`, {
      method: "GET",
      cache: "no-store",
      query: {
        source_url: sourceUrl,
      },
    })
      .then((responseData) => {
        item = new RedirectLinkModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }
}

export default RedirectLinkApi;
