import CustomerAddressApi from "@/common/api/server/CustomerAddressApi";
import { FilterValue } from "@/common/types/Filter";
import { FilterCustomerAddress } from "@/common/types/CustomerAddress";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const parsedFormData = Object.fromEntries<FilterValue>(
    request.nextUrl.searchParams
  ) as FilterCustomerAddress;

  const collection = await CustomerAddressApi.getItems(parsedFormData);

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
}
