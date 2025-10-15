import ApiError from "../ApiError";

class BaseNextApi {
  debug: boolean;

  constructor(debug: boolean) {
    this.debug = debug;
  }

  //Handing error of request
  static handleError(axiosError: any) {
    let statusCode = 0;
    let errors = [];

    if (axiosError != null) {
      if (
        axiosError.hasOwnProperty("response") &&
        typeof axiosError.response !== "undefined"
      ) {
        statusCode = axiosError.response.status;

        if (axiosError.response.data["error"] != null) {
          if (typeof axiosError.response.data["error"] == "string") {
            errors.push(axiosError.response.data["error"]);
          } else {
            errors = axiosError.response.data["error"];
          }
        } else {
          errors.push(axiosError.response.statusText);
        }
      } else {
        errors.push("api_network_error");
      }
    } else {
      errors.push("api_error_unexpected");
    }

    for (let i = 0; i < errors.length; i++) {
      if (errors[i] === "error_jwt_blacklisted") {
        //fire blacklistjwt
        //Todo...
      }
    }

    return new ApiError({ statusCode, errors });
  }
}

export default BaseNextApi;
