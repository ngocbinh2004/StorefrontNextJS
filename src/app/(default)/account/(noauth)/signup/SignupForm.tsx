"use client";

import { useTranslation } from "@/app/i18n/client";
import { UserRegisterInitRequest } from "@/common/types/CustomerForm";
import FormFieldErrorMessage from "@/components/shared/form/FormFieldErrorMessage";
import FormRequireIndicator from "@/components/shared/form/FormRequireIndicator";
import { Button, Input } from "@nextui-org/react";
import { IconMail, IconPhone } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

interface SignupFormProps {
  processing: boolean;
  doRegisterInit: (v: UserRegisterInitRequest) => void;
}

const SignupForm = ({ processing, doRegisterInit }: SignupFormProps) => {
  const { t } = useTranslation("vn", ["user"]);
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<UserRegisterInitRequest>
  >({});
  const { register, handleSubmit } = useForm<UserRegisterInitRequest>();

  const onSubmit = useCallback(
    (data: UserRegisterInitRequest) => {
      //clear offline error
      setFieldErrors({});

      doRegisterInit(data);
    },
    [doRegisterInit]
  );

  return (
    <>
      <form
        className="grid grid-cols-1 gap-6"
        onSubmit={handleSubmit(onSubmit, (err) => setFieldErrors(err))}
      >
        <label className="block">
          <span className="text-neutral-800 dark:text-neutral-200">
            Tên của bạn <FormRequireIndicator />
          </span>
          <Input
            labelPlacement="outside"
            variant="bordered"
            {...register("full_name", {
              required: {
                value: true,
                message: t("form.error.error_full_name_required"),
              },
            })}
            className="mt-1"
          />
          <FormFieldErrorMessage fieldErrors={fieldErrors} name="full_name" />
        </label>

        <label className="block">
          <span className="text-neutral-800 dark:text-neutral-200">
            Điện thoại
            <FormRequireIndicator />
          </span>
          <Input
            labelPlacement="outside"
            variant="bordered"
            type="text"
            startContent={<IconPhone className="text-default-400" />}
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
          <span className="text-neutral-800 dark:text-neutral-200">
            Mật khẩu <FormRequireIndicator />
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
          <FormFieldErrorMessage fieldErrors={fieldErrors} name="password" />
        </label>

        <label className="block">
          <span className="text-neutral-800 dark:text-neutral-200">
            Địa chỉ email
          </span>
          <Input
            labelPlacement="outside"
            variant="bordered"
            type="text"
            startContent={<IconMail className="text-default-400" />}
            {...register("email")}
            className="mt-1"
          />
        </label>

        <Button
          isLoading={processing}
          color="primary"
          type="submit"
          disabled={processing}
        >
          Tiếp tục
        </Button>
      </form>
    </>
  );
};

export default SignupForm;
