import CustomerWishlistApi from "@/common/api/server/CustomerWishlistApi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { productid: string } }
) {
  const productId: number = +context.params.productid;

  const item = await CustomerWishlistApi.getDetailByProductId(productId);

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
