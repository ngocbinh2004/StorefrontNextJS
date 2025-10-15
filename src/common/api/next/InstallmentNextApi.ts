import InstallmentCollection from "@/common/collections/InstallmentCollection";
import { FilterInstallment } from "@/common/types/Installment";
import { default as BaseApi, default as BaseNextApi } from "./BaseNextApi";
import NextClient from "./NextClient";

const SERVICE_URL = "/next-api/installment";

class InstallmentNextApi extends BaseNextApi {
  static async getItems(
    filters: FilterInstallment
  ): Promise<InstallmentCollection> {
    let collection = new InstallmentCollection();

    try {
      let queryData = {
        params: filters,
      };

      const response = await NextClient().get<InstallmentCollection>(
        `${SERVICE_URL}/list`,
        queryData
      );

      if (response.hasOwnProperty("data")) {
        collection.fromJson(response.data);
      }
    } catch (error) {
      collection.withError(BaseApi.handleError(error));
    }

    return collection;
  }

  static async getTenorDetail(
    filters: FilterInstallment
  ): Promise<InstallmentCollection> {
    let collection = new InstallmentCollection();

    try {
      let queryData = {
        params: filters,
      };

      const response = await NextClient().get<InstallmentCollection>(
        `${SERVICE_URL}/detail`,
        queryData
      );

      if (response.hasOwnProperty("data")) {
        collection.fromJson(response.data);
      }
    } catch (error) {
      collection.withError(BaseApi.handleError(error));
    }

    return collection;
  }
}

export default InstallmentNextApi;
