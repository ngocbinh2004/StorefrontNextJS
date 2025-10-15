import ProductGiftAccessoryDetail from "@/common/contants/ProductGiftAccessoryDetail";
import { ProductCardVariant } from "@/common/types/ProductCard";
import { ProductGiftAccessoryDetailJson } from "@/common/types/ProductGiftAccessoryDetail";
import TextMoney from "@/components/shared/displaydata/TextMoney";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useCallback, useMemo } from "react";

const ProductGiftAccessoryVariantSelect = ({
  variantSelected,
  giftDetail,
  variants,
  onChangeVariant,
}: {
  variantSelected: ProductCardVariant;
  giftDetail: ProductGiftAccessoryDetailJson;
  variants: ProductCardVariant[] | undefined;
  onChangeVariant: (v: ProductCardVariant) => void;
}) => {
  const variantList = useMemo(() => {
    switch (giftDetail.variant_exchange_mode) {
      case ProductGiftAccessoryDetail.VARIANT_EXCHANGE_MODE_ALLOW_ALL:
        return variants;
      case ProductGiftAccessoryDetail.VARIANT_EXCHANGE_MODE_ALLOW_IN_LIST:
        return variants?.filter((item) =>
          giftDetail.variant_exchange_id_list.includes(item.id),
        );
      case ProductGiftAccessoryDetail.VARIANT_EXCHANGE_MODE_DENY:
        return null;
    }
  }, [
    giftDetail.variant_exchange_mode,
    giftDetail.variant_exchange_id_list,
    variants,
  ]);

  const onChangeSelection = useCallback(
    (key: any) => {
      const myVariant = variantList?.find((i) => i.id === Number(key));
      if (typeof myVariant !== "undefined") {
        onChangeVariant(myVariant);
      }
    },
    [variantList, onChangeVariant],
  );

  if (typeof variantList !== "undefined" && Array.isArray(variantList)) {
    return (
      <>
        <Dropdown className="overflow-auto">
          <DropdownTrigger className="text-xs cursor-pointer text-primary bp-gray-100 rounded-xl">
            {"Chọn Variant khác"}
          </DropdownTrigger>
          <DropdownMenu
            items={variantList}
            aria-label="Action event example"
            onAction={onChangeSelection}>
            {(item: ProductCardVariant) => (
              <DropdownItem key={item.id} color={"default"}>
                <span className="text-xs">
                  {item.color.id > 0 ? item.color.name : item.title}
                </span>
                {" || "}
                <span className="inline-block mr-2 text-xs font-bold text-gray-700 underline">
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

export default ProductGiftAccessoryVariantSelect;
