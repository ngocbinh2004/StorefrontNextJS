"use client";
import ProductBundle from "@/common/contants/ProductBundle";
import ProductBundleDetail from "@/common/contants/ProductBundleDetail";
import ProductCardModel from "@/common/models/ProductCardModel";
import {
  BundlePriceJson,
  ProductBundleDetailJson,
} from "@/common/types/ProductBundleDetail";
import {
  ProductCardJson,
  ProductCardVariant,
} from "@/common/types/ProductCard";
import TextMoney from "@/components/shared/displaydata/TextMoney";
import { Checkbox } from "@nextui-org/checkbox";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import ProductBundleVariantSelect from "./ProductBundleVariantSelect";

export default function ProductBundleListItem({
  bundleDiscountType,
  bundleDiscountValue,
  bundleDetail,
  productCardItems,
  onVariantSelect,
}: {
  bundleDiscountType: number;
  bundleDiscountValue: number;
  bundleDetail: ProductBundleDetailJson;
  productCardItems: ProductCardJson[];
  onVariantSelect: (v: BundlePriceJson) => void;
}) {
  const [variant, setVariant] = useState<ProductCardVariant>();

  const myProduct = useMemo(() => {
    const product = productCardItems.find(
      (item) => item.id == bundleDetail.product_id
    );

    if (typeof product !== "undefined") {
      return product;
    } else {
      return ProductCardModel.getDefaultData();
    }
  }, [bundleDetail.product_id, productCardItems]);

  useEffect(() => {
    if (typeof myProduct !== "undefined") {
      setVariant(myProduct.variants[0]);
    }
  }, [myProduct]);

  //everything is OK
  const priceSell = useMemo(() => {
    let priceSell = variant?.price ?? 0;

    switch (bundleDetail.discount_type) {
      case ProductBundleDetail.DISCOUNT_TYPE_CURRENCY:
        priceSell = priceSell - bundleDetail.discount_value;
        break;

      case ProductBundleDetail.DISCOUNT_TYPE_FIXPRICE:
        priceSell = bundleDetail.discount_value;
        break;

      case ProductBundleDetail.DISCOUNT_TYPE_PERCENT:
        priceSell = priceSell - (bundleDetail.discount_value / 100) * priceSell;
        break;

      case ProductBundleDetail.DISCOUNT_TYPE_DEFAULT:
        if (bundleDiscountType === ProductBundle.DISCOUNT_TYPE_CURRENCY) {
          priceSell = priceSell - bundleDiscountValue;
        } else {
          priceSell = priceSell - (bundleDiscountValue / 100) * priceSell;
        }

        break;
    }
    return priceSell;
  }, [
    bundleDetail.discount_type,
    bundleDetail.discount_value,
    bundleDiscountType,
    bundleDiscountValue,
    variant,
  ]);

  const onBundleDetailSelect = useCallback(
    (variant: ProductCardVariant | undefined) => {
      onVariantSelect({
        product_variant_id: variant?.id ?? 0,
        price_original: variant?.price ?? 0,
        price_final: Math.round(priceSell),
      });
    },
    [priceSell, onVariantSelect]
  );

  if (typeof variant !== "undefined") {
    return (
      <>
        <div
          key={bundleDetail.id}
          className="flex gap-5 text-sm border-b mb-2 pb-2 border-dotted"
        >
          <Image
            src={myProduct?.thumbnails[0]?.url || "/assets/no-image.svg"}
            width={100}
            height={100}
            alt={variant?.title ?? ""}
          />
          <div className="flex flex-col gap-y-2">
            <Checkbox
              onValueChange={() => onBundleDetailSelect(variant)}
              classNames={{ label: "text-sm font-normal" }}
            >
              {myProduct?.name}
              {" | "}
              <span style={{ color: "#2f6bff" }}>{variant?.color.name}</span>
            </Checkbox>

            <div>
              <span className="text-primary font-bold inline-block mr-2">
                <TextMoney money={priceSell} />
              </span>

              <span className="line-through text-xs text-[#999999]">
                <TextMoney money={variant?.price ?? 0} />
              </span>
            </div>
            {typeof variant !== "undefined" ? (
              <ProductBundleVariantSelect
                variantSelected={variant}
                bundleDetail={bundleDetail}
                variants={myProduct?.variants}
                onChangeVariant={(v) => setVariant(v)}
              />
            ) : null}
          </div>
        </div>
      </>
    );
  }
}
