import { ApiErrorJson } from "../types/ApiError";

class ApiError {
  statusCode: number;
  errors: string[];

  constructor({ statusCode, errors }: ApiErrorJson) {
    this.statusCode = statusCode;
    this.errors = errors;
  }

  static getDefaultData(): ApiErrorJson {
    return {
      statusCode: 0,
      errors: [],
    };
  }

  toJson(): ApiErrorJson {
    return {
      statusCode: this.statusCode,
      errors: this.errors,
    };
  }
}

export default ApiError;
