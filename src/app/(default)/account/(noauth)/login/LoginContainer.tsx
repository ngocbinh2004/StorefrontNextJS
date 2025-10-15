"use client";

import {
  UserAuthenticateProvider,
  UserAuthenticateRequest,
} from "@/common/types/CustomerForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";

import { useTranslation } from "@/app/i18n/client";

import UserNextApi from "@/common/api/next/UserNextApi";
import AuthenticatedCustomerModel from "@/common/models/AuthenticatedCustomerModel";
import AlertError from "@/components/shared/alert/AlertError";
import LoginForm from "./LoginForm";

interface LoginContainerProps {
  defaultPhone: string;
  returnUrl: string;
}

const LoginContainer: FC<LoginContainerProps> = ({
  defaultPhone,
  returnUrl,
}) => {
  const router = useRouter();
  const { t } = useTranslation("vn", ["user"]);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const postProcessAfterAuthenticated = useCallback(
    (_: AuthenticatedCustomerModel) => {
      setProcessing(true);
      router.replace(returnUrl.length > 0 ? returnUrl : "/account");
      //important to reload headerbar (profile component)
      router.refresh();
    },
    [router, returnUrl]
  );

  /**
   * Call login init to get passport (before realy login)
   */
  const doAuthenticate = useCallback(
    async (data: UserAuthenticateRequest) => {
      setErrors([]);
      setProcessing(true);
      const fetchedUser = await UserNextApi.authenticate(data);
      setProcessing(false);
      if (fetchedUser.hasError()) {
        setErrors(fetchedUser.error.errors);
      } else {
        postProcessAfterAuthenticated(fetchedUser);
      }
    },
    [postProcessAfterAuthenticated]
  );

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold text-center mb-4">Đăng nhập</h2>
        <p className="text-center text-sm mb-8 text-gray-700">
          Truy cập vào tài khoản của bạn
        </p>
      </div>

      {errors.length > 0 ? (
        <>
          <AlertError
            className="mb-4"
            translate_prefix="user:form.error"
            items={errors}
          />
        </>
      ) : null}

      <div className="max-w-md mx-auto space-y-6 ">
        <LoginForm
          processing={processing}
          doAuthenticate={doAuthenticate}
          defaultPhone={defaultPhone}
        />

        <div>
          <div className="text-center text-neutral-700 dark:text-neutral-300">
            Chưa có tài khoản? {` `}
            <Link
              className="text-primary hover:underline underline-offset-4"
              href="/account/signup"
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginContainer;
