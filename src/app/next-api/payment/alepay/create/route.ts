import PaymentAlePayApi from "@/common/api/server/PaymentAlePayApi";
import { FilterValue } from "@/common/types/Filter";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // const parsedFormData = Object.fromEntries<FilterValue>(
  //   request.nextUrl.searchParams
  // ) as { ecom_platform_order_id: string };

  const parsedFormData = await request.json();

  console.log(parsedFormData.ecom_platform_order_id);

  const collection = await PaymentAlePayApi.create(
    parsedFormData.ecom_platform_order_id
  );

  const res = new NextResponse(JSON.stringify(collection), {
    headers: { "content-type": "application/json" },
  });

  return res;
}
