import { ProductFilterJson } from "@/common/types/ProductFilter";
import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { IconChevronDown } from "@tabler/icons-react";
import ProductFilter from "@/common/contants/ProductFilter";
import ProductFilterTypePrice from "./type/ProductFilterTypePrice";
import ProductFilterTypeBrand from "./type/ProductFilterTypeBrand";

const ProductFilterBox = ({
  filter,
  paginationUrl,
}: {
  filter: ProductFilterJson;
  paginationUrl: string;
}) => {
  let filterContent = null;
  switch (filter.type) {
    case ProductFilter.TYPE_BRAND:
      filterContent = (
        <ProductFilterTypeBrand filter={filter} paginationUrl={paginationUrl} />
      );
      break;
    case ProductFilter.TYPE_PRICE:
      filterContent = <ProductFilterTypePrice paginationUrl={paginationUrl} />;
      break;
  }

  return (
    <div className="product-filter">
      <Popover
        placement="bottom"
        showArrow={true}
        style={{ maxWidth: 400 }}
        classNames={{ base: "" }}
      >
        <PopoverTrigger>
          <span className="text-sm rounded border border-gray-200 hover:border-gray-500 px-2 py-2 cursor-pointer">
            {filter.label}{" "}
            <IconChevronDown className="inline-block" size={16} />
          </span>
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-2">{filterContent}</div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ProductFilterBox;
