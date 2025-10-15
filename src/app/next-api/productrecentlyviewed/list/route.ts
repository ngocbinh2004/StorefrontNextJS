import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const nextCookies = request.cookies;

  const productIds = nextCookies.get(
    process.env.NEXT_PUBLIC_RECENTLY_VIEWED_PRODUCT_COOKIE_NAME as string,
  )?.value;

  const res = new NextResponse(JSON.stringify({ idList: productIds }), {
    headers: { "content-type": "application/json" },
  });

  return res;
}
