"use client";

import CartNextApi from "@/common/api/next/CartNextApi";
import { CompanySettingContext } from "@/common/contexts/CompanySettingContextProvider";
import useInventoryStockStore from "@/common/zustands/useInventoryStockStore";
import { Button, ButtonProps } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useState } from "react";

const AddToCartButton = ({
  color,
  className,
  label,
  productVariantId,
  section,
  size,
}: {
  color?: ButtonProps["color"];
  className?: string;
  label?: string;
  section?: string;
  productVariantId: number;
  size?: "sm" | "md" | "lg" | undefined;
}) => {
  const router = useRouter();

  const setting = useContext(CompanySettingContext);

  const [processing, setProcessing] = useState(false);
  const [isLoadingStock, checkInstock] = useInventoryStockStore((state) => [
    state.loading,
    state.checkInstock,
  ]);

  const doAdd = useCallback(async () => {
    setProcessing(true);
    const newcart = await CartNextApi.addToCart({
      product_variant_id: productVariantId,
      quantity: 1,
    });
    setProcessing(false);

    if (newcart.hasError()) {
      console.log("error", newcart.error.errors);
    } else {
      //redirect to cart
      router.push(`/shopping-cart`);
    }
  }, [productVariantId, router]);

  return (
    <Button
      isLoading={isLoadingStock || processing}
      isDisabled={
        isLoadingStock ||
        processing ||
        !checkInstock(
          +setting.website_inventory_from_warehouse,
          productVariantId
        )
      }
      onClick={() => doAdd()}
      fullWidth
      color={color || "primary"}
      size={size || "lg"}
      className={className || "font-bold"}
    >
      {label || "MUA NGAY"}
    </Button>
  );
};

export default AddToCartButton;
