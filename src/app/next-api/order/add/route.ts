import OrderApi from "@/common/api/server/OrderApi";
import CustomerCartApi from "@/common/api/server/CustomerCartApi";
import { CheckoutRequest } from "@/common/types/Checkout";
import { OrderAddRequest } from "@/common/types/Order";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  //extract ip
  let ip = request.headers.get("x-real-ip");
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (!ip && forwardedFor) {
    ip = forwardedFor?.split(",").at(0) ?? "Unknown";
  }

  //get current cart
  let cart = await CustomerCartApi.getDetail();

  if (cart.details.length > 0) {
    const parsedFormData: CheckoutRequest = await request.json();

    const data: OrderAddRequest = {
      ...parsedFormData,

      //cart related info
      details: cart.details,
      cart_uuid: cart.uuid,
      ip_address: ip || "",
    };

    const item = await OrderApi.add(data);

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

      //mark cart as finish
      CustomerCartApi.finishCart(cart.uuid, item.id.toString());

      //init new cart
      const newCart = await CustomerCartApi.initCart(ip, [], "orderadd");

      //update new cart
      res.cookies.set(
        process.env.NEXT_PUBLIC_SHOPPING_CART_COOKIE_NAME as string,
        newCart.uuid,
        {
          expires: new Date(
            Date.now() +
              86400 *
                1000 *
                parseInt(
                  process.env.NEXT_PUBLIC_JWT_COOKIE_DURATION_IN_DAY || "7"
                )
          ),
          httpOnly: true,
        }
      );

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
