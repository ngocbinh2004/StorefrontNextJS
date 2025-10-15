import { FilterInstallment } from "@/common/types/Installment";
import { FetchError } from "ofetch";
import BaseApi from "./BaseApi";
import InstallmentCollection from "@/common/collections/InstallmentCollection";

const SERVICE_URL = "/site/installments";

class InstallmentApi extends BaseApi {
  static async getItems(
    filters: FilterInstallment
  ): Promise<InstallmentCollection> {
    let collection = new InstallmentCollection();

    await this.getInstance()<InstallmentCollection>(
      `${SERVICE_URL}/${filters.product_variant_id}`,
      {
        method: "GET",
        cache: "no-store",
        query: {
          prepaid_percentage: filters.prepaid_percentage,
        },
      }
    )
      .then((responseData) => {
        collection = new InstallmentCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }

  static async getTenorDetail(
    filters: FilterInstallment
  ): Promise<InstallmentCollection> {
    let collection = new InstallmentCollection();

    await this.getInstance()<InstallmentCollection>(
      `${SERVICE_URL}/${filters.product_variant_id}/detail`,
      {
        method: "GET",
        cache: "no-store",
        query: {
          prepaid_percentage: filters.prepaid_percentage,
          tenor: filters.tenor,
        },
      }
    )
      .then((responseData) => {
        collection = new InstallmentCollection(responseData);
      })
      .catch((error: FetchError) => {
        collection.withError(BaseApi.handleError(error));
      });

    return collection;
  }
}

export default InstallmentApi;
