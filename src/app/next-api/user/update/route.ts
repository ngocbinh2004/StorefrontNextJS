import CustomerApi from "@/common/api/server/CustomerApi";
import { UserUpdateRequest } from "@/common/types/CustomerForm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  //this page is request directly from ajax
  const parsedFormData = await request.json();

  //prepare data
  const data: UserUpdateRequest = {
    full_name: parsedFormData.full_name,
    email: parsedFormData.email,
  };

  const newUser = await CustomerApi.doUpdate(data);

  if (newUser.hasError()) {
    return new NextResponse(JSON.stringify({ error: newUser.error.errors }), {
      headers: { "content-type": "application/json" },
      status: newUser.error.statusCode,
    });
  } else {
    return NextResponse.json(newUser.toJson());
  }
}
