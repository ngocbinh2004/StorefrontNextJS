"use client";

import ProductCardModel from "@/common/models/ProductCardModel";
import {
  ProductCardJson,
  ProductCardVariant,
} from "@/common/types/ProductCard";
import {
  ProductGiftAccessoryDetailJson,
  VariantGiftJson,
} from "@/common/types/ProductGiftAccessoryDetail";
import TextMoney from "@/components/shared/displaydata/TextMoney";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function ProductGiftAccessoryListItem({
  giftDetail,
  productCardItems,
  onChangeVariantGift,
}: {
  giftDetail: ProductGiftAccessoryDetailJson;
  productCardItems: ProductCardJson[];
  onChangeVariantGift: (v: VariantGiftJson) => void;
}) {
  const [variant, setVariant] = useState<ProductCardVariant>();

  const myProduct = useMemo(() => {
    const product = productCardItems.find(
      (item) => item.id == giftDetail.product_id
    );

    if (typeof product !== "undefined") {
      return product;
    } else {
      return ProductCardModel.getDefaultData();
    }
  }, [giftDetail.product_id, productCardItems]);

  useEffect(() => {
    if (typeof myProduct !== "undefined") {
      setVariant(myProduct.variants[0]);
    }
  }, [myProduct]);

  const onChangeVariant = useCallback(
    (v: ProductCardVariant) => {
      setVariant(v);
      onChangeVariantGift({ id: giftDetail.id, variant_id: v.id });
    },
    [onChangeVariantGift, giftDetail.id]
  );

  return (
    <>
      <div
        key={giftDetail.id}
        className="flex items-center gap-2 pt-2 mt-2 text-xs border-t border-dotted"
      >
        <Image
          src={myProduct?.thumbnails[0]?.url || "/assets/no-image.svg"}
          width={100}
          height={100}
          alt={variant?.title ?? ""}
        />
        <div className="flex flex-col gap-y-2">
          <div>
            {" "}
            {myProduct?.name}
            {" | "}
            <span style={{ color: "#2f6bff" }}>{variant?.color.name}</span>
          </div>
          <div>
            <span className="inline-block mr-2 font-bold text-gray-800 line-through">
              <TextMoney money={variant?.price || 0} />
            </span>
          </div>
          {/* {typeof variant !== "undefined" ? (
            <ProductGiftAccessoryVariantSelect
              variantSelected={variant}
              giftDetail={giftDetail}
              variants={myProduct?.variants}
              onChangeVariant={(v) => onChangeVariant(v)}
            />
          ) : null} */}
        </div>
      </div>
    </>
  );
}
