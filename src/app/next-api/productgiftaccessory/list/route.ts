import ProductGiftAccessoryApi from "@/common/api/server/ProductGiftAccessoryApi";
import { FilterValue } from "@/common/types/Filter";
import { FilterProductGiftAccessory } from "@/common/types/ProductGiftAccessory";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const parsedFormData = Object.fromEntries<FilterValue>(
    request.nextUrl.searchParams
  ) as FilterProductGiftAccessory;

  const collection = await ProductGiftAccessoryApi.getGiftAccessory(
    parsedFormData
  );

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
