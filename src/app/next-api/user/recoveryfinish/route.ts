import { NextResponse } from "next/server";
import { UserRecoveryFinishRequest } from "@/common/types/CustomerForm";
import CustomerApi from "@/common/api/server/CustomerApi";

export async function POST(request: Request) {
  //this page is request directly from ajax
  const parsedFormData = await request.json();

  //prepare data
  const data: UserRecoveryFinishRequest = {
    phone: parsedFormData.phone,
    password: parsedFormData.password,
    passport_id: parsedFormData.passport_id,
    otp: parsedFormData.otp,
  };

  const foundUser = await CustomerApi.doRecovery(data);

  if (foundUser.hasError()) {
    return new NextResponse(JSON.stringify({ error: foundUser.error.errors }), {
      headers: { "content-type": "application/json" },
      status: foundUser.error.statusCode,
    });
  } else {
    return NextResponse.json(foundUser.toJson());
  }
}
