import OrderDetailApi from "@/common/api/server/OrderDetailApi";
import { FilterValue } from "@/common/types/Filter";
import { FilterOrderDetail } from "@/common/types/OrderDetail";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const parsedFormData = Object.fromEntries<FilterValue>(
    request.nextUrl.searchParams
  ) as FilterOrderDetail;

  const order_id = parsedFormData.order_id;

  const collection = await OrderDetailApi.getItems(order_id);

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
