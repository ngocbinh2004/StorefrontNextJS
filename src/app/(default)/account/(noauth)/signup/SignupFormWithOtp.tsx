"use client";

import CustomerPassportModel from "@/common/models/CustomerPassportModel";
import { Button } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import OtpInput from "react18-input-otp";

interface SignupFormWithOtpProps {
  processing: boolean;
  doRegisterFinish: (v: string) => void;
  registerPassport: CustomerPassportModel;
  setRegisterPassport: (v?: CustomerPassportModel) => void;
  seconds: number;
  setSeconds: (v: number) => void;
  resendOtp: () => void;
}

const SignupFormWithOtp = ({
  processing,
  doRegisterFinish,
  registerPassport,
  setRegisterPassport,
  seconds,
  setSeconds,
  resendOtp,
}: SignupFormWithOtpProps) => {
  const { handleSubmit } = useForm<any>();

  const [otp, setOtp] = useState("");

  const clearPassport = useCallback(() => {
    setRegisterPassport(undefined);
    setOtp("");
  }, [setRegisterPassport]);

  const onSubmit = useCallback(() => {
    doRegisterFinish(otp);
  }, [doRegisterFinish, otp]);

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
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="text-sm text-gray-600">
          Vui lòng nhập mã OTP vào ô bên dưới. <br />
          (Chúng tôi đã gửi mã OTP tới Số điện thoại
          <span className="font-extrabold">{registerPassport.phone}</span>)
        </div>
        <OtpInput
          value={otp}
          onChange={(enteredOtp: string) => setOtp(enteredOtp)}
          numInputs={registerPassport.otp_length}
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

        <Button
          color={
            otp.length !== registerPassport.otp_length ? "default" : "primary"
          }
          type="submit"
          isLoading={processing}
          disabled={processing || otp.length !== registerPassport.otp_length}
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

export default SignupFormWithOtp;
