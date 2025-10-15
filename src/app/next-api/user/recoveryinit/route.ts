import { NextResponse } from "next/server";

import { UserRecoveryInitRequest } from "@/common/types/CustomerForm";
import CustomerApi from "@/common/api/server/CustomerApi";

export async function POST(request: Request) {
  //this page is request from ajax
  const parsedFormData = await request.json();

  const data: UserRecoveryInitRequest = {
    phone: parsedFormData.phone,
  };

  const recoveryPassport = await CustomerApi.getRecoveryPassport(data);

  if (recoveryPassport.hasError()) {
    return new NextResponse(
      JSON.stringify({ error: recoveryPassport.error.errors }),
      {
        headers: { "content-type": "application/json" },
        status: recoveryPassport.error.statusCode,
      }
    );
  } else {
    return NextResponse.json(recoveryPassport.toJson());
  }
}
