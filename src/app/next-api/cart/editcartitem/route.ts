import CustomerCartApi from "@/common/api/server/CustomerCartApi";
import { CartItemEditRequest } from "@/common/types/CustomerCart";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  //get current cart
  let cart = await CustomerCartApi.getDetail();

  //this page is request from ajax
  const parsedFormData = await request.json();

  const data: CartItemEditRequest = {
    product_variant_id: parsedFormData.product_variant_id,
    quantity: parsedFormData.quantity,
  };

  //if cart is not init, we call api to init first
  const newCart = await CustomerCartApi.editCartItem(cart.uuid, data);

  if (newCart.hasError()) {
    const res = new NextResponse(
      JSON.stringify({ error: newCart.error.errors }),
      {
        headers: { "content-type": "application/json" },
        status: newCart.error.statusCode,
      }
    );

    return res;
  } else {
    const res = new NextResponse(JSON.stringify(newCart.toJson()), {
      headers: { "content-type": "application/json" },
    });

    return res;
  }
}
