import { Input, Radio, RadioGroup, cn } from "@nextui-org/react";
import { Controller, useFormContext } from "react-hook-form";

import Checkout from "@/common/contants/Checkout";
import useCheckoutStore from "@/common/zustands/useCheckoutStore";
import { IconBuildingStore, IconTruckDelivery } from "@tabler/icons-react";
import Link from "next/link";
import CheckoutFormDeliveryPickup from "./CheckoutFormDeliveryPickup";
import CheckoutFormDeliveryShip from "./CheckoutFormDeliveryShip";
import { useCallback, useEffect, useMemo, useState } from "react";
import ShippingPriceModel from "@/common/models/ShippingPriceModel";
import { ShippingPriceCheckRequest } from "@/common/types/ShippingPrice";
import CheckoutNextApi from "@/common/api/next/CheckoutNextApi";
import CustomerCartModel from "@/common/models/CustomerCartModel";

const CheckoutFormDelivery = () => {
  const { register, control, watch, setValue } = useFormContext();
  const user = useCheckoutStore((state) => state.user);
  const setShippingPrice = useCheckoutStore((state) => state.setShippingPrice);
  const deliveryType = watch("delivery_type");

  const [billingGender, setBillingGender] = useState<string>(
    Checkout.GENDER_MALE.toString()
  );
  const [billingPhone, setBillingPhone] = useState("");
  const [billingFullName, setBillingFullName] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  //For check shippingprice
  const cart = useCheckoutStore((state) => state.cart);
  const calculatedData = useMemo(
    () => CustomerCartModel.calculatePrices(cart),
    [cart]
  );
  const billingRegionId = watch("billing_region_id");
  const billingSubRegionId = watch("billing_sub_region_id");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // clear current shippingprice
  const resetShippingPrice = useCallback(() => {
    setShippingPrice(ShippingPriceModel.getDefaultData());
  }, [setShippingPrice]);

  /**
   * Get shipping price
   */
  const getShippingPrice = useCallback(async () => {
    const data: ShippingPriceCheckRequest = {
      order_amount: calculatedData.price_sell,
      region_id: billingRegionId,
      sub_region_id: billingSubRegionId,
    };

    setLoading(true);
    const collection = await CheckoutNextApi.checkShippingPrice(data);
    setLoading(false);
    if (collection.hasError()) {
      resetShippingPrice();
      setErrors(collection.error.errors);
    } else {
      //found shippingprice for current information
      if (collection.items.length > 0) {
        setShippingPrice(collection.items[0].toJson());
      } else {
        //not found, clear shipping information
        resetShippingPrice();
      }
    }
  }, [
    resetShippingPrice,
    setShippingPrice,
    billingRegionId,
    billingSubRegionId,
    calculatedData.price_sell,
  ]);

  useEffect(() => {
    if (deliveryType === Checkout.DELIVERY_TYPE_PICKUP) {
      //no shipping
      resetShippingPrice();
      setValue("billing_region_id", 0);
      setValue("billing_sub_region_id", 0);
    } else {
      //getShippingPrice(); auto
      setValue("pickup_store_id", 0);
    }
  }, [deliveryType, resetShippingPrice, getShippingPrice, setValue]);

  useEffect(() => {
    if (user.id > 0) {
      setBillingGender(
        user.gender > 0
          ? user.gender.toString()
          : Checkout.GENDER_MALE.toString()
      );
      setBillingPhone(user.phone);
      setBillingFullName(user.full_name);
      setContactEmail(user.email);
    }
  }, [user]);

  return (
    <div className="mt-8 space-y-4">
      <div className="flex mb-4">
        <h2 className="text-xl font-bold shrink">Thông tin đặt hàng</h2>
        <div className="text-sm text-right grow">
          {user.id > 0 ? (
            <div></div>
          ) : (
            <div>
              Đã có tài khoản?{" "}
              <Link
                href={`/account/login?return_url=${encodeURIComponent(
                  "/checkout"
                )}`}
                className="underline text-primary underline-offset-2"
              >
                Đăng nhập
              </Link>
            </div>
          )}
        </div>
      </div>

      <Controller
        control={control}
        name="delivery_type"
        render={({ field: { onChange, value } }) => (
          <RadioGroup
            onChange={onChange}
            value={value}
            orientation="horizontal"
            className="w-full"
            size="sm"
          >
            <div className="flex flex-row w-full px-2 mb-2 space-x-2">
              <Radio
                value={Checkout.DELIVERY_TYPE_PICKUP}
                className={cn(
                  "basis-1/2 group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
                  "cursor-pointer border-2 border-r-0 rounded-lg rounded-r-none border-default gap-4 py-2 px-4",
                  "data-[selected=true]:border-primary data-[selected=true]:border-r-2"
                )}
              >
                <IconBuildingStore />
                Nhận hàng tại cửa hàng
              </Radio>
              <Radio
                value={Checkout.DELIVERY_TYPE_SHIPPING}
                className={cn(
                  "basis-1/2 group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
                  "cursor-pointer border-2 border-l-0 rounded-lg rounded-l-none border-default gap-4 py-2 px-4",
                  "data-[selected=true]:border-primary data-[selected=true]:border-l-2"
                )}
              >
                <IconTruckDelivery />
                Giao hàng tiêu chuẩn
              </Radio>
            </div>
          </RadioGroup>
        )}
      />

      <div className="flex flex-row gap-4">
        <div className="px-3 py-1 rounded-lg basis-2/4 sm:basis-1/4 bg-default-100">
          <Controller
            control={control}
            name="billing_gender"
            render={({ field: { onChange, value } }) => (
              <RadioGroup
                label={
                  <span className="font-medium text-tiny text-foreground-600">
                    Xưng hô
                  </span>
                }
                className="-gap-1"
                onValueChange={setBillingGender}
                value={billingGender}
                orientation="horizontal"
                size="sm"
              >
                <div className="-mt-1 space-x-4">
                  <Radio value={Checkout.GENDER_MALE.toString()}>Anh</Radio>
                  <Radio value={Checkout.GENDER_FEMALE.toString()}>Chị</Radio>
                </div>
              </RadioGroup>
            )}
          />
        </div>
        <div className="basis-3/4">
          <Input
            label="Điện thoại"
            placeholder="Số điện thoại người nhận"
            isRequired
            value={billingPhone}
            onValueChange={setBillingPhone}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            {...register("billing_phone", { required: true })}
          />
        </div>
      </div>

      <Input
        label="Họ tên"
        placeholder="Họ tên người nhận"
        isRequired
        value={billingFullName}
        onValueChange={setBillingFullName}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        {...register("billing_full_name", { required: true })}
      />

      {deliveryType === Checkout.DELIVERY_TYPE_SHIPPING ? (
        <CheckoutFormDeliveryShip />
      ) : (
        <CheckoutFormDeliveryPickup />
      )}

      <Input
        placeholder="Địa chỉ email liên hệ"
        value={contactEmail}
        onValueChange={setContactEmail}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        {...register("contact_email")}
      />
    </div>
  );
};

export default CheckoutFormDelivery;
