import PageBlockApi from "@/common/api/server/PageBlockApi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const parsedFormData = Object.fromEntries<string>(
    request.nextUrl.searchParams
  ) as { identifier: string };

  const identifier: string = parsedFormData.identifier;

  const item = await PageBlockApi.getDetailByIdentifier(identifier);

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

    return res;
  }
}
