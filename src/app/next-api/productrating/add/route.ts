import CustomerSessionApi from "@/common/api/server/CustomerSessionApi";
import ProductRatingApi from "@/common/api/server/ProductRatingApi";
import { AddProductRatingRequest } from "@/common/types/ProductRating";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  //extract ip
  let ip = request.headers.get("x-real-ip");
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (!ip && forwardedFor) {
    ip = forwardedFor?.split(",").at(0) ?? "Unknown";
  }

  const loggedUser = await CustomerSessionApi.getCurrentLoggedUserDetail();
  const parsedFormData: AddProductRatingRequest = await request.json();

  const data: AddProductRatingRequest = {
    ...parsedFormData,
    ip_address: ip || "",
  };

  const item = await ProductRatingApi.add(data.product_id, data);

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
