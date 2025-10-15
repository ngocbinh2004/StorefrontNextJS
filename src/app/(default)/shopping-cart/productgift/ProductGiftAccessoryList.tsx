"use client";
import ProductNextApi from "@/common/api/next/ProductNextApi";
import ProductCardModel from "@/common/models/ProductCardModel";
import ProductGiftAccessoryModel from "@/common/models/ProductGiftAccessoryModel";
import { ProductCardJson } from "@/common/types/ProductCard";
import { VariantGiftJson } from "@/common/types/ProductGiftAccessoryDetail";
import useCheckoutStore from "@/common/zustands/useCheckoutStore";
import update from "immutability-helper";
import { useCallback, useEffect, useState } from "react";
import ProductGiftAccessoryListItem from "./ProductGiftAccessoryListItem";

export default function ProductGiftAccessoryList({
  giftModel,
  variantCardId,
}: {
  giftModel: ProductGiftAccessoryModel;
  variantCardId: number;
}) {
  const [cart, setCart] = useCheckoutStore((state) => [
    state.cart,
    state.setCart,
  ]);

  //product-variant
  const [loading, setLoading] = useState(false);

  const [productCardItems, setProductCardItems] = useState<ProductCardJson[]>([
    ProductCardModel.getDefaultData(),
  ]);

  const fetchProductCard = useCallback(async () => {
    setLoading(true);
    const bundleDetails = giftModel.details ?? [];
    let idList = [];

    for (const item of bundleDetails) {
      idList.push(item.product_id);
    }
    const collection = await ProductNextApi.getByIdList(idList.join(","));
    if (!collection.hasError()) {
      setProductCardItems(collection.items);
    }
    setLoading(false);
  }, [giftModel.details]);

  useEffect(() => {
    fetchProductCard();
  }, [fetchProductCard]);

  const [variantGiftList, setVariantGiftList] = useState<VariantGiftJson[]>([]);

  useEffect(() => {
    const variants: VariantGiftJson[] =
      giftModel.details?.map((d) => ({
        id: d.id,
        variant_id: d.product_variant_id,
      })) || [];

    setVariantGiftList(variants);
  }, [giftModel.details]);

  const updateItemCardGift = useCallback(
    (newList: VariantGiftJson[]) => {
      //optimistic, update cart in client ui first
      setCart({
        ...cart,
        details: cart.details.map((i) =>
          i.product_variant_id === variantCardId
            ? {
                ...i,
                gift_accessory: {
                  gift_accessory_id: giftModel.id,
                  variants: newList.map((vi) => vi.variant_id),
                },
              }
            : i,
        ),
      });

      console.log("zustant card", cart.details);
    },
    [cart, setCart, variantCardId, giftModel],
  );

  const onChangeVariantGift = useCallback(
    (v: VariantGiftJson) => {
      let findIndex = variantGiftList.findIndex(
        (i: VariantGiftJson) => i.id === v.id,
      );
      if (findIndex > -1) {
        const newList = update(variantGiftList, {
          [findIndex]: { $set: v },
        });
        // update

        updateItemCardGift(newList);
        setVariantGiftList(newList);
      }
    },
    [variantGiftList, updateItemCardGift],
  );

  useEffect(() => {}, []);

  if (giftModel.id === 0 || loading) {
    return null;
  } else {
    return (
      <>
        <div className="my-4 space-y-2 ">
          {Array.isArray(giftModel.details) &&
            giftModel.details.map((item) => (
              <ProductGiftAccessoryListItem
                key={`${item.id}-${item.product_variant_id}`}
                giftDetail={item}
                productCardItems={productCardItems}
                onChangeVariantGift={(v) => onChangeVariantGift(v)}
              />
            ))}
        </div>
      </>
    );
  }
}
