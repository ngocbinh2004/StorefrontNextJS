"use client";

import { useTranslation } from "@/app/i18n/client";
import CustomerCheckOtpResultModel from "@/common/models/CustomerCheckOtpModel";
import CustomerPassportModel from "@/common/models/CustomerPassportModel";
import { UserRecoveryFinishRequest } from "@/common/types/CustomerForm";
import FormFieldErrorMessage from "@/components/shared/form/FormFieldErrorMessage";
import { Button, Input } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import OtpInput from "react18-input-otp";

interface RecoveryFormWithOtpProps {
  processing: boolean;
  doRecoveryFinish: (v: string, v2: string) => void;
  doCheckOtp: (v: string) => void;
  checkOtpResult?: CustomerCheckOtpResultModel;
  setCheckOtpResult: (v?: CustomerCheckOtpResultModel) => void;
  recoveryPassport: CustomerPassportModel;
  setRecoveryPassport: (v?: CustomerPassportModel) => void;
  seconds: number;
  setSeconds: (v: number) => void;
  resendOtp: () => void;
}

const RecoveryFormWithOtp = ({
  processing,
  doRecoveryFinish,
  recoveryPassport,
  setRecoveryPassport,
  doCheckOtp,
  checkOtpResult,
  setCheckOtpResult,
  seconds,
  setSeconds,
  resendOtp,
}: RecoveryFormWithOtpProps) => {
  const { t } = useTranslation("vn", ["user"]);

  const { register, handleSubmit, getValues } =
    useForm<UserRecoveryFinishRequest>();

  const [otp, setOtp] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<UserRecoveryFinishRequest>
  >({});

  const clearPassport = useCallback(() => {
    setRecoveryPassport(undefined);
    setOtp("");
  }, [setRecoveryPassport]);

  const onSubmit = useCallback(() => {
    setFieldErrors({});

    if (
      typeof checkOtpResult !== "undefined" &&
      checkOtpResult.status === "success"
    ) {
      doRecoveryFinish(otp, getValues("password"));
    } else {
      doCheckOtp(otp);
    }
  }, [doRecoveryFinish, doCheckOtp, checkOtpResult, otp, getValues]);

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
  }, [seconds, setSeconds]);

  return (
    <>
      <form
        className="grid grid-cols-1 gap-6 text-center"
        onSubmit={handleSubmit(onSubmit, (err) => setFieldErrors(err))}
      >
        {typeof checkOtpResult === "undefined" ||
        checkOtpResult.status !== "success" ? (
          <>
            <div className="text-sm text-gray-600">
              Vui lòng nhập mã OTP vào ô bên dưới. <br />
              (Chúng tôi đã gửi mã OTP tới tài khoản Zalo có Số điện thoại&nbsp;
              <span className="font-extrabold">{recoveryPassport.phone}</span>)
            </div>
            <OtpInput
              value={otp}
              onChange={(enteredOtp: string) => setOtp(enteredOtp)}
              numInputs={recoveryPassport.otp_length}
              separator={
                <>
                  <span className="w-3"></span>
                </>
              }
              className="items-center justify-center"
              autoComplete="one-time-code"
              isInputNum={true}
              isDisabled={processing}
              containerStyle="justify-center"
              inputStyle="text-4xl w-14 text-center rounded-md border border-input bg-transparent px-3 py-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              inputProps={{ style: { padding: "8px 16px" } }}
            />

            <div>
              <button
                type="button"
                className="font-medium text-sm text-blue-600 dark:text-primary-500 disabled:text-gray-400"
                onClick={() => setOtp("")}
                disabled={otp.length === 0}
              >
                Xoá
              </button>
              <span className="w-8 inline-block"></span>

              <button
                type="button"
                className="font-medium text-sm text-blue-600 dark:text-primary-500 disabled:text-gray-400 "
                onClick={() => seconds === 0 && resendOtp()}
                disabled={seconds > 0}
              >
                Gửi lại OTP
                <span>{seconds > 0 ? <> ({seconds}s)</> : null}</span>
              </button>
            </div>
          </>
        ) : null}

        {typeof checkOtpResult !== "undefined" &&
        checkOtpResult.status == "success" ? (
          <div className="p-4 pt-2 bg-orange-50 rounded">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Nhập mật khẩu mới
              </span>
              <Input
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: t("form.error.error_password_required"),
                  },
                  minLength: {
                    value: 6,
                    message: t("form.error.error_password_length_invalid"),
                  },
                })}
                className="mt-1"
              />
              <FormFieldErrorMessage
                fieldErrors={fieldErrors}
                name="password"
              />
            </label>
          </div>
        ) : null}

        <Button
          isLoading={processing}
          color={
            otp.length !== recoveryPassport.otp_length ? "default" : "primary"
          }
          type="submit"
          disabled={processing || otp.length !== recoveryPassport.otp_length}
        >
          Hoàn tất
        </Button>
        <button
          onClick={() => clearPassport()}
          className="text-gray-500 text-sm hover:text-blue-600"
        >
          &laquo; Quay lại
        </button>
      </form>
    </>
  );
};

export default RecoveryFormWithOtp;
