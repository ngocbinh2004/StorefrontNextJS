import CustomerSessionApi from "@/common/api/server/CustomerSessionApi";
import AlertSuccess from "@/components/shared/alert/AlertSuccess";
import dayjs from "dayjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginContainer from "./LoginContainer";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Truy cập vào tài khoản của bạn để sử dụng các tính năng",
};

interface LoginPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const LoginPage = async ({ searchParams }: LoginPageProps) => {
  //check to show create success && ensure DO NOT show if value is too old
  const signupTimestamp = parseInt(
    typeof searchParams.signup === "string" ? searchParams.signup : ""
  );
  const signupPhone =
    typeof searchParams.phone === "string" ? searchParams.phone : "";

  const returnUrl =
    typeof searchParams.return_url === "string" ? searchParams.return_url : "";

  //check to show recovery success && ensure DO NOT show if value is too old
  const recoveryTimestamp = parseInt(
    typeof searchParams.recovery === "string" ? searchParams.recovery : ""
  );

  //fetch type of login (provider)
  const loginProvider =
    typeof searchParams.provider === "string" &&
    searchParams.provider === "google"
      ? searchParams.provider
      : "";

  //check if already login, redirect to home
  const loggedUser = await CustomerSessionApi.getCurrentLoggedUserDetail();

  if (loggedUser.id > 0) {
    redirect("/account");
  } else {
    //get viewing company
    return (
      <div className="md:flex w-full">
        <div className="p-8 mt-10 md:mx-auto md:w-full md:max-w-md  border border-gray-200 rounded-lg">
          {!isNaN(signupTimestamp) && dayjs().unix() - signupTimestamp < 60 && (
            <AlertSuccess
              title={"Tài khoản của bạn đã được tạo thành công"}
              className="mb-8"
            >
              <p>{"Vui lòng đăng nhập để tiếp tục"}</p>
            </AlertSuccess>
          )}
          {!isNaN(recoveryTimestamp) &&
            dayjs().unix() - recoveryTimestamp < 600 && (
              <AlertSuccess
                title="Tài khoản của bạn đã được cập nhật mật khẩu mới"
                className="mb-8"
              >
                <p>
                  Bạn vui lòng đăng nhập với mật khẩu vừa cài đặt để tiếp tục sử
                  dụng.
                </p>
              </AlertSuccess>
            )}

          <LoginContainer defaultPhone={signupPhone} returnUrl={returnUrl} />
        </div>
      </div>
    );
  }
};

export default LoginPage;
