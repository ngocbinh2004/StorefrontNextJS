import CustomerWishlistApi from "@/common/api/server/CustomerWishlistApi";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const id: number = +context.params.id;

  const item = await CustomerWishlistApi.deleteData(id);

  if (item.length > 0) {
    const res = new NextResponse(JSON.stringify({ error: item }), {
      headers: { "content-type": "application/json" },
    });

    return res;
  } else {
    const res = new NextResponse(JSON.stringify(item), {
      headers: { "content-type": "application/json" },
    });
    return res;
  }
}
