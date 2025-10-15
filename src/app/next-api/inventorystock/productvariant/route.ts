import InventoryStockApi from "@/common/api/server/InventoryStockApi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const collection = await InventoryStockApi.getItems(
    request.nextUrl.searchParams.get("ids") || "",
    request.nextUrl.searchParams.get("from") || ""
  );

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
