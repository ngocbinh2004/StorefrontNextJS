type CustomerPassportMetadata = Record<string, any>;

type CustomerPassportJson = {
  id: string;
  passport_id: string;
  full_name: string;
  phone: string;
  otp_length: number;
  date_created: number;
  date_expired: number;
  metadata: CustomerPassportMetadata;
};

export type { CustomerPassportJson, CustomerPassportMetadata };
