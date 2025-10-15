import ProductApi from "@/common/api/server/ProductApi";
import { FilterValue } from "@/common/types/Filter";
import { FilterProduct, FilterRequestBody } from "@/common/types/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const queryData = Object.fromEntries<FilterValue>(
    request.nextUrl.searchParams
  ) as FilterProduct;

  //store payload from POST
  let requestPayload: FilterRequestBody | undefined = undefined;
  try {
    requestPayload = await request.json();
  } catch (e) {}

  const collection = await ProductApi.search(queryData, requestPayload);

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
