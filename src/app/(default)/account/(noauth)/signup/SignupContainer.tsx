"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  UserRegisterInitRequest,
  UserRegisterFinishRequest,
} from "@/common/types/CustomerForm";
import { useTranslation } from "@/app/i18n/client";
import dayjs from "dayjs";
import SignupForm from "./SignupForm";
import SignupFormWithOtp from "./SignupFormWithOtp";
import AlertError from "@/components/shared/alert/AlertError";
import CustomerPassportModel from "@/common/models/CustomerPassportModel";
import UserNextApi from "@/common/api/next/UserNextApi";

const PageAccountSignUp = () => {
  const router = useRouter();

  const { t } = useTranslation("vn", ["translation", "user"]);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const [seconds, setSeconds] = useState(0);

  const [registerPassport, setRegisterPassport] =
    useState<CustomerPassportModel>();

  //store form data (to reused in OTP step)
  const [registerInitData, setRegisterInitData] =
    useState<UserRegisterInitRequest>({
      full_name: "",
      phone: "",
      email: "",
      password: "",
    });

  /**
   * Call register init to get passport (before realy register)
   */
  const doRegisterInit = useCallback(async (data: UserRegisterInitRequest) => {
    setErrors([]);
    setProcessing(true);
    const fetchedPassport = await UserNextApi.registerInit(data);
    setProcessing(false);
    if (fetchedPassport.hasError()) {
      setErrors(fetchedPassport.error.errors);
    } else {
      setRegisterPassport(fetchedPassport);
      setRegisterInitData(data);
      setSeconds(30);
    }
  }, []);

  /**
   * Call register finish to create user
   */
  const doRegisterFinish = useCallback(
    async (otp: string) => {
      if (typeof registerPassport !== "undefined") {
        const data: UserRegisterFinishRequest = {
          ...registerInitData,
          passport_id: registerPassport.passport_id,
          otp: otp,
        };

        setErrors([]);
        setProcessing(true);
        const newUser = await UserNextApi.registerFinish(data);
        setProcessing(false);
        if (newUser.hasError()) {
          setErrors(newUser.error.errors);
        } else {
          router.replace(
            "/account/login?signup=" +
              dayjs().unix() +
              "&phone=" +
              newUser.phone
          );
        }
      } else {
        setErrors(["registerPassport is required"]);
      }
    },
    [router, registerPassport, registerInitData]
  );

  const resendOtp = useCallback(() => {
    if (typeof registerPassport !== "undefined") {
      setErrors([]);
      doRegisterInit(registerInitData);
    }
  }, [doRegisterInit, registerPassport, registerInitData]);

  //timer update
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold text-center mb-4">
          {typeof registerPassport !== "undefined" ? (
            <>Xác nhận OTP</>
          ) : (
            <>Đăng ký</>
          )}
        </h1>
        {typeof registerPassport === "undefined" && (
          <p className="text-center text-sm mb-8 text-gray-700">
            Tạo tài khoản
          </p>
        )}
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
        {typeof registerPassport !== "undefined" ? (
          <>
            <SignupFormWithOtp
              processing={processing}
              doRegisterFinish={doRegisterFinish}
              registerPassport={registerPassport}
              setRegisterPassport={setRegisterPassport}
              seconds={seconds}
              setSeconds={setSeconds}
              resendOtp={resendOtp}
            />
          </>
        ) : (
          <SignupForm processing={processing} doRegisterInit={doRegisterInit} />
        )}

        {/* ==== */}
        {typeof registerPassport === "undefined" ? (
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Bạn đã có tài khoản? {` `}
            <Link
              className="text-primary hover:underline underline-offset-4"
              href="/account/login"
            >
              Đăng nhập
            </Link>
          </span>
        ) : null}
      </div>
    </>
  );
};

export default PageAccountSignUp;
