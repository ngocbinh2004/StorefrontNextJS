import ProductBundleDetail from "@/common/contants/ProductBundleDetail";
import { ProductBundleDetailJson } from "@/common/types/ProductBundleDetail";
import { ProductCardVariant } from "@/common/types/ProductCard";
import { ProductVariantJson } from "@/common/types/ProductVariant";
import TextMoney from "@/components/shared/displaydata/TextMoney";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
} from "@nextui-org/react";
import { useCallback, useMemo } from "react";

const ProductBundleVariantSelect = ({
  variantSelected,
  bundleDetail,
  variants,
  onChangeVariant,
}: {
  variantSelected: ProductCardVariant;
  bundleDetail: ProductBundleDetailJson;
  variants: ProductCardVariant[] | undefined;
  onChangeVariant: (v: ProductCardVariant) => void;
}) => {
  const variantList = useMemo(() => {
    switch (bundleDetail.variant_exchange_mode) {
      case ProductBundleDetail.VARIANT_EXCHANGE_MODE_ALLOW_ALL:
        return variants;
      case ProductBundleDetail.VARIANT_EXCHANGE_MODE_ALLOW_IN_LIST:
        return variants?.filter((item) =>
          bundleDetail.variant_exchange_id_list.includes(item.id)
        );
      case ProductBundleDetail.VARIANT_EXCHANGE_MODE_DENY:
        return null;
    }
  }, [
    bundleDetail.variant_exchange_mode,
    bundleDetail.variant_exchange_id_list,
    variants,
  ]);

  const onChangeSelection = useCallback(
    (key: any) => {
      const myVariant = variantList?.find((i) => i.id === Number(key));
      if (typeof myVariant !== "undefined") {
        onChangeVariant(myVariant);
      }
    },
    [variantList, onChangeVariant]
  );

  if (typeof variantList !== "undefined" && Array.isArray(variantList)) {
    return (
      <>
        <Dropdown className="overflow-auto">
          <DropdownTrigger className="text-primary cursor-pointer bp-gray-100 text-xs rounded-xl">
            {"Chọn Variant khác"}
          </DropdownTrigger>
          <DropdownMenu
            items={variantList}
            aria-label="Action event example"
            onAction={onChangeSelection}
          >
            {(item: ProductCardVariant) => (
              <DropdownItem key={item.id} color={"default"}>
                <span className="text-xs">
                  {item.color.id > 0 ? item.color.name : item.title}
                </span>
                {" || "}
                <span className="text-gray-700 font-bold inline-block mr-2 text-xs underline">
                  <TextMoney money={item.price} />
                </span>
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </>
    );
  } else {
    return <></>;
  }
};

export default ProductBundleVariantSelect;
