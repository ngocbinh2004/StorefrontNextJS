import OrderApi from "@/common/api/server/OrderApi";
import { OrderCheckRequest } from "@/common/types/Order";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const parsedFormData: OrderCheckRequest = await request.json();

  const id: number = parsedFormData.id;

  const item = await OrderApi.getItem(id);

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
