import PromotionCodeApi from "@/common/api/server/PromotionCodeApi";
import CustomerCartApi from "@/common/api/server/CustomerCartApi";
import { PromotionCodeCheckRequest } from "@/common/types/PromotionCode";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  //get current cart
  let cart = await CustomerCartApi.getDetail();

  //ensure cart have details
  if (cart.details.length > 0) {
    const parsedFormData = await request.json();

    const data: PromotionCodeCheckRequest = {
      code: parsedFormData.code || "",
      details: cart.details.map((item) => ({
        product_variant_id: item.product_variant_id,
        quantity: item.quantity,
      })),
    };

    const item = await PromotionCodeApi.check(data);

    if (item.hasError()) {
      const res = new NextResponse(
        JSON.stringify({ error: item.error.errors }),
        {
          headers: { "content-type": "application/json" },
          status: item.error.statusCode,
        }
      );

      return res;
    } else {
      const res = new NextResponse(JSON.stringify(item.toJson()), {
        headers: { "content-type": "application/json" },
      });

      return res;
    }
  } else {
    const res = new NextResponse(
      JSON.stringify({ error: "error_cart_empty" }),
      {
        headers: { "content-type": "application/json" },
        status: 422,
      }
    );

    return res;
  }
}
