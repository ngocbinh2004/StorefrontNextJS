"use client";

import { useTranslation } from "@/app/i18n/client";
import FormFieldErrorMessage from "@/components/shared/form/FormFieldErrorMessage";
import { UserAuthenticateRequest } from "@/common/types/CustomerForm";
import Link from "next/link";
import { useCallback, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import FormRequireIndicator from "@/components/shared/form/FormRequireIndicator";

interface LoginFormProps {
  processing: boolean;
  doAuthenticate: (v: UserAuthenticateRequest) => void;
  defaultPhone: string;
}

const LoginForm = ({
  processing,
  doAuthenticate,
  defaultPhone,
}: LoginFormProps) => {
  const { t } = useTranslation("vn", ["user"]);
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<UserAuthenticateRequest>
  >({});
  const { register, handleSubmit } = useForm<UserAuthenticateRequest>();

  const onSubmit = useCallback(
    (formData: UserAuthenticateRequest) => {
      //clear offline error
      setFieldErrors({});
      doAuthenticate(formData);
    },
    [doAuthenticate]
  );

  return (
    <>
      <form
        className="grid grid-cols-1 gap-6"
        onSubmit={handleSubmit(onSubmit, (err) => setFieldErrors(err))}
      >
        <label className="block">
          <span className="text-neutral-800 dark:text-neutral-200">
            Số điện thoại
            <FormRequireIndicator className="ml-1" />
          </span>
          <Input
            required
            labelPlacement="outside"
            variant="bordered"
            defaultValue={defaultPhone}
            tabIndex={1}
            type={"text"}
            {...register("phone", {
              required: {
                value: true,
                message: t("form.error.error_phone_required"),
              },
            })}
            className="mt-1"
          />
          <FormFieldErrorMessage fieldErrors={fieldErrors} name="phone" />
        </label>

        <label className="block">
          <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
            Mật khẩu
            <Link
              href="/account/recovery"
              className="text-sm text-primary hover:underline hover:underline-offset-4"
            >
              Quên mật khẩu?
            </Link>
          </span>

          <Input
            tabIndex={2}
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
          <FormFieldErrorMessage fieldErrors={fieldErrors} name="password" />
        </label>

        <Button
          type="submit"
          color="primary"
          isLoading={processing}
          disabled={processing}
          tabIndex={3}
        >
          Đăng nhập
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
