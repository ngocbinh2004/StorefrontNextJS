"use client";
import { useTranslation } from "@/app/i18n/client";
import ProductCommentNextApi from "@/common/api/next/ProductCommentNextApi";
import { ProductJson } from "@/common/types/Product";
import { ProductCommentRequest } from "@/common/types/ProductComment";
import FormFieldErrorMessage from "@/components/shared/form/FormFieldErrorMessage";
import ToastContentList from "@/components/toast/ToastContentList";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { useCallback, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

export default function ProductCommentForm({
  product,
}: {
  product: ProductJson;
}) {
  const { t } = useTranslation("vn", ["productcomment"]);

  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<ProductCommentRequest>
  >({});
  const [processing, setProcessing] = useState(false);
  const { register, handleSubmit, reset } = useForm<ProductCommentRequest>();

  const onSubmit = useCallback(
    async (formData: ProductCommentRequest) => {
      setFieldErrors({});
      setProcessing(true);

      const data = {
        ...formData,
        product_id: product.id,
      };
      const myObj = await ProductCommentNextApi.add(data);

      setProcessing(false);

      if (myObj.hasError()) {
        //show error
        toast.error(
          <ToastContentList
            title={t("productcomment:form.error.error_heading")}
            items={myObj.error.errors}
            translate_prefix="productcomment:form.error"
          />,
        );
      } else {
        toast.success(
          <ToastContentList
            title={t("productcomment:form.success.heading")}
            items={["success"]}
            translate_prefix="productcomment:form.success"
          />,
        );
      }

      reset();
    },
    [product.id, t, reset],
  );

  return (
    <div className="mb-5">
      <form
        className="flex items-start justify-between w-full gap-2 mt-4 max-md:flex-wrap"
        onSubmit={handleSubmit(onSubmit, (err) => setFieldErrors(err))}>
        <div className="w-7/12 max-md:w-full">
          <Textarea
            variant="bordered"
            minRows={6}
            placeholder={t("productcomment:form.content")}
            classNames={{
              label: "hidden",
              helperWrapper: "hidden",
            }}
            {...register("content", {
              required: {
                value: true,
                message: t("form.error.error_content_required"),
              },
            })}
          />
          <FormFieldErrorMessage fieldErrors={fieldErrors} name="content" />
        </div>
        <div className="flex flex-col justify-between w-5/12 gap-3 max-md:w-full">
          <label className="block">
            <Input
              variant="bordered"
              placeholder={t("productcomment:form.fullname")}
              aria-label={t("productcomment:form.fullname")}
              classNames={{
                inputWrapper: "h-3",
              }}
              type="text"
              {...register("fullname", {
                required: {
                  value: true,
                  message: t("form.error.error_fullname_required"),
                },
              })}
            />
            <FormFieldErrorMessage fieldErrors={fieldErrors} name="fullname" />
          </label>
          <label className="block">
            <Input
              variant="bordered"
              placeholder={t("productcomment:form.phone")}
              aria-label={t("productcomment:form.phone")}
              classNames={{
                inputWrapper: "h-3",
              }}
              type="text"
              {...register("phone", {
                required: {
                  value: true,
                  message: t("form.error.error_phone_required"),
                },
                minLength: {
                  value: 9,
                  message: t("form.error.error_phone_invalid"),
                },
              })}
            />
            <FormFieldErrorMessage fieldErrors={fieldErrors} name="phone" />
          </label>
          <Button
            type="submit"
            color="primary"
            className="h-8"
            isLoading={processing}
            disabled={processing}>
            {t("productcomment:form.button_send")}
          </Button>
        </div>
      </form>
      <Toaster toastOptions={{ success: { duration: 2000 } }} />
    </div>
  );
}
