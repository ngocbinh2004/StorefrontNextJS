type CustomerCheckOtpResultJson = {
  action: string;
  passport_id: string;
  phone: string;
  otp: string;
  date_checked: number;
  status: string;
  message: string;
};

export type { CustomerCheckOtpResultJson };
