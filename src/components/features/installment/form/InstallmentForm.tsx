"use client";
import { useTranslation } from "@/app/i18n/client";
import OrderNextApi from "@/common/api/next/OrderNextApi";
import Checkout from "@/common/contants/Checkout";
import region from "@/common/contants/region.json";
import InstallmentModel from "@/common/models/InstallmentModel";
import OrderModel from "@/common/models/OrderModel";
import {
  InstallmentJson,
  InstallmentRequest,
} from "@/common/types/Installment";
import { ProductVariantJson } from "@/common/types/ProductVariant";
import Helper from "@/common/utils/helper";
import ToastContentList from "@/components/toast/ToastContentList";
import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const regionMapped = region.map((regionItem) => ({
  value: regionItem.id,
  label: regionItem.name,
  parent_id: regionItem.parent_id,
  display_order: regionItem.display_order,
}));

const InstallmentForm = ({
  productVariant,
  installment,
}: {
  productVariant: ProductVariantJson;
  installment: InstallmentJson;
}) => {
  const router = useRouter();
  const { t } = useTranslation("vn", ["checkout"]);
  const { register, handleSubmit, reset, control } =
    useForm<InstallmentRequest>();

  const [city, setCity] = useState<number | null>();
  const [district, setDistrict] = useState<number | null>();
  const [ward, setWard] = useState<number | null>();

  const cityListOrdered = useMemo(
    () =>
      regionMapped
        .filter((r) => r.parent_id === 0)
        .sort((a, b) => a.display_order - b.display_order),
    []
  );
  const districtListByCityOrdered = useMemo(
    () =>
      regionMapped
        .filter((r) => r.parent_id === city)
        .sort((a, b) => a.display_order - b.display_order),
    [city]
  );
  const wardListByDistrictOrdered = useMemo(
    () =>
      regionMapped
        .filter((r) => r.parent_id === district)
        .sort((a, b) => a.display_order - b.display_order),
    [district]
  );

  const handleChangeCity = (e: ChangeEvent<HTMLSelectElement>) => {
    setCity(Number(e.target.value));
    setDistrict(null);
    setWard(null);
  };

  const handleChangeDistrict = (e: ChangeEvent<HTMLSelectElement>) => {
    setDistrict(Number(e.target.value));
    setWard(null);
  };

  const handleChangeWard = (e: ChangeEvent<HTMLSelectElement>) => {
    setWard(Number(e.target.value));
  };

  //for createing
  const [processing, setProcessing] = useState(false);
  const [checkoutErrors, setCheckoutErrors] = useState<string[]>([]);

  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<InstallmentRequest>
  >({});

  const calculatedData = useMemo(() => {
    let priceSell = productVariant.price;
    //currently not use ^^!
    let priceHandling = 0;
    let priceFinal = 0;
    let quantity = 1;

    let priceShipping = 0;
    let priceDiscount = 0;

    priceFinal = priceSell + priceHandling - priceDiscount + priceShipping;
    priceFinal = priceFinal >= 0 ? priceFinal : 0;

    return {
      price_sell: priceSell,
      price_handling: priceHandling,
      price_discount: priceDiscount,
      price_shipping: priceShipping,
      price_final: priceFinal,
      quantity,
    };
  }, [productVariant.price]);

  const onPaymentSubmit = useCallback(
    async (myOrder: OrderModel) => {
      let redirectUrl = "";

      switch (myOrder.payment_method) {
        default:
          redirectUrl = `/order-success/${myOrder.hash_key}`;
      }

      router.replace(redirectUrl);
    },
    [router]
  );

  const onSubmit = useCallback(
    async (formData: InstallmentRequest) => {
      //clear offline error
      setFieldErrors({});
      setCheckoutErrors([]);
      setProcessing(true);

      //prepare data
      const data: InstallmentRequest = {
        ...formData,
        billing_region_id: Number(city),
        billing_sub_region_id: Number(district),
        billing_sub_sub_region_id: Number(ward),
        shipping_is_same_billing: 1,
        ...calculatedData,
        details: [{ product_variant_id: productVariant.id, quantity: 1 }],
        delivery_type: "shipping",
        order_installment: 1, //  type tra gop
        prepaid_percentage: installment.pre_paid_percent,
        tenor: installment.tenor,
        merchant_id: installment.merchant_id,
      };

      const newOrder = await OrderNextApi.createInstallment(data);
      setProcessing(false);

      if (newOrder.hasError()) {
        setCheckoutErrors(newOrder.error.errors);
        //show error
        toast.error(
          <ToastContentList
            items={newOrder.error.errors}
            translate_prefix="checkout:form.error"
          />
        );
      } else {
        onPaymentSubmit(newOrder);
      }
    },
    [
      city,
      district,
      ward,
      calculatedData,
      productVariant.id,
      installment,
      onPaymentSubmit,
    ]
  );
  const merchantBank = InstallmentModel.getMerchantBank(
    installment.merchant_id
  );

  return (
    <div className="my-3 flex-col rounded-lg bg-white py-3 text-sm">
      <div className=" border-b border-t my-4 py-4 flex flex-col gap-1.5">
        <div className="flex justify-between">
          <span>{"Gói trả góp:"}</span>
          <span className="font-semibold">{"Gói tự chọn"}</span>
        </div>
        <div className="flex gap-x-2">
          <span>{"Giấy tờ cần có:"}</span>
          <span className="font-semibold">{"CMND/CCCD"}</span>
        </div>
        <div className="flex gap-x-2">
          <span>{"Công ty tài chính:"}</span>
          <span className="font-semibold">{merchantBank?.name}</span>
        </div>
        <div className="flex justify-between">
          <span>{"Giá mua trả góp:"}</span>
          <span className="font-semibold">
            {Helper.moneyFormat(installment.price)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>{"Trả trước:"}</span>
          <span className="font-semibold">
            {Helper.moneyFormat(installment.pre_paid_amount)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>{`Góp mỗi tháng (Trong ${installment.tenor} tháng):`}</span>
          <span className="font-semibold">
            {Helper.moneyFormat(installment.payment_per_month)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>{"Tổng tiền:"}</span>
          <span className="font-semibold">
            {Helper.moneyFormat(installment.total_price_after_installment)}
          </span>
        </div>
      </div>

      <div className="font-bold mb-3">{"Thông tin khách hàng"}</div>

      <form onSubmit={handleSubmit(onSubmit, (err) => setFieldErrors(err))}>
        <div className="mb-5">
          <Controller
            control={control}
            name="billing_gender"
            render={({ field: { onChange, value } }) => (
              <RadioGroup
                className="-gap-1"
                onChange={(e) => onChange(+e.target.value)}
                value={`${value}`}
                orientation="horizontal"
                size="sm"
              >
                <div className="space-x-4 -mt-1 font-normal text-xs">
                  <Radio value={`${Checkout.GENDER_FEMALE}`}>{"Chị"}</Radio>
                  <Radio value={`${Checkout.GENDER_MALE}`}>{"Anh"}</Radio>
                </div>
              </RadioGroup>
            )}
          />
        </div>
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-col md:flex-rows gap-4">
            <Input
              label="Họ và tên"
              isRequired
              variant="bordered"
              size="sm"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              {...register("billing_full_name", {
                required: {
                  value: true,
                  message: t("form.error.error_fullname_required"),
                },
              })}
            />
            <Input
              label="Số điện thoại"
              isRequired
              variant="bordered"
              size="sm"
              {...register("billing_phone", {
                required: {
                  value: true,
                  message: t("form.error.error_phone_required"),
                },
              })}
            />
            <Input
              label="Địa chỉ email"
              isRequired
              variant="bordered"
              size="sm"
              {...register("contact_email", {
                required: {
                  value: true,
                  message: t("form.error.error_email_required"),
                },
              })}
            />
          </div>
          <div className="flex flex-col md:flex-rows gap-4">
            <Input
              label="CCCD / CMND"
              isRequired
              variant="bordered"
              size="sm"
              {...register("contact_identification", {
                required: {
                  value: true,
                  message: t("form.error.error_identification_required"),
                },
              })}
            />
            <Input
              label="Sinh nhật (DD/MM/YYYY)"
              aria-label="dd/mm/yyyy *"
              variant="bordered"
              size="sm"
              {...register("contact_birthday", {
                required: {
                  value: true,
                  message: t("form.error.error_contact_birthday_required"),
                },
              })}
            />
          </div>
        </div>
        <div className="mt-5">
          <div className="font-bold mb-3">{"Địa chỉ hộ khẩu"}</div>
          <div className="flex flex-col gap-y-5 mb-5">
            <div className="grid gird-cols-1 md:grid-cols-3 gap-3">
              <Select
                items={cityListOrdered}
                label="Tỉnh/Thành phố"
                onChange={handleChangeCity}
                selectedKeys={city ? [city.toString()] : []}
                size="sm"
                variant="bordered"
              >
                {(item) => (
                  <SelectItem key={item.value}>{item.label}</SelectItem>
                )}
              </Select>
              <Select
                items={districtListByCityOrdered}
                isDisabled={districtListByCityOrdered.length <= 0}
                label="Quận/Huyện"
                onChange={handleChangeDistrict}
                selectedKeys={district ? [district.toString()] : []}
                size="sm"
                variant="bordered"
              >
                {(item) => (
                  <SelectItem key={item.value}>{item.label}</SelectItem>
                )}
              </Select>
              <Select
                items={wardListByDistrictOrdered}
                isDisabled={wardListByDistrictOrdered.length <= 0}
                label="Phường/Xã"
                onChange={handleChangeWard}
                selectedKeys={ward ? [ward.toString()] : []}
                size="sm"
                variant="bordered"
              >
                {(item) => (
                  <SelectItem key={item.value}>{item.label}</SelectItem>
                )}
              </Select>
            </div>
            <Input
              label="Số nhà, tên đường"
              isRequired
              variant="bordered"
              size="sm"
              {...register("billing_address", {
                required: {
                  value: true,
                  message: t("form.error.error_address_required"),
                },
              })}
            />
          </div>
          <Input
            label="Số điện thoại người thân"
            isRequired
            variant="bordered"
            size="sm"
            {...register("relationship_phone", {
              required: {
                value: true,
                message: t("form.error.error_relationship_phone_required"),
              },
            })}
          />
        </div>
        <div className="flex justify-center my-5">
          <Button className="w-full md:w-1/2" color="primary" type="submit">
            {"Mua hàng"}
          </Button>
        </div>
      </form>
      <Toaster toastOptions={{ success: { duration: 1000 } }} />
    </div>
  );
};

export default InstallmentForm;
