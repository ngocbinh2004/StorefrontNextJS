import ProductVariantApi from "@/common/api/server/ProductVariantApi";
import { FilterValue } from "@/common/types/Filter";
import { FilterProductVariant } from "@/common/types/ProductVariant";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const parsedFormData = Object.fromEntries<FilterValue>(
    request.nextUrl.searchParams
  ) as FilterProductVariant;

  const collection = await ProductVariantApi.getItems(parsedFormData);

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
