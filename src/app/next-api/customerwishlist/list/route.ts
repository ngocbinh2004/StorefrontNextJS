import CustomerSessionApi from "@/common/api/server/CustomerSessionApi";
import CustomerWishlistApi from "@/common/api/server/CustomerWishlistApi";
import CustomerWishlistCollection from "@/common/collections/CustomerWishlistCollection";
import { FilterValue } from "@/common/types/Filter";
import { FilterCustomerWishlist } from "@/common/types/CustomerWishlist";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const loggedUser = await CustomerSessionApi.getCurrentLoggedUserDetail();

  if (loggedUser.id > 0) {
    const parsedFormData = Object.fromEntries<FilterValue>(
      request.nextUrl.searchParams
    ) as FilterCustomerWishlist;

    const collection = await CustomerWishlistApi.getItems(parsedFormData);

    if (collection.hasError()) {
      const res = new NextResponse(
        JSON.stringify({ error: collection.error.errors }),
        {
          headers: { "content-type": "application/json" },
          status: collection.error.statusCode,
        }
      );

      return res;
    } else {
      const res = new NextResponse(JSON.stringify(collection.toJson()), {
        headers: { "content-type": "application/json" },
      });

      return res;
    }
  } else {
    const res = new NextResponse(
      JSON.stringify(new CustomerWishlistCollection()),
      {
        headers: { "content-type": "application/json" },
      }
    );

    return res;
  }
}
