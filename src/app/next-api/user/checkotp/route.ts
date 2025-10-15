import { NextResponse } from "next/server";
import { UserCheckOtpRequest } from "@/common/types/CustomerForm";
import CustomerApi from "@/common/api/server/CustomerApi";

export async function POST(request: Request) {
  //this page is request directly from ajax
  const parsedFormData = await request.json();

  //prepare data
  const data: UserCheckOtpRequest = {
    action: parsedFormData.action,
    phone: parsedFormData.phone,
    passport_id: parsedFormData.passport_id,
    otp: parsedFormData.otp,
  };

  const result = await CustomerApi.doCheckOtp(data);

  if (result.hasError()) {
    return new NextResponse(JSON.stringify({ error: result.error.errors }), {
      headers: { "content-type": "application/json" },
      status: result.error.statusCode,
    });
  } else {
    return NextResponse.json(result.toJson());
  }
}
