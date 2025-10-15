"use client";

import PreOrderNextApi from "@/common/api/next/PreOrderNextApi";
import PreOrderModel from "@/common/models/PreOrderModel";
import { PreOrderJsonAdd, PreOrderRequest } from "@/common/types/PreOrder";
import { ProductVariantJson } from "@/common/types/ProductVariant";
import AlertError from "@/components/shared/alert/AlertError";
import FormFieldErrorMessage from "@/components/shared/form/FormFieldErrorMessage";
import ToastContentList from "@/components/toast/ToastContentList";
import { Button, Input, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import { useCallback, useState } from "react";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const PreOrderFormRegister = ({
  variant,
  onSaveSuccess,
}: {
  variant: ProductVariantJson;
  onSaveSuccess: (item: PreOrderModel) => void;
}) => {
  const [processing, setProcessing] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<PreOrderRequest>>(
    {},
  );
  const { handleSubmit, control, setValue } = useForm<PreOrderRequest>();

  /**
   * Register Init Form Submit Handler
   */
  const onSubmit = useCallback(
    async (formData: PreOrderRequest) => {
      setErrors([]);
      setProcessing(true);

      let body: PreOrderJsonAdd = {
        ...formData,
        product_id: variant.product_id,
        product_variant_id: variant.id,
        quantity: 1,
        price_final: variant.price,
        price_deposit: 0,
        external_id: variant.external_id,
        sale_order_id: 0,
      };

      const createData = await PreOrderNextApi.add(body);
      if (createData.hasError()) {
        setErrors(createData.error.errors);
      } else {
        toast.success(
          <ToastContentList
            title={"Đăng kí nhận thông tin khi có hàng thành công"}
          />,
        );

        // callback
        onSaveSuccess(createData);

        // Reset the form after submission
        setValue("deposit_method", "");
        setValue("email", "");
        setValue("full_name", "");
        setValue("note", "");
        setValue("phone", "");
      }

      setProcessing(false);
    },
    [setValue, onSaveSuccess, variant],
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
      <form
        onSubmit={handleSubmit(onSubmit, (err) => setFieldErrors(err))}
        className="space-y-3">
        <h2 className="text-sm font-bold uppercase text-primary">
          Đăng kí nhận thông tin khi có hàng
        </h2>
        <label className="block">
          <Controller
            render={({ field }) => (
              <Input
                {...field}
                id="full_name"
                size="sm"
                variant="bordered"
                label="Họ và tên *"
                aria-label="Họ và tên *"
                className="mt-1"
              />
            )}
            name="full_name"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Bạn chưa nhập họ và tên",
              },
            }}
          />
          <FormFieldErrorMessage fieldErrors={fieldErrors} name="full_name" />
        </label>

        <label className="block">
          <Controller
            render={({ field }) => (
              <Input
                {...field}
                id="email"
                size="sm"
                variant="bordered"
                type="email"
                label="Email *"
                aria-label="Email *"
                className="mt-1"
              />
            )}
            name="email"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Bạn chưa nhập email",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Email không hợp lệ",
              },
            }}
          />
          <FormFieldErrorMessage fieldErrors={fieldErrors} name="email" />
        </label>

        <label className="block">
          <Controller
            render={({ field }) => (
              <Input
                {...field}
                id="phone"
                size="sm"
                variant="bordered"
                type="phone"
                label="Số điện thoại *"
                aria-label="Số điện thoại *"
                className="mt-1"
              />
            )}
            name="phone"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Bạn chưa nhập số điện thoại",
              },
              minLength: {
                value: 9,
                message: "Số điện thoại không hợp lệ",
              },
            }}
          />
          <FormFieldErrorMessage fieldErrors={fieldErrors} name="phone" />
        </label>

        <label className="block">
          <Controller
            render={({ field }) => (
              <Textarea
                {...field}
                id="note"
                size="sm"
                variant="bordered"
                label="Ghi chú"
                aria-label="Ghi chú"
                className="mt-1"
              />
            )}
            name="note"
            control={control}
          />
        </label>

        <label className="block">
          <Controller
            control={control}
            name="deposit_method"
            render={({ field }) => (
              <RadioGroup
                {...field}
                id="deposit_method"
                className="-gap-1"
                orientation="horizontal"
                size="sm">
                <div className="-mt-1 space-x-4">
                  {PreOrderModel.getDepositMethodList().map((i) => (
                    <Radio key={i.value} value={i.value.toString()}>
                      {i.label}
                    </Radio>
                  ))}
                </div>
              </RadioGroup>
            )}
            rules={{
              required: {
                value: true,
                message: "Bạn chưa chọn hình thức đặt cọc",
              },
            }}
          />
          <FormFieldErrorMessage
            fieldErrors={fieldErrors}
            name="deposit_method"
          />
        </label>

        <Button
          color="primary"
          type="submit"
          size="lg"
          fullWidth
          isLoading={processing}>
          <div className="flex flex-col items-center justify-center">
            <p className="font-bold uppercase">Đăng kí</p>
            <p className="text-sm text-center ">
              Hotline hỗ trợ{" "}
              <span className="font-bold">
                <a>1800.6018</a>
              </span>{" "}
            </p>
          </div>
        </Button>
        <Toaster toastOptions={{ success: { duration: 2000 } }} />
      </form>
    </>
  );
};

export default PreOrderFormRegister;
