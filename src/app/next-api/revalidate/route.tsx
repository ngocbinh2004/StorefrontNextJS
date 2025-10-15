import { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag");

  if (typeof tag === "string" && tag.length > 0) {
    revalidateTag(tag);
  }

  return Response.json({ revalidated: true, now: Date.now() });
}
