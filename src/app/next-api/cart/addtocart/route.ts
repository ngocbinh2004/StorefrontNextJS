import CustomerCartApi from "@/common/api/server/CustomerCartApi";
import { AddToCartRequest } from "@/common/types/CustomerCart";
import { revalidatePath } from "next/cache";
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

  //this page is request from ajax
  const parsedFormData = await (request as any).json();

  const data: AddToCartRequest = {
    product_variant_id: parsedFormData.product_variant_id,
    quantity: parsedFormData.quantity || 1,
  };

  //if cart is not init, we call api to init first
  let newCart = false;
  if (cart.isNotInit()) {
    cart = await CustomerCartApi.initCart(
      ip,
      [data],
      parsedFormData.section || ""
    );
    newCart = true;
  } else {
    cart = await CustomerCartApi.addToCart(cart.uuid, data);
  }

  if (cart.hasError()) {
    const res = new NextResponse(JSON.stringify({ error: cart.error.errors }), {
      headers: { "content-type": "application/json" },
      status: cart.error.statusCode,
    });

    return res;
  } else {
    const res = new NextResponse(JSON.stringify(cart.toJson()), {
      headers: { "content-type": "application/json" },
    });

    //set cookie for first created cart
    if (newCart) {
      res.cookies.set(
        process.env.NEXT_PUBLIC_SHOPPING_CART_COOKIE_NAME as string,
        cart.uuid,
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
    }

    revalidatePath("/shopping-cart");

    return res;
  }
}
