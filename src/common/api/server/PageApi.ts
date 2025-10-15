import { FetchError } from "ofetch";
import BaseApi from "./BaseApi";
import PageModel from "@/common/models/PageModel";
import { PageJson } from "@/common/types/Page";

const SERVICE_URL = "/site/pages";

class PageApi extends BaseApi {
  static async getDetailBySlug(slug: string): Promise<PageModel> {
    let item = new PageModel(PageModel.getDefaultData());

    await this.getInstance()<PageJson>(`${SERVICE_URL}/slug/${slug}`, {
      method: "GET",
      cache: "no-store",
    })
      .then((responseData) => {
        item = new PageModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }
}

export default PageApi;
