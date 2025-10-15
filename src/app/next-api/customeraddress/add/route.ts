import CustomerAddressApi from "@/common/api/server/CustomerAddressApi";
import { CustomerAddressJsonAddEdit } from "@/common/types/CustomerAddress";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const parsedFormData: CustomerAddressJsonAddEdit = await request.json();

  const item = await CustomerAddressApi.add(parsedFormData);

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
