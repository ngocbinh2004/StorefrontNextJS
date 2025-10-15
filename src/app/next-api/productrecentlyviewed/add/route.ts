import { RecentlyViewedProductJson } from "@/common/types/ProductRecentlyViewed";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const parsedFormData: RecentlyViewedProductJson = await request.json();

  const res = new NextResponse(JSON.stringify({}), {
    headers: { "content-type": "application/json" },
  });

  // set recently viewed product
  res.cookies.set(
    process.env.NEXT_PUBLIC_RECENTLY_VIEWED_PRODUCT_COOKIE_NAME as string,
    parsedFormData.idList,
    {
      expires: new Date(
        Date.now() +
          86400 *
            1000 *
            parseInt(process.env.NEXT_PUBLIC_JWT_COOKIE_DURATION_IN_DAY || "7"),
      ),
      httpOnly: true,
    },
  );

  return res;
}
