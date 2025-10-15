import ShippingPriceApi from "@/common/api/server/ShippingPriceApi";
import { ShippingPriceCheckRequest } from "@/common/types/ShippingPrice";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const parsedFormData = await request.json();

  const data: ShippingPriceCheckRequest = {
    order_amount: parsedFormData.order_amount,
    region_id: parsedFormData.region_id || 0,
    sub_region_id: parsedFormData.sub_region_id || 0,
  };

  const collection = await ShippingPriceApi.check(data);

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
