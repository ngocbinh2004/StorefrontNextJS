import PaymentAlePayApi from "@/common/api/server/PaymentAlePayApi";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const collection = await PaymentAlePayApi.getBankList();

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
