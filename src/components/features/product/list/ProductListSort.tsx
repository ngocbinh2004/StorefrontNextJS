import { cn } from "@/common/utils/cn";

import React from "react";
import UrlUtil from "@/common/utils/url";
import Link from "next/link";
import ProductListSortMobile from "./ProductListSortMobile";
import Product from "@/common/contants/Product";
import { SorterList } from "@/common/types/Sorter";

const sorterList: SorterList = [
  { id: Product.SORTER_DEFAULT, label: "Nổi bật" },
  { id: Product.SORTER_DISCOUNT_PERCENT_DECREASE, label: "% Giảm giá nhiều" },
  { id: Product.SORTER_PRICE_INCREASE, label: "Giá thấp" },
  { id: Product.SORTER_PRICE_DECREASE, label: "Giá cao" },
];

const ProductListSort = ({
  paginationUrl,
  sortby,
}: {
  paginationUrl: string;
  sortby: string;
}) => {
  return (
    <>
      <div className="flex gap-2 items-center max-md:hidden">
        <span className="text-[#555555] text-sm">Sắp xếp theo: </span>
        <div className="inline-flex [&_button]:rounded-none [&_button]:bg-transparent rounded border border-gray-600 overflow-hidden divide-x-1">
          {sorterList.map((item) => (
            <Link
              key={item.id}
              className={cn(
                "py-1 px-3 text-sm text-black hover:bg-gray-200",
                sortby === item.id.toString() ||
                  (sortby === "" && item.id === Product.SORTER_DEFAULT)
                  ? "!bg-gray-800 text-white hover:text-white"
                  : ""
              )}
              href={UrlUtil.buildUrl({
                paginationUrl,
                paramName: "s",
                paramValue:
                  item.id === Product.SORTER_DEFAULT
                    ? null
                    : item.id.toString(),
                isMultiple: false,
              })}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="md:hidden flex-1 flex justify-end">
        <ProductListSortMobile paginationUrl={paginationUrl} sortby={sortby} />
      </div>
    </>
  );
};

export default ProductListSort;
