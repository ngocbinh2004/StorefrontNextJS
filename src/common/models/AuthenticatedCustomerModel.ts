import BaseModel from "./BaseModel";

import { BaseModelJson } from "../interfaces/BaseModelJson";
import { AuthenticatedCustomer } from "../types/AuthenticatedCustomer";
import CustomerModel from "./CustomerModel";
import CustomerPassportModel from "./CustomerPassportModel";
class AuthenticatedCustomerModel
  extends BaseModel
  implements BaseModelJson<AuthenticatedCustomer>
{
  jwt: string;
  user: CustomerModel;
  passport: CustomerPassportModel;

  constructor(json: AuthenticatedCustomer) {
    super();

    this.jwt = json.jwt || "";
    this.user = new CustomerModel(json.user || CustomerModel.getDefaultData());
    this.passport = new CustomerPassportModel(
      json.passport || CustomerPassportModel.getDefaultData()
    );
  }

  static getDefaultData(): AuthenticatedCustomer {
    return {
      jwt: "",
      user: CustomerModel.getDefaultData(),
      passport: CustomerPassportModel.getDefaultData(),
    };
  }

  toJson(): AuthenticatedCustomer {
    return {
      jwt: this.jwt,
      user: this.user,
      passport: this.passport,
    };
  }
}

export default AuthenticatedCustomerModel;
