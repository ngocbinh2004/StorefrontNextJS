"use client";

import Product from "@/common/contants/Product";
import { SorterList } from "@/common/types/Sorter";
import UrlUtil from "@/common/utils/url";
import { Select, SelectItem } from "@nextui-org/select";
import Link from "next/link";

const sorterList: SorterList = [
  { id: Product.SORTER_DEFAULT, label: "Nổi bật" },
  { id: Product.SORTER_DISCOUNT_PERCENT_DECREASE, label: "% Giảm giá nhiều" },
  { id: Product.SORTER_PRICE_INCREASE, label: "Giá thấp đến cao" },
  { id: Product.SORTER_PRICE_DECREASE, label: "Giá cao đến thấp" },
];

const ProductListSortMobile = ({
  paginationUrl,
  sortby,
}: {
  paginationUrl: string;
  sortby: string;
}) => {
  return (
    <Select
      className="md:hidden w-[180px]"
      size="sm"
      labelPlacement="outside"
      aria-label="sorting"
      selectedKeys={[sortby === "" ? "1" : sortby]}
      renderValue={(items) => {
        return items.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            {
              sorterList.find((i) => i.id.toString() === item.key?.toString())
                ?.label
            }
          </div>
        ));
      }}
    >
      {sorterList.map((item) => (
        <SelectItem key={item.id} value={item.id}>
          <Link
            key={item.id}
            href={UrlUtil.buildUrl({
              paginationUrl,
              paramName: "s",
              paramValue:
                item.id === Product.SORTER_DEFAULT ? null : item.id.toString(),
              isMultiple: false,
            })}
          >
            {item.label}
          </Link>
        </SelectItem>
      ))}
    </Select>
  );
};

export default ProductListSortMobile;
