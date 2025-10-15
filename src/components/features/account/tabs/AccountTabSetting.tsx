"use client";

import UserNextApi from "@/common/api/next/UserNextApi";
import { useTranslation } from "@/common/hooks/i18n/client";
import { CustomerJson } from "@/common/types/Customer";
import { UserUpdateRequest } from "@/common/types/CustomerForm";
import AlertError from "@/components/shared/alert/AlertError";
import FormFieldErrorMessage from "@/components/shared/form/FormFieldErrorMessage";
import LayoutSpinner from "@/components/shared/layout/spinner/Spinner";
import ToastContentList from "@/components/toast/ToastContentList";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const AccounTabSetting = ({ loggedUser }: { loggedUser: CustomerJson }) => {
  const { t } = useTranslation("vn", ["user"]);
  const router = useRouter();

  const [processing, setProcessing] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<UserUpdateRequest>
  >({});
  const { handleSubmit, reset, control } = useForm<UserUpdateRequest>();

  /**
   * Register Init Form Submit Handler
   */
  const onSubmit = useCallback(
    async (formData: UserUpdateRequest) => {
      setErrors([]);
      setFieldErrors({});
      setProcessing(true);

      const updateInfo = await UserNextApi.doUpdate({
        ...formData,
        email: formData.email !== "" ? formData.email : loggedUser.email,
      });
      if (updateInfo.hasError()) {
        setErrors(updateInfo.error.errors);
        setProcessing(false);
      } else {
        toast.success(
          <ToastContentList title={"Lưu thông tin tài khoản thành công"} />
        );
        setProcessing(false);

        // reset form
        reset();

        //important to reload headerbar (profile component)
        router.refresh();
      }
    },
    [reset, router, loggedUser]
  );

  return (
    <>
      {errors.length > 0 ? (
        <AlertError
          className="mb-4"
          translate_prefix="user:form.error"
          items={errors}
        />
      ) : null}
      {processing ? (
        <LayoutSpinner label="Đang xử lí thông tin" className="flex" />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit, (err) => setFieldErrors(err))}
          className="space-y-3"
        >
          <div className="grid grid-cols-12 max-md:grid-cols-1 max-md:gap-10">
            <div className="flex flex-col col-span-6 gap-3 ofset">
              <div className="space-y-4">
                <h5 className="font-bold text-primary">Thông tin liên hệ</h5>
                <div className="grid grid-cols-12 gap-x-6">
                  <div className="flex flex-col col-span-6">
                    <label className="block">
                      <Input
                        label="Số điện thoại"
                        aria-label="Số điện thoại"
                        disabled={true}
                        value={"0" + loggedUser.phone}
                        className="w-full mt-1"
                      />
                    </label>
                  </div>
                  <div className="flex flex-col col-span-6">
                    <label className="block">
                      <Input
                        label="User ID"
                        aria-label="User ID"
                        disabled={true}
                        value={loggedUser.id.toString()}
                        className="w-full mt-1"
                      />
                    </label>
                  </div>
                </div>

                <label className="block">
                  <Controller
                    render={({ field }) => (
                      <Input
                        {...field}
                        size="sm"
                        variant="bordered"
                        label="Họ và tên *"
                        aria-label="Họ và tên *"
                        className="mt-1"
                        placeholder={loggedUser.full_name}
                      />
                    )}
                    name="full_name"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: t("form.error.error_full_name_required"),
                      },
                    }}
                  />
                  <FormFieldErrorMessage
                    fieldErrors={fieldErrors}
                    name="full_name"
                  />
                </label>

                <label className="block">
                  <Controller
                    render={({ field }) => (
                      <Input
                        {...field}
                        size="sm"
                        variant="bordered"
                        type="email"
                        label="Email"
                        aria-label="Email *"
                        className="mt-1"
                        placeholder={loggedUser.email}
                      />
                    )}
                    name="email"
                    control={control}
                  />
                </label>

                <Button color="primary" type="submit">
                  Lưu thay đổi
                </Button>
              </div>
            </div>
            <div className="flex flex-col justify-start col-span-5 col-start-8 gap-2 text-sm max-md:col-span-1">
              <h4 className="text-xl font-bold text-primary"></h4>
            </div>
          </div>
          <Toaster toastOptions={{ success: { duration: 2000 } }} />
        </form>
      )}
    </>
  );
};

export default AccounTabSetting;
