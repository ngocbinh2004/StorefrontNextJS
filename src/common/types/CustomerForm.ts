type UserRegisterInitRequest = {
  full_name: string;
  phone: string;
  email: string;
  password: string;
};

type UserRegisterFinishRequest = UserRegisterInitRequest & {
  passport_id: string;
  otp: string;
};

type UserAuthenticateRequest = {
  phone: string;
  password: string;
};

type UserUpdateRequest = {
  full_name: string;
  email: string;
};

type UserAuthenticateProvider = "" | "google" | "facebook";

type UserAuthenticateSocialRequest = {
  provider: UserAuthenticateProvider;
  access_token: string;
  scope: string;
};

type UserChangePasswordRequest = {
  password_old: string;
  password_new: string;
};

type UserRecoveryInitRequest = {
  phone: string;
};

type UserRecoveryFinishRequest = UserRecoveryInitRequest & {
  password: string;
  passport_id: string;
  otp: string;
};

type UserCheckOtpRequest = {
  action: string;
  phone: string;
  passport_id: string;
  otp: string;
};

export type {
  UserRegisterInitRequest,
  UserRegisterFinishRequest,
  UserAuthenticateRequest,
  UserChangePasswordRequest,
  UserRecoveryInitRequest,
  UserRecoveryFinishRequest,
  UserAuthenticateProvider,
  UserAuthenticateSocialRequest,
  UserUpdateRequest,
  UserCheckOtpRequest,
};
