import ProductBundleApi from "@/common/api/server/ProductBundleApi";
import { FilterValue } from "@/common/types/Filter";
import { FilterProductBundle } from "@/common/types/ProductBundle";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const parsedFormData = Object.fromEntries<FilterValue>(
    request.nextUrl.searchParams
  ) as FilterProductBundle;

  const collection = await ProductBundleApi.getBundle(parsedFormData);

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
