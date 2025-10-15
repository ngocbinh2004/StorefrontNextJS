import AuthenticatedCustomerModel from "@/common/models/AuthenticatedCustomerModel";
import CustomerModel from "@/common/models/CustomerModel";
import CustomerPassportModel from "@/common/models/CustomerPassportModel";
import { AuthenticatedCustomer } from "@/common/types/AuthenticatedCustomer";
import { CustomerJson } from "@/common/types/Customer";
import {
  UserAuthenticateRequest,
  UserAuthenticateSocialRequest,
  UserChangePasswordRequest,
  UserCheckOtpRequest,
  UserRecoveryFinishRequest,
  UserRecoveryInitRequest,
  UserRegisterFinishRequest,
  UserRegisterInitRequest,
  UserUpdateRequest,
} from "@/common/types/CustomerForm";
import { CustomerPassportJson } from "@/common/types/CustomerPassport";
import { default as BaseApi, default as BaseNextApi } from "./BaseNextApi";
import NextClient from "./NextClient";
import CustomerCheckOtpResultModel from "@/common/models/CustomerCheckOtpModel";
import { CustomerCheckOtpResultJson } from "@/common/types/CustomerCheckOtpResult";

const SERVICE_URL = "/next-api/user";

class UserNextApi extends BaseNextApi {
  static async logout(): Promise<string[]> {
    let resultErrors = [];

    try {
      const response = await NextClient().get(SERVICE_URL + "/logout");
      if (response.status !== 200) {
        resultErrors.push("error_response_not_200");
      }
    } catch (error) {
      console.log("error", error);
      resultErrors = BaseApi.handleError(error).errors;
    }

    return resultErrors;
  }

  static async changePassword(
    data: UserChangePasswordRequest
  ): Promise<string[]> {
    let resultErrors = [];

    try {
      const response = await NextClient().post(
        SERVICE_URL + "/changepassword",
        data
      );
      if (response.status !== 200) {
        resultErrors.push("error_response_not_200");
      }
    } catch (error) {
      resultErrors = BaseApi.handleError(error).errors;
    }

    return resultErrors;
  }

  static async registerInit(
    data: UserRegisterInitRequest
  ): Promise<CustomerPassportModel> {
    let passport = new CustomerPassportModel(
      CustomerPassportModel.getDefaultData()
    );
    try {
      const response = await NextClient().post<CustomerPassportJson>(
        SERVICE_URL + "/registerinit",
        data
      );
      if (response.hasOwnProperty("data")) {
        passport = new CustomerPassportModel(response.data);
      }
    } catch (error) {
      passport.withError(BaseApi.handleError(error));
    }

    return passport;
  }

  static async registerFinish(
    data: UserRegisterFinishRequest
  ): Promise<CustomerModel> {
    let newUser = new CustomerModel(CustomerModel.getDefaultData());
    try {
      const response = await NextClient().post<CustomerJson>(
        SERVICE_URL + "/registerfinish",
        data
      );
      if (response.hasOwnProperty("data")) {
        newUser = new CustomerModel(response.data);
      }
    } catch (error) {
      newUser.withError(BaseApi.handleError(error));
    }

    return newUser;
  }

  static async authenticateSocial(
    data: UserAuthenticateSocialRequest
  ): Promise<AuthenticatedCustomerModel> {
    let passport = new AuthenticatedCustomerModel(
      AuthenticatedCustomerModel.getDefaultData()
    );
    try {
      const response = await NextClient().post<AuthenticatedCustomer>(
        SERVICE_URL + "/authenticatesocial",
        data
      );
      if (response.hasOwnProperty("data")) {
        passport = new AuthenticatedCustomerModel(response.data);
      }
    } catch (error) {
      passport.withError(BaseApi.handleError(error));
    }

    return passport;
  }

  static async authenticate(
    data: UserAuthenticateRequest
  ): Promise<AuthenticatedCustomerModel> {
    let passport = new AuthenticatedCustomerModel(
      AuthenticatedCustomerModel.getDefaultData()
    );
    try {
      const response = await NextClient().post<AuthenticatedCustomer>(
        SERVICE_URL + "/authenticate",
        data
      );
      if (response.hasOwnProperty("data")) {
        passport = new AuthenticatedCustomerModel(response.data);
      }
    } catch (error) {
      passport.withError(BaseApi.handleError(error));
    }

    return passport;
  }

  static async recoveryInit(
    data: UserRecoveryInitRequest
  ): Promise<CustomerPassportModel> {
    let passport = new CustomerPassportModel(
      CustomerPassportModel.getDefaultData()
    );
    try {
      const response = await NextClient().post<CustomerPassportJson>(
        SERVICE_URL + "/recoveryinit",
        data
      );
      if (response.hasOwnProperty("data")) {
        passport = new CustomerPassportModel(response.data);
      }
    } catch (error) {
      passport.withError(BaseApi.handleError(error));
    }

    return passport;
  }

  static async recoveryFinish(
    data: UserRecoveryFinishRequest
  ): Promise<CustomerModel> {
    let newUser = new CustomerModel(CustomerModel.getDefaultData());
    try {
      const response = await NextClient().post<CustomerJson>(
        SERVICE_URL + "/recoveryfinish",
        data
      );
      if (response.hasOwnProperty("data")) {
        newUser = new CustomerModel(response.data);
      }
    } catch (error) {
      newUser.withError(BaseApi.handleError(error));
    }

    return newUser;
  }

  static async checkOtp(
    data: UserCheckOtpRequest
  ): Promise<CustomerCheckOtpResultModel> {
    let item = new CustomerCheckOtpResultModel(
      CustomerCheckOtpResultModel.getDefaultData()
    );
    try {
      const response = await NextClient().post<CustomerCheckOtpResultJson>(
        SERVICE_URL + "/checkotp",
        data
      );
      if (response.hasOwnProperty("data")) {
        item = new CustomerCheckOtpResultModel(response.data);
      }
    } catch (error) {
      item.withError(BaseApi.handleError(error));
    }

    return item;
  }

  static async doUpdate(data: UserUpdateRequest): Promise<CustomerModel> {
    let newUser = new CustomerModel(CustomerModel.getDefaultData());
    try {
      const response = await NextClient().post<CustomerJson>(
        SERVICE_URL + "/update",
        data
      );
      if (response.hasOwnProperty("data")) {
        newUser = new CustomerModel(response.data);
      }
    } catch (error) {
      newUser.withError(BaseApi.handleError(error));
    }

    return newUser;
  }
}

export default UserNextApi;
