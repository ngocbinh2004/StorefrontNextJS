"use client";

import { useTranslation } from "@/app/i18n/client";
import ProductRatingNextApi from "@/common/api/next/ProductRatingNextApi";
import { CustomerJson } from "@/common/types/Customer";
import { ProductJson } from "@/common/types/Product";
import { AddProductRatingRequest } from "@/common/types/ProductRating";
import { cn } from "@/common/utils/cn";
import FormFieldErrorMessage from "@/components/shared/form/FormFieldErrorMessage";
import ToastContentList from "@/components/toast/ToastContentList";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  useDisclosure,
} from "@nextui-org/react";
import { ReactNode, useCallback, useState } from "react";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ProductRatingFormModal({
  children,
  className,
  product,
  loggedUser,
}: {
  children: ReactNode;
  className: string;
  product: ProductJson;
  loggedUser: CustomerJson;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { t } = useTranslation("vn", ["productrating"]);

  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<AddProductRatingRequest>
  >({});
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { register, handleSubmit, reset, control } =
    useForm<AddProductRatingRequest>();

  const onSubmit = useCallback(
    async (formData: AddProductRatingRequest) => {
      setFieldErrors({});
      setProcessing(true);
      setDisabled(true);

      const data = {
        ...formData,
        fullname: loggedUser.full_name,
        phone: loggedUser.phone,
        email: loggedUser.email,
        product_id: product.id,
      };
      const myObj = await ProductRatingNextApi.add(data);

      setProcessing(false);

      if (myObj.hasError()) {
        //show error
        toast.error(
          <ToastContentList
            title={t("productrating:form.error.error_heading")}
            items={myObj.error.errors}
            translate_prefix="productrating:form.error"
          />
        );
      } else {
        toast.success(
          <ToastContentList
            title={t("productrating:form.success.heading")}
            items={["success"]}
            translate_prefix="productrating:form.success"
          />
        );
      }

      setDisabled(false);
      onClose();
      reset();
    },
    [product.id, t, loggedUser, onClose, reset]
  );

  return (
    <>
      <Button color="primary" className={cn(className)} onPress={onOpen}>
        {children}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <form
          className="flex items-start justify-between w-full gap-2 mt-4 max-md:flex-wrap"
          onSubmit={handleSubmit(onSubmit, (err) => setFieldErrors(err))}
        >
          <ModalContent className="sm:max-w-[512px]">
            <ModalHeader className="grid justify-items-center">
              <div className="font-normal text-center text-primary">
                {t("productrating:heading_title")}
              </div>
              <div>
                <h3 className="mb-3 text-xl font-normal text-center">
                  {product.name}
                </h3>
                <Controller
                  control={control}
                  name="rating"
                  defaultValue={5}
                  render={({ field: { onChange, value } }) => (
                    <RadioGroup
                      label={
                        <span className="block mb-3 text-sm font-bold text-foreground-600">
                          {"Đánh giá chung"}
                        </span>
                      }
                      className="-gap-1"
                      onChange={(e) => onChange(+e.target.value)}
                      value={`${value}`}
                      orientation="horizontal"
                      size="sm"
                    >
                      <div className="-mt-1 space-x-4 text-xs font-normal">
                        <Radio value={`1`}>{"Rất Tệ"}</Radio>
                        <Radio value={`2`}>{"Tệ"}</Radio>
                        <Radio value={`3`}>{"Bình thường"}</Radio>
                        <Radio value={`4`}>{"Tốt"}</Radio>
                        <Radio value={`5`}>{"Tuyệt vời"}</Radio>
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-2">
                {/* <label className="block">
                  <Input
                    placeholder={t("productrating:form.fullname")}
                    aria-label={t("productrating:form.fullname")}
                    type="text"
                    {...register("fullname", {
                      required: {
                        value: true,
                        message: t("form.error.error_fullname_required"),
                      },
                    })}
                    variant="bordered"
                    size="sm"
                    value={loggedUser.full_name}
                    isDisabled
                  />
                  <FormFieldErrorMessage
                    fieldErrors={fieldErrors}
                    name="fullname"
                  />
                </label> */}
                {/* <label className="block">
                  <Input
                    variant="bordered"
                    size="sm"
                    placeholder={t("productrating:form.phone")}
                    aria-label={t("productrating:form.phone")}
                    {...register("phone", {
                      required: {
                        value: true,
                        message: t("form.error.error_phone_required"),
                      },
                      minLength: {
                        value: 9,
                        message: t("form.error.error_phone_length_invalid"),
                      },
                    })}
                    value={loggedUser.phone}
                    isDisabled
                  />
                  <FormFieldErrorMessage
                    fieldErrors={fieldErrors}
                    name="phone"
                  />
                </label> */}
                <label className="block">
                  <Textarea
                    autoFocus
                    variant="bordered"
                    size="sm"
                    placeholder={t("productrating:form.content")}
                    classNames={{ label: "hidden" }}
                    {...register("content", {
                      required: {
                        value: true,
                        message: t("form.error.error_content_required"),
                      },
                    })}
                  />
                  <FormFieldErrorMessage
                    fieldErrors={fieldErrors}
                    name="content"
                  />
                </label>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                {"Đóng"}
              </Button>
              <Button
                color="primary"
                type="submit"
                isLoading={processing}
                disabled={disabled}
              >
                {t("productrating:form.button_send")}
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
