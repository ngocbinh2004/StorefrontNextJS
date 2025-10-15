"use client";

import { useTranslation } from "@/app/i18n/client";
import { UserRecoveryInitRequest } from "@/common/types/CustomerForm";
import FormFieldErrorMessage from "@/components/shared/form/FormFieldErrorMessage";
import FormRequireIndicator from "@/components/shared/form/FormRequireIndicator";
import { Button, Input } from "@nextui-org/react";
import { useCallback, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

interface RecoveryFormProps {
  processing: boolean;
  doRecoveryInit: (v: UserRecoveryInitRequest) => void;
}

const RecoveryForm = ({ processing, doRecoveryInit }: RecoveryFormProps) => {
  const { t } = useTranslation("vn", ["user"]);
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<UserRecoveryInitRequest>
  >({});
  const { register, handleSubmit } = useForm<UserRecoveryInitRequest>();

  const onSubmit = useCallback(
    (formData: UserRecoveryInitRequest) => {
      //clear offline error
      setFieldErrors({});
      doRecoveryInit(formData);
    },
    [doRecoveryInit]
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

        <Button
          type="submit"
          color="primary"
          isLoading={processing}
          disabled={processing}
          tabIndex={3}
        >
          Tiếp tục
        </Button>
      </form>
    </>
  );
};

export default RecoveryForm;
