import ApiError from "../api/ApiError";

class BaseModel {
  error: ApiError;

  constructor() {
    this.error = new ApiError({
      statusCode: 0,
      errors: [],
    });
  }

  withError(error: ApiError) {
    this.error = error;
  }

  hasError(): boolean {
    return this.error.errors.length > 0;
  }
}

export default BaseModel;
