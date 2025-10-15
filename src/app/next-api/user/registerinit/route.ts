import CustomerApi from "@/common/api/server/CustomerApi";
import { UserRegisterInitRequest } from "@/common/types/CustomerForm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  //this page is request from ajax
  const parsedFormData = await request.json();

  const data: UserRegisterInitRequest = {
    full_name: parsedFormData.full_name,
    phone: parsedFormData.phone,
    email: parsedFormData.email,
    password: parsedFormData.password || "",
  };

  const registerPassport = await CustomerApi.getRegisterPassport(data);

  if (registerPassport.hasError()) {
    return new NextResponse(
      JSON.stringify({ error: registerPassport.error.errors }),
      {
        headers: { "content-type": "application/json" },
        status: registerPassport.error.statusCode,
      }
    );
  } else {
    return NextResponse.json(registerPassport.toJson());
  }
}
