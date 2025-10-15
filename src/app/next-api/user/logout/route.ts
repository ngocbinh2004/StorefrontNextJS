import CustomerSessionApi from "@/common/api/server/CustomerSessionApi";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  //get logout errors
  const errors: string[] = await CustomerSessionApi.logout();
  console.log("route handler logout", errors);

  const res = new NextResponse(JSON.stringify({ error: errors }), {
    headers: { "content-type": "application/json" },
    status: 200,
  });

  //remove AUTHENTICATION cookie
  res.cookies.set(process.env.NEXT_PUBLIC_JWT_COOKIE_NAME as string, "", {
    expires: new Date(0),
    httpOnly: true,
  });

  return res;
}
