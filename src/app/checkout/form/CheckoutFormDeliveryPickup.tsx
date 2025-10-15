import React, { useCallback } from "react";
import useCheckoutStore from "@/common/zustands/useCheckoutStore";
import StorePicker from "@/components/store/StorePicker";
import { useFormContext } from "react-hook-form";

const CheckoutFormDeliveryPickup = () => {
  const stores = useCheckoutStore((state) => state.stores);
  const { setValue } = useFormContext();

  const onChangeStore = useCallback(
    (values: number[]) => {
      if (values.length > 0) {
        setValue("pickup_store_id", values[0]);
      } else {
        setValue("pickup_store_id", 0);
      }
    },
    [setValue]
  );

  return (
    <>
      <StorePicker
        stores={stores}
        onChange={onChangeStore}
        placeholder="Chọn cửa hàng đến lấy hàng"
      />
    </>
  );
};

export default CheckoutFormDeliveryPickup;
