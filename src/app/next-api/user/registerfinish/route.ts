import { NextResponse } from "next/server";
import { UserRegisterFinishRequest } from "@/common/types/CustomerForm";
import CustomerApi from "@/common/api/server/CustomerApi";

export async function POST(request: Request) {
  //this page is request directly from ajax
  const parsedFormData = await request.json();

  //prepare data
  const data: UserRegisterFinishRequest = {
    //Same as InitRequest
    full_name: parsedFormData.full_name,
    phone: parsedFormData.phone,
    email: parsedFormData.email,
    password: parsedFormData.password || "",

    //specify for FinishRequest
    passport_id: parsedFormData.passport_id,
    otp: parsedFormData.otp,
  };

  const newUser = await CustomerApi.doRegister(data);

  if (newUser.hasError()) {
    return new NextResponse(JSON.stringify({ error: newUser.error.errors }), {
      headers: { "content-type": "application/json" },
      status: newUser.error.statusCode,
    });
  } else {
    return NextResponse.json(newUser.toJson());
  }
}
