import BaseApi from "./BaseApi";
import {
  UserAuthenticateRequest,
  UserCheckOtpRequest,
  UserRecoveryFinishRequest,
  UserRecoveryInitRequest,
  UserRegisterFinishRequest,
  UserRegisterInitRequest,
  UserUpdateRequest,
} from "@/common/types/CustomerForm";

import AuthenticatedCustomerModel from "@/common/models/AuthenticatedCustomerModel";
import { FetchError } from "ofetch";
import CustomerPassportModel from "@/common/models/CustomerPassportModel";
import { CustomerPassportJson } from "@/common/types/CustomerPassport";
import CustomerModel from "@/common/models/CustomerModel";
import { CustomerJson } from "@/common/types/Customer";
import { AuthenticatedCustomer } from "@/common/types/AuthenticatedCustomer";
import CustomerCheckOtpResultModel from "@/common/models/CustomerCheckOtpModel";
import { CustomerCheckOtpResultJson } from "@/common/types/CustomerCheckOtpResult";

const SERVICE_URL = "/site/customers";

class CustomerApi extends BaseApi {
  static async authenticate(
    data: UserAuthenticateRequest
  ): Promise<AuthenticatedCustomerModel> {
    let item = new AuthenticatedCustomerModel(
      AuthenticatedCustomerModel.getDefaultData()
    );

    await this.getInstance()<AuthenticatedCustomer>(
      SERVICE_URL + "/authenticate",
      {
        method: "POST",
        cache: "no-store",
        body: data,
      }
    )
      .then((responseData) => {
        item = new AuthenticatedCustomerModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }

  static async getRegisterPassport(
    data: UserRegisterInitRequest
  ): Promise<CustomerPassportModel> {
    let item = new CustomerPassportModel(
      CustomerPassportModel.getDefaultData()
    );

    await this.getInstance()<CustomerPassportJson>(
      SERVICE_URL + "/registerinit",
      {
        method: "POST",
        cache: "no-store",
        body: data,
      }
    )
      .then((responseData) => {
        item = new CustomerPassportModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }

  static async doRegister(
    data: UserRegisterFinishRequest
  ): Promise<CustomerModel> {
    let item = new CustomerModel(CustomerModel.getDefaultData());

    await this.getInstance()<CustomerJson>(SERVICE_URL + "/registerfinish", {
      method: "POST",
      cache: "no-store",
      body: data,
    })
      .then((responseData) => {
        item = new CustomerModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }

  static async getRecoveryPassport(
    data: UserRecoveryInitRequest
  ): Promise<CustomerPassportModel> {
    let item = new CustomerPassportModel(
      CustomerPassportModel.getDefaultData()
    );

    await this.getInstance()<CustomerPassportJson>(
      SERVICE_URL + "/recoveryinit",
      {
        method: "POST",
        cache: "no-store",
        body: data,
      }
    )
      .then((responseData) => {
        item = new CustomerPassportModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }

  static async doCheckOtp(
    data: UserCheckOtpRequest
  ): Promise<CustomerCheckOtpResultModel> {
    let item = new CustomerCheckOtpResultModel(
      CustomerCheckOtpResultModel.getDefaultData()
    );

    await this.getInstance()<CustomerCheckOtpResultJson>(
      SERVICE_URL + "/checkotp",
      {
        method: "POST",
        cache: "no-store",
        body: data,
      }
    )
      .then((responseData) => {
        item = new CustomerCheckOtpResultModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }

  static async doRecovery(
    data: UserRecoveryFinishRequest
  ): Promise<CustomerModel> {
    let item = new CustomerModel(CustomerModel.getDefaultData());

    await this.getInstance()<CustomerJson>(SERVICE_URL + "/recoveryfinish", {
      method: "POST",
      cache: "no-store",
      body: data,
    })
      .then((responseData) => {
        item = new CustomerModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }

  static async doUpdate(data: UserUpdateRequest): Promise<CustomerModel> {
    let item = new CustomerModel(CustomerModel.getDefaultData());

    await this.getInstance()<CustomerJson>(SERVICE_URL + "/update", {
      method: "POST",
      cache: "no-store",
      body: data,
    })
      .then((responseData) => {
        item = new CustomerModel(responseData);
      })
      .catch((error: FetchError) => {
        item.withError(BaseApi.handleError(error));
      });

    return item;
  }
}

export default CustomerApi;
