import { redirect } from "next/navigation";
import SignupContainer from "./SignupContainer";

import CustomerSessionApi from "@/common/api/server/CustomerSessionApi";
import { Metadata } from "next";
import GoBack from "../GoBack";

export const metadata: Metadata = {
  title: "Tạo tài khoản",
  description: "Đăng ký",
};

interface SignupProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const Signup = async ({ searchParams }: SignupProps) => {
  //check if already login, redirect to home
  const loggedUser = await CustomerSessionApi.getCurrentLoggedUserDetail();

  if (loggedUser.id > 0) {
    redirect("/account");
  } else {
    return (
      <div className="md:flex w-full">
        <div className="p-8 mt-10 md:mx-auto md:w-full md:max-w-md border border-gray-200 rounded-lg relative">
          <div className="mt-4 ml-2 absolute">
            <GoBack href="/account/login" />
          </div>
          <SignupContainer />
        </div>
      </div>
    );
  }
};

export default Signup;
