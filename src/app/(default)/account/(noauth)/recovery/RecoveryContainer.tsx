"use client";

import { useTranslation } from "@/app/i18n/client";
import {
  UserCheckOtpRequest,
  UserRecoveryFinishRequest,
  UserRecoveryInitRequest,
} from "@/common/types/CustomerForm";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";

import UserNextApi from "@/common/api/next/UserNextApi";
import CustomerPassportModel from "@/common/models/CustomerPassportModel";
import AlertError from "@/components/shared/alert/AlertError";
import RecoveryForm from "./RecoveryForm";
import RecoveryFormWithOtp from "./RecoveryFormWithOtp";
import CustomerCheckOtpResultModel from "@/common/models/CustomerCheckOtpModel";

interface RecoveryContainerProps {}

const RecoveryContainer: FC<RecoveryContainerProps> = ({}) => {
  const router = useRouter();
  const { t } = useTranslation("vn", ["user"]);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  //otp related state
  const [seconds, setSeconds] = useState(0);
  const [recoveryPassport, setRecoveryPassport] =
    useState<CustomerPassportModel>();

  //store form data (to reused in OTP step)
  const [recoveryData, setRecoveryData] = useState<UserRecoveryInitRequest>({
    phone: "",
  });

  const [checkOtpResult, setCheckOtpResult] =
    useState<CustomerCheckOtpResultModel>();

  /**
   * Call register init to get passport (before realy register)
   */
  const doRecoveryInit = useCallback(async (data: UserRecoveryInitRequest) => {
    setErrors([]);
    setProcessing(true);
    const fetchedPassport = await UserNextApi.recoveryInit(data);
    setProcessing(false);
    if (fetchedPassport.hasError()) {
      setErrors(fetchedPassport.error.errors);
    } else {
      setRecoveryPassport(fetchedPassport);
      setRecoveryData(data);
      setSeconds(30);
    }
  }, []);

  /**
   * Call register finish to create user
   */
  const doCheckOtp = useCallback(
    async (otp: string) => {
      if (typeof recoveryPassport !== "undefined") {
        const data: UserCheckOtpRequest = {
          action: "recovery",
          ...recoveryData,
          passport_id: recoveryPassport.passport_id,
          otp,
        };

        setErrors([]);
        setProcessing(true);
        const checkResult = await UserNextApi.checkOtp(data);
        setProcessing(false);
        if (checkResult.hasError()) {
          setErrors(checkResult.error.errors);
        } else {
          setCheckOtpResult(checkResult);
        }
      } else {
        setErrors(["recoveryPassport is required"]);
      }
    },
    [recoveryPassport, recoveryData]
  );

  /**
   * Call register finish to create user
   */
  const doRecoveryFinish = useCallback(
    async (otp: string, password: string) => {
      if (typeof recoveryPassport !== "undefined") {
        const data: UserRecoveryFinishRequest = {
          ...recoveryData,
          passport_id: recoveryPassport.passport_id,
          otp,
          password,
        };

        setErrors([]);
        setProcessing(true);
        const newUser = await UserNextApi.recoveryFinish(data);
        setProcessing(false);
        if (newUser.hasError()) {
          setErrors(newUser.error.errors);
        } else {
          router.replace(
            "/account/login?recovery=" +
              dayjs().unix() +
              "&phone=" +
              newUser.phone
          );
        }
      } else {
        setErrors(["recoveryPassport is required"]);
      }
    },
    [router, recoveryPassport, recoveryData]
  );

  const resendOtp = useCallback(() => {
    if (typeof recoveryPassport !== "undefined") {
      setErrors([]);
      doRecoveryInit(recoveryData);
    }
  }, [doRecoveryInit, recoveryPassport, recoveryData]);

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
          {typeof recoveryPassport !== "undefined" ? (
            <>Xác nhận OTP</>
          ) : (
            <>Khôi phục tài khoản</>
          )}
        </h1>
        {typeof recoveryPassport === "undefined" && (
          <p className="text-center text-sm mb-8 text-gray-700">
            Nhập thông tin của bạn để tiến hành khôi phục tài khoản
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
        {typeof recoveryPassport !== "undefined" ? (
          <>
            <RecoveryFormWithOtp
              processing={processing}
              doRecoveryFinish={doRecoveryFinish}
              doCheckOtp={doCheckOtp}
              checkOtpResult={checkOtpResult}
              setCheckOtpResult={setCheckOtpResult}
              recoveryPassport={recoveryPassport}
              setRecoveryPassport={setRecoveryPassport}
              seconds={seconds}
              setSeconds={setSeconds}
              resendOtp={resendOtp}
            />
          </>
        ) : (
          <RecoveryForm
            processing={processing}
            doRecoveryInit={doRecoveryInit}
          />
        )}

        {/* ==== */}
        {typeof recoveryPassport === "undefined" ? (
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Bạn đã có tài khoản? {` `}
            <Link
              className="text-neutral-500 hover:underline underline-offset-4"
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

export default RecoveryContainer;
