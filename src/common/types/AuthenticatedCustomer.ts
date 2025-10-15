import { CustomerJson } from "./Customer";
import { CustomerPassportJson } from "./CustomerPassport";

type AuthenticatedCustomer = {
  jwt: string;
  user: CustomerJson;
  passport: CustomerPassportJson | null;
};

export type { AuthenticatedCustomer };
