import PageBlockModel from "@/common/models/PageBlockModel";
import { PageBlockJson } from "@/common/types/PageBlock";
import { default as BaseApi, default as BaseNextApi } from "./BaseNextApi";
import NextClient from "./NextClient";

const SERVICE_URL = "/next-api/blockpage";

class PageBlockNextApi extends BaseNextApi {
  static async getDetailByIdentifier(
    identifier: string
  ): Promise<PageBlockModel> {
    let item = new PageBlockModel(PageBlockModel.getDefaultData());

    try {
      const response = await NextClient().get<PageBlockJson>(
        `${SERVICE_URL}/identifier`,
        { params: { identifier: identifier } }
      );
      if (response.hasOwnProperty("data")) {
        item = new PageBlockModel(response.data);
      }
    } catch (error) {
      item.withError(BaseApi.handleError(error));
    }

    return item;
  }
}

export default PageBlockNextApi;
