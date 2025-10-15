import CustomerCartApi from "@/common/api/server/CustomerCartApi";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cart = await CustomerCartApi.getDetail();

  if (cart.hasError()) {
    const res = new NextResponse(JSON.stringify({ error: cart.error.errors }), {
      headers: { "content-type": "application/json" },
      status: 500,
    });

    return res;
  } else {
    const res = new NextResponse(JSON.stringify(cart.toJson()), {
      headers: { "content-type": "application/json" },
    });

    return res;
  }
}
