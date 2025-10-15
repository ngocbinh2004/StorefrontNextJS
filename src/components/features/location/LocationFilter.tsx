"use client";

import region from "@/common/contants/region.json";
import { StoreJson } from "@/common/types/Store";
import { cn } from "@/common/utils/cn";
import { Select, SelectItem } from "@nextui-org/react";
import { IconChevronDown, IconX } from "@tabler/icons-react";
import { ChangeEvent, useMemo, useState } from "react";

const regionMapped = region.map((regionItem) => ({
  value: regionItem.id,
  label: regionItem.name,
  parent_id: regionItem.parent_id,
  display_order: regionItem.display_order,
}));

export default function LocationFilter({
  storeItems,
  onChangeRegion,
  onChangeSubRegion,
  className,
}: {
  storeItems: StoreJson[];
  onChangeRegion: (v: number) => void;
  onChangeSubRegion: (v: number) => void;
  className?: string;
}) {
  const [city, setCity] = useState<number | null>();
  const [district, setDistrict] = useState<number | null>();

  const allStoreRegion = storeItems.map((i) => i.region_id);
  const allStoreSubRegion = storeItems.map((i) => i.sub_region_id);

  const cityListOrdered = useMemo(
    () =>
      regionMapped
        .filter(
          (r) =>
            r.parent_id === 0 &&
            allStoreRegion.some((storeRegion) => storeRegion === r.value),
        )
        .sort((a, b) => a.display_order - b.display_order),
    [allStoreRegion],
  );

  const districtListByCityOrdered = useMemo(
    () =>
      regionMapped
        .filter(
          (r) =>
            r.parent_id === city &&
            allStoreSubRegion.some(
              (storeSubRegion) => storeSubRegion === r.value,
            ),
        )
        .sort((a, b) => a.display_order - b.display_order),
    [city, allStoreSubRegion],
  );

  const handleChangeCity = (e: ChangeEvent<HTMLSelectElement>) => {
    setCity(Number(e.target.value));
    setDistrict(null);
    onChangeRegion(Number(e.target.value));
  };

  const handleChangeDistrict = (e: ChangeEvent<HTMLSelectElement>) => {
    setDistrict(Number(e.target.value));
    onChangeSubRegion(Number(e.target.value));
  };

  const onClearCity = () => {
    setCity(null);
    setDistrict(null);
    onChangeRegion(0);
  };

  const onClearDistrict = () => {
    setDistrict(null);
    onChangeSubRegion(0);
  };

  return (
    <div
      className={cn(
        "flex-col w-full rounded ",
        className ? className : "p-3 bg-primary",
      )}>
      <div className="grid grid-cols-2 gap-2">
        <Select
          classNames={{
            base: "w-[unset]",
            selectorIcon: "static",
          }}
          labelPlacement="outside"
          items={cityListOrdered}
          placeholder="Tỉnh/Thành phố"
          aria-label="Tỉnh/Thành phố"
          onChange={handleChangeCity}
          selectorIcon={
            city && city > 0 ? (
              <IconX onClick={onClearCity} />
            ) : (
              <IconChevronDown />
            )
          }
          selectedKeys={city ? [city.toString()] : []}>
          {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
        </Select>

        <Select
          labelPlacement="outside"
          items={districtListByCityOrdered}
          isDisabled={districtListByCityOrdered.length <= 0}
          placeholder="Quận/Huyện"
          aria-label="Quận/Huyện"
          classNames={{
            selectorIcon: "static",
          }}
          onChange={handleChangeDistrict}
          selectorIcon={
            district && district > 0 ? (
              <IconX onClick={onClearDistrict} />
            ) : (
              <IconChevronDown />
            )
          }
          selectedKeys={district ? [district.toString()] : []}>
          {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
        </Select>
      </div>
    </div>
  );
}
