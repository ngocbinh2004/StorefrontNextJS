import OrderApi from "@/common/api/server/OrderApi";
import { InstallmentRequest } from "@/common/types/Installment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  //extract ip
  let ip = request.headers.get("x-real-ip");
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (!ip && forwardedFor) {
    ip = forwardedFor?.split(",").at(0) ?? "Unknown";
  }

  const parsedFormData: InstallmentRequest = await request.json();

  const data: InstallmentRequest = {
    ...parsedFormData,
    ip_address: ip || "",
  };

  const item = await OrderApi.createInstallment(data);

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

    //Clear cart

    return res;
  }
}
