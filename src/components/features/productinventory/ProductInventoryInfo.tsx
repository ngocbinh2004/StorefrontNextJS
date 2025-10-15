import InventoryStockNextApi from "@/common/api/next/InventoryStockNextApi";
import InventoryStockModel from "@/common/models/InventoryStockModel";
import { ProductVariantJson } from "@/common/types/ProductVariant";
import { StoreJson } from "@/common/types/Store";
import useInventoryStockStore from "@/common/zustands/useInventoryStockStore";
import { Button } from "@nextui-org/react";
import { useCallback, useContext, useEffect, useState } from "react";
import ProductInventoryVariantDetail from "./ProductInventoryVariantDetail";
import Helper from "@/common/utils/helper";
import { CompanySettingContext } from "@/common/contexts/CompanySettingContextProvider";

const ProductInventoryInfo = ({
  variants,
  onChangeVariant,
  allStores,
  activeVariant,
}: {
  variants: ProductVariantJson[];
  onChangeVariant: (item: ProductVariantJson) => void;
  allStores: StoreJson[];
  activeVariant: ProductVariantJson;
}) => {
  const setting = useContext(CompanySettingContext);
  const isMobile = Helper.detectingCSRMobileDevices();

  const [isFetchedInventory, setIsFetchedInventory] = useState(false);

  const [errors, setErrors] = useState<string[]>([]);

  const [
    isLoadingStock,
    setIsLoadingStock,
    stockItems,
    setInventoryStockItems,
    checkInstock,
  ] = useInventoryStockStore((state) => [
    state.loading,
    state.setLoading,
    state.items,
    state.setItems,
    state.checkInstock,
  ]);

  const checkActiveDefaultVariant = useCallback(
    (stockItems: InventoryStockModel[]) => {
      for (let i = 0; i < variants.length; i++) {
        if (
          checkInstock(
            +setting.website_inventory_from_warehouse,
            variants[i].id,
            stockItems
          )
        ) {
          onChangeVariant(variants[i]);
          break;
        }
      }
    },
    [variants, checkInstock, onChangeVariant, setting]
  );

  const fetchInventory = useCallback(async () => {
    setIsLoadingStock(true);
    setInventoryStockItems([]);
    setErrors([]);

    const collection =
      await InventoryStockNextApi.getListProductVariantQuantity(
        variants.map((i) => i.id).join(","),
        "productdetail"
      );
    setIsLoadingStock(false);

    //prevent fetch again!!!
    setIsFetchedInventory(true);

    if (!collection.hasError()) {
      setInventoryStockItems(collection.items);
      checkActiveDefaultVariant(collection.items);
    } else {
      setErrors(collection.error.errors);
    }
  }, [
    variants,
    setInventoryStockItems,
    setIsLoadingStock,
    checkActiveDefaultVariant,
  ]);

  useEffect(() => {
    if (!isFetchedInventory) {
      fetchInventory();
    }
  }, [isFetchedInventory, fetchInventory]);

  return (
    <>
      {errors.length > 0 ? (
        <div className="space-x-4 text-xs text-red-500">
          Có lỗi khi kiểm tra tồn kho{" "}
          <Button
            size="sm"
            variant="ghost"
            radius="full"
            onClick={() => fetchInventory()}
            isLoading={isLoadingStock}
            isDisabled={isLoadingStock}
          >
            Thử lại
          </Button>
        </div>
      ) : (
        <>
          {isLoadingStock ? (
            <div></div>
          ) : checkInstock(
              +setting.website_inventory_from_warehouse,
              activeVariant.id,
              stockItems
            ) ? (
            <div className={`flex text-sm ${isMobile ? "ml-2" : ""}`}>
              <span className="text-[#F2994A] font-bold">Còn hàng: </span>
              <ProductInventoryVariantDetail
                variantId={activeVariant.id}
                allStores={allStores}
              />
            </div>
          ) : (
            <div className="ml-2 text-sm font-bold uppercase text-primary lg:ml-0">
              <span>Sản phẩm tạm hết hàng!</span>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductInventoryInfo;
