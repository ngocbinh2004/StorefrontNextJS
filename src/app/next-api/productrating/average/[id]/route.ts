import ProductRatingApi from "@/common/api/server/ProductRatingApi";
import { AddProductRatingRequest } from "@/common/types/ProductRating";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const id: number = +context.params.id;

  const item = await ProductRatingApi.getAvgRating(id);

  if (item.hasError()) {
    const res = new NextResponse(JSON.stringify({ error: item.error.errors }), {
      headers: { "content-type": "application/json" },
      status: item.error.statusCode,
    });

    return res;
  } else {
    const res = new NextResponse(JSON.stringify(item.toJson()), {
      headers: { "content-type": "application/json" },
    });

    return res;
  }
}
