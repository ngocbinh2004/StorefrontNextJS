"use client";
import { CompanySettingContext } from "@/common/contexts/CompanySettingContextProvider";
import { ProductJson } from "@/common/types/Product";
import useInventoryStockStore from "@/common/zustands/useInventoryStockStore";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const InstallmentButton = ({
  product,
  productVariantId,
}: {
  product: ProductJson;
  productVariantId: number;
}) => {
  const setting = useContext(CompanySettingContext);
  const router = useRouter();

  const [processing, setProcessing] = useState(false);
  const [isLoadingStock, checkInstock] = useInventoryStockStore((state) => [
    state.loading,
    state.checkInstock,
  ]);

  return (
    <div className="flex gap-2.5">
      <Button
        size="lg"
        isLoading={isLoadingStock || processing}
        isDisabled={
          isLoadingStock ||
          processing ||
          !checkInstock(
            +setting.website_inventory_from_warehouse,
            productVariantId
          )
        }
        className="flex flex-col gap-0 bg-[#2F6BFF] text-white w-full rounded-md py-2 justify-center items-center"
        onClick={() => {
          router.push(
            `/tra-gop/${product.seo_url}?variant=${productVariantId}&t=1`
          );
        }}
      >
        <span className="text-xs font-bold uppercase">Trả góp 0%</span>
        <span className="text-[0.625rem] leading-4">
          Duyệt nhanh qua điện thoại
        </span>
      </Button>

      <Button
        size="lg"
        isLoading={isLoadingStock || processing}
        isDisabled={
          isLoadingStock ||
          processing ||
          !checkInstock(
            +setting.website_inventory_from_warehouse,
            productVariantId
          )
        }
        className="flex flex-col gap-0 bg-[#2F6BFF] text-white w-full rounded-md py-2 justify-center items-center"
        onClick={() => {
          router.push(
            `/tra-gop/${product.seo_url}?variant=${productVariantId}&t=2`
          );
        }}
      >
        <span className="text-xs font-bold uppercase">Trả góp qua thẻ</span>
        <span className="text-[0.625rem] leading-4">Visa, Mastercard, JCB</span>
      </Button>
    </div>
  );
};

export default InstallmentButton;
