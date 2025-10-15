import ApiError from "../ApiError";

import { ofetch, $Fetch, FetchError } from "ofetch";
import { cookies } from "next/headers";
import myRedisService from "@/app/redis";

class BaseApi {
  private static _instance: $Fetch;
  public static _logs: string[];

  constructor() {}

  static getInstance() {
    if (this._instance) {
      return this._instance;
    }

    this._instance = ofetch.create({
      baseURL: process.env.NEXT_PUBLIC_WS_BASE_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${process.env.COMPANY_APP_AUTHORIZATION}`,
        Accept: "application/json",
      },
      onRequest: ({ request, options }) => {
        let accessToken = "";

        // console.log(`DO REQUEST ${request}`);

        //in case login flow, with old/error JWT token, we do not attach on request to prevent error
        const ignoreCookie =
          typeof request === "string" &&
          request.indexOf("/site/customers/authenticate") >= 0;

        //fetch cookie
        if (!ignoreCookie) {
          const nextCookies = cookies(); // Get cookies object
          const fetchedAuthCookie =
            nextCookies?.get(process.env.NEXT_PUBLIC_JWT_COOKIE_NAME as string)
              ?.value || "";
          if (fetchedAuthCookie.length > 0) {
            accessToken = fetchedAuthCookie;
          }
        }

        // add authorization token
        if (typeof accessToken !== "undefined" && accessToken.length > 0) {
          //addon header
          options.headers = new Headers(options.headers);
          options.headers.set("SiteAuthorization", `${accessToken}`);
        }
      },
    });
    return this._instance;
  }

  //Handing error of request
  static handleError(fetchError: FetchError) {
    let statusCode = 0;
    let errors = [];

    if (fetchError != null && typeof fetchError !== "undefined") {
      if (
        typeof fetchError.statusCode !== "undefined" &&
        fetchError.statusCode > 0
      ) {
        statusCode = fetchError.statusCode;
      }

      if (typeof fetchError.data !== "undefined") {
        if (typeof fetchError.data.error !== "undefined") {
          if (typeof fetchError.data.error === "string") {
            errors.push(fetchError.data.error);
          } else if (Array.isArray(fetchError.data.error)) {
            errors = fetchError.data.error;
          } else {
            //fallback, stringify error
            errors.push(JSON.stringify(fetchError.data.error));
          }
        } else {
          //fallback, stringify data
          errors.push(JSON.stringify(fetchError.data));
        }
      } else if (typeof fetchError.statusText === "string") {
        errors.push(fetchError.statusText);
      }
    } else {
      errors.push("api_error_unexpected");
    }

    return new ApiError({ statusCode, errors });
  }

  static async cacheGet(key: string): Promise<string> {
    let value = "";

    //get the client first
    const client = myRedisService.getRedisClient();
    if (client !== null) {
      //get the value from cache
      const cachedData = await client.get(key);
      if (typeof cachedData === "string") {
        value = cachedData;
      }
    }

    return value;
  }

  static cacheSet(
    key: string,
    value: string,
    durationInSecond?: number
  ): boolean {
    let pass = false;

    let durationInMs = 0;
    if (typeof durationInSecond !== "undefined") {
      durationInMs = durationInSecond * 1000;
    } else if (
      typeof process.env.REDIS_KEY_DURATION_IN_SECOND !== "undefined"
    ) {
      durationInMs = +process.env.REDIS_KEY_DURATION_IN_SECOND * 1000;
    } else {
      //default is 15m
      durationInMs = 15 * 60 * 1000;
    }

    const client = myRedisService.getRedisClient();
    if (client !== null) {
      client.set(
        key,
        typeof value === "string" ? value : JSON.stringify(value),
        "PX",
        durationInMs
      );
      pass = true;
    }

    return pass;
  }
}

export default BaseApi;
