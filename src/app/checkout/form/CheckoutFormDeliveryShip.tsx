import { Input, Select, SelectItem } from "@nextui-org/react";
import { Controller, useFormContext } from "react-hook-form";

import region from "@/common/contants/region.json";
import { useEffect, useMemo } from "react";

const CheckoutFormDeliveryShip = () => {
  const { register, control, watch, setValue } = useFormContext();
  const billingRegionId = watch("billing_region_id");
  const billingSubRegionId = watch("billing_sub_region_id");

  const regionMapped = useMemo(
    () =>
      region.map((regionItem) => ({
        value: regionItem.id,
        label: regionItem.name,
        parent_id: regionItem.parent_id,
        display_order: regionItem.display_order,
      })),
    [],
  );

  const cityListOrdered = useMemo(
    () =>
      regionMapped
        .filter((r) => r.parent_id === 0)
        .sort((a, b) => a.display_order - b.display_order),
    [regionMapped],
  );

  const districtListByCityOrdered = useMemo(
    () =>
      regionMapped
        .filter(
          (r) =>
            billingRegionId > 0 && r.parent_id === parseInt(billingRegionId),
        )
        .sort((a, b) => a.display_order - b.display_order),
    [regionMapped, billingRegionId],
  );

  const wardListByDistrictOrdered = useMemo(
    () =>
      regionMapped
        .filter(
          (r) =>
            billingRegionId > 0 &&
            billingSubRegionId > 0 &&
            r.parent_id === parseInt(billingSubRegionId),
        )
        .sort((a, b) => a.display_order - b.display_order),
    [regionMapped, billingRegionId, billingSubRegionId],
  );

  useEffect(() => {
    setValue("billing_sub_region_id", 0);
  }, [billingRegionId, setValue]);

  useEffect(() => {
    setValue("billing_sub_sub_region_id", 0);
  }, [billingSubRegionId, setValue]);

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Controller
          control={control}
          name="billing_region_id"
          rules={{ min: 1 }}
          render={({ field: { onChange, value } }) => (
            <Select
              onChange={onChange}
              value={value}
              isRequired
              classNames={{
                base: "w-[unset]",
                //selectorIcon: "static",
              }}
              style={{ width: "100%" }}
              items={cityListOrdered}
              label="Tỉnh/Thành phố"
              placeholder="Chọn.."
              aria-label="Tỉnh/Thành phố">
              {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
            </Select>
          )}
        />

        <Controller
          control={control}
          name="billing_sub_region_id"
          rules={{ min: 1 }}
          render={({ field: { onChange, value } }) => (
            <Select
              style={{ width: "100%" }}
              onChange={onChange}
              value={value}
              isRequired
              classNames={{
                base: "w-[unset]",
                //selectorIcon: "static",
              }}
              items={districtListByCityOrdered}
              isDisabled={districtListByCityOrdered.length <= 0}
              label="Quận/Huyện"
              placeholder="Chọn.."
              aria-label="Quận/Huyện">
              {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
            </Select>
          )}
        />

        <Controller
          control={control}
          name="billing_sub_sub_region_id"
          rules={{ min: 1 }}
          render={({ field: { onChange, value } }) => (
            <Select
              style={{ width: "100%" }}
              onChange={onChange}
              value={value}
              isRequired
              classNames={{
                base: "w-[unset]",
                // selectorIcon: "static",
              }}
              items={wardListByDistrictOrdered}
              isDisabled={wardListByDistrictOrdered.length <= 0}
              label="Phường/Xã"
              placeholder="Chọn.."
              aria-label="Phường/Xã">
              {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
            </Select>
          )}
        />
      </div>

      <Input
        isRequired
        label="Địa chỉ người nhận"
        placeholder="Nhập số nhà, đường..."
        aria-label="Địa chỉ người nhận"
        {...register("billing_address", { required: true })}
      />
    </>
  );
};

export default CheckoutFormDeliveryShip;
