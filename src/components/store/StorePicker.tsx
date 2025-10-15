"use client";

import region from "@/common/contants/region.json";
import { StoreJson } from "@/common/types/Store";
import { cn } from "@/common/utils/cn";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Select, SelectItem, Selection } from "@nextui-org/react";
import { IconChevronDown, IconMapPin } from "@tabler/icons-react";
import { ChangeEvent, Key, useCallback, useMemo, useState } from "react";
import _ from "lodash";

type StorePickerProps = {
  value?: number;
  stores: StoreJson[];
  placeholder?: string;
  classNames?: {
    base?: string;
    label?: string;
    trigger?: string;
    wrapper?: string;
    item?: string;
  };
  onChange?: (v: number[]) => void;
};

const StorePicker = ({
  value,
  stores,
  placeholder,
  classNames,
  onChange,
}: StorePickerProps) => {
  const [city, setCity] = useState(0);
  const [district, setDistrict] = useState(0);

  const regionMapped = useMemo(() => {
    return region.map((regionItem) => ({
      value: regionItem.id,
      label: regionItem.name,
      parent_id: regionItem.parent_id,
      display_order: regionItem.display_order,
    }));
  }, []);

  const cityListOrdered = useMemo(() => {
    const limitedRegionIdList = _.uniq(stores.map((i) => i.region_id));
    return [
      {
        label: "Tất cả Tỉnh/Thành phố",
        value: 0,
      },
      ...regionMapped
        .filter(
          (r) => r.parent_id === 0 && limitedRegionIdList.includes(r.value),
        )
        .sort((a, b) => a.display_order - b.display_order),
    ];
  }, [regionMapped, stores]);

  const districtListByCityOrdered = useMemo(() => {
    const limitedSubRegionIdList = _.uniq(
      stores.filter((i) => i.region_id === city).map((i) => i.sub_region_id),
    );

    return [
      {
        label: "Tất cả Quận/Huyện",
        value: 0,
      },
      ...regionMapped
        .filter(
          (r) =>
            r.parent_id === city && limitedSubRegionIdList.includes(r.value),
        )
        .sort((a, b) => a.display_order - b.display_order),
    ];
  }, [city, regionMapped, stores]);

  const displayStores = useMemo(() => {
    return stores
      .filter((i) => city === 0 || i.region_id === city)
      .filter((i) => district === 0 || i.sub_region_id === district);
  }, [city, district, stores]);

  const handleChangeCity = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setCity(+e.target.value);
    setDistrict(0);
  }, []);

  const handleChangeDistrict = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setDistrict(+e.target.value);
    },
    [],
  );

  const [selectedKeys, setSelectedKeys] = useState<"all" | Set<Key>>(
    typeof value !== "undefined" ? new Set([`${value}`]) : new Set([]),
  );
  const selectedValue = useMemo(
    () =>
      stores
        .filter((opt) => Array.from(selectedKeys).includes(opt.id.toString()))
        .map((opt) => opt.name)
        .join(", "),
    [selectedKeys, stores],
  );

  const handleChangeKey = useCallback(
    (keys: Selection) => {
      if (stores.length <= 0) return;
      setSelectedKeys(keys);
      const newSelectedValue = stores.filter((opt) =>
        Array.from(keys).includes(opt.id.toString()),
      );
      if (typeof onChange !== "undefined")
        onChange(newSelectedValue.map((i) => i.id));
    },
    [stores, onChange],
  );

  return (
    <Dropdown className="lg:min-w-[700px] min-w-full" placement="bottom">
      <DropdownTrigger>
        <Button
          endContent={
            <IconChevronDown size={18} className="transition-transform" />
          }
          className={cn(
            "[&_svg]:aria-[expanded=true]:rotate-180 bg-default-100 data-[hover=true]:bg-default-200 w-full justify-between",
            classNames?.trigger,
          )}>
          <span className="flex-1 whitespace-normal text-start">
            {selectedValue || (
              <span className="text-foreground-500">{placeholder}</span>
            )}
          </span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        variant="flat"
        selectionMode="single"
        onSelectionChange={handleChangeKey}
        className={cn("max-h-[360px] ", classNames?.wrapper)}>
        <DropdownSection
          className="w-96 lg:w-full"
          title="Tìm cửa hàng theo khu vực"
          showDivider={false}>
          <DropdownItem
            isReadOnly
            closeOnSelect={false}
            classNames={{
              selectedIcon: "hidden",
              base: "data-[hover=true]:bg-white data-[selectable=true]:focus:bg-white w-full",
            }}>
            <div className="grid w-full grid-cols-2 gap-2">
              <Select
                classNames={{
                  base: "w-[unset]",
                  selectorIcon: "static",
                }}
                style={{ width: "100%" }}
                labelPlacement="outside"
                items={cityListOrdered}
                placeholder="Tất cả Tỉnh/Thành phố"
                aria-label="Tỉnh/Thành phố"
                onChange={handleChangeCity}
                value={city || undefined}>
                {(item) => (
                  <SelectItem
                    key={item.value}
                    classNames={{
                      title: `${item.value === 0 ? "font-bold" : ""}`,
                    }}>
                    {item.label}
                  </SelectItem>
                )}
              </Select>

              <Select
                style={{ width: "100%" }}
                labelPlacement="outside"
                items={districtListByCityOrdered}
                isDisabled={districtListByCityOrdered.length <= 0 || city === 0}
                placeholder="Tất cả Quận/Huyện"
                aria-label="Quận/Huyện"
                classNames={{
                  selectorIcon: "static",
                }}
                onChange={handleChangeDistrict}
                value={district || undefined}>
                {(item) => (
                  <SelectItem
                    key={item.value}
                    classNames={{
                      title: `${item.value === 0 ? "font-bold" : ""}`,
                    }}>
                    {item.label}
                  </SelectItem>
                )}
              </Select>
            </div>
          </DropdownItem>
        </DropdownSection>

        <DropdownSection
          className="h-40 overflow-auto"
          title={`Danh sách Cửa hàng (${displayStores.length})`}>
          {displayStores.length > 0 ? (
            displayStores.map((store) => (
              <DropdownItem className="w-96 lg:w-full" key={`${store.id}`}>
                <IconMapPin
                  className="inline-block -mt-0.5 mr-1 opacity-50"
                  stroke={1}
                  size={16}
                />{" "}
                {store.name}
              </DropdownItem>
            ))
          ) : (
            <DropdownItem isReadOnly>Không tìm thấy</DropdownItem>
          )}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default StorePicker;
