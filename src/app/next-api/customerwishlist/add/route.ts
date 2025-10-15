import CustomerWishlistApi from "@/common/api/server/CustomerWishlistApi";
import { CustomerWishlistJsonAdd } from "@/common/types/CustomerWishlist";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const parsedFormData: CustomerWishlistJsonAdd = await request.json();

  const data: CustomerWishlistJsonAdd = {
    ...parsedFormData,
  };

  const item = await CustomerWishlistApi.addData(data);

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
