import PaymentMomoApi from "@/common/api/server/PaymentMomoApi";
import { PaymentMomoRequest } from "@/common/types/PaymentMomo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  //extract ip
  let ip = request.headers.get("x-real-ip");
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (!ip && forwardedFor) {
    ip = forwardedFor?.split(",").at(0) ?? "Unknown";
  }

  const parsedFormData: PaymentMomoRequest = await request.json();

  const data: PaymentMomoRequest = {
    ...parsedFormData,
  };

  const item = await PaymentMomoApi.add(data);

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
