"use client";

import { CompanySettingContext } from "@/common/contexts/CompanySettingContextProvider";
import { ProductVariantJson } from "@/common/types/ProductVariant";
import useInventoryStockStore from "@/common/zustands/useInventoryStockStore";
import { Button } from "@nextui-org/button";
import { IconCheck } from "@tabler/icons-react";
import { useContext } from "react";

const ProductVariantButton = ({
  item,
  onClick,
  isActive,
}: {
  item: ProductVariantJson;
  onClick: () => void;
  isActive: boolean;
}) => {
  const [isLoadingStock, checkInstock] = useInventoryStockStore((state) => [
    state.loading,
    state.checkInstock,
  ]);

  const setting = useContext(CompanySettingContext);

  return (
    <Button
      key={item.id}
      variant="bordered"
      color={isActive ? "primary" : "default"}
      className="h-9 mr-2.5 mb-2"
      onClick={() => onClick()}
      title={item.title}
      isLoading={isLoadingStock}
      isDisabled={
        isLoadingStock ||
        !checkInstock(+setting.website_inventory_from_warehouse, item.id)
      }
    >
      <span className="text-xs">
        {item.color > 0 ? item.color_name : item.title}
      </span>
    </Button>
  );
};

export default ProductVariantButton;
