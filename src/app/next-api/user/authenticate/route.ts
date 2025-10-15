import { NextResponse } from "next/server";
import { UserAuthenticateRequest } from "@/common/types/CustomerForm";
import CustomerServerApi from "@/common/api/server/CustomerApi";

export async function POST(request: Request) {
  //this page is request from ajax
  const parsedFormData = await request.json();

  const data: UserAuthenticateRequest = {
    phone: parsedFormData.phone,
    password: parsedFormData.password || "",
  };

  const authenticatedCustomer = await CustomerServerApi.authenticate(data);

  if (authenticatedCustomer.hasError()) {
    const res = new NextResponse(
      JSON.stringify({ error: authenticatedCustomer.error.errors }),
      {
        headers: { "content-type": "application/json" },
        status: authenticatedCustomer.error.statusCode,
      }
    );

    //incase jwt blacklist (error_jwt_blacklisted), we delete session cookie
    if (authenticatedCustomer.error.statusCode === 400) {
      //remove AUTHENTICATION cookie
      res.cookies.set(process.env.NEXT_PUBLIC_JWT_COOKIE_NAME as string, "", {
        expires: new Date(0),
        httpOnly: true,
        domain: process.env.NEXT_PUBLIC_JWT_COOKIE_DOMAIN,
      });
    }

    return res;
  } else {
    const res = new NextResponse(
      JSON.stringify(authenticatedCustomer.toJson()),
      {
        headers: { "content-type": "application/json" },
      }
    );

    //set cookie for later authentication
    if (authenticatedCustomer.jwt.length > 0) {
      res.cookies.set(
        process.env.NEXT_PUBLIC_JWT_COOKIE_NAME as string,
        authenticatedCustomer.jwt,
        {
          expires: new Date(
            Date.now() +
              86400 *
                1000 *
                parseInt(
                  process.env.NEXT_PUBLIC_JWT_COOKIE_DURATION_IN_DAY || "7"
                )
          ),
          httpOnly: true,
        }
      );
    }

    return res;
  }
}
