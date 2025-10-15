import { cookies } from "next/headers";
import BaseApi from "./BaseApi";

class ProductRecentlyViewedApi extends BaseApi {
  static async getItems(): Promise<string> {
    let items = "";

    const nextCookies = cookies();
    const productIds = nextCookies.get(
      process.env.NEXT_PUBLIC_RECENTLY_VIEWED_PRODUCT_COOKIE_NAME as string,
    )?.value;

    if (productIds) {
      items = productIds
        .split(".")
        .map((i: string) => +i)
        .join(".");
    }

    return items;
  }
}

export default ProductRecentlyViewedApi;
