"use client";
import ProductNextApi from "@/common/api/next/ProductNextApi";
import ProductBundleModel from "@/common/models/ProductBundleModel";
import ProductCardModel from "@/common/models/ProductCardModel";
import { BundlePriceJson } from "@/common/types/ProductBundleDetail";
import { ProductCardJson } from "@/common/types/ProductCard";
import { useCallback, useEffect, useState } from "react";
import ProductBundleListItem from "./ProductBundleListItem";

export default function ProductBundleList({
  bundleModel,
  onVariantSelect,
}: {
  bundleModel: ProductBundleModel;
  onVariantSelect: (v: BundlePriceJson) => void;
}) {
  //product-variant
  const [loading, setLoading] = useState(false);

  const [productCardItems, setProductCardItems] = useState<ProductCardJson[]>([
    ProductCardModel.getDefaultData(),
  ]);

  const fetchProductCard = useCallback(async () => {
    setLoading(true);
    const bundleDetails = bundleModel.details ?? [];
    let idList = [];

    for (const item of bundleDetails) {
      idList.push(item.product_id);
    }
    const collection = await ProductNextApi.getByIdList(idList.join(","));
    if (!collection.hasError()) {
      setProductCardItems(collection.items);
    }
    setLoading(false);
  }, [bundleModel.details]);

  useEffect(() => {
    fetchProductCard();
  }, [fetchProductCard]);

  if (bundleModel.id === 0 || loading) {
    return null;
  } else {
    return (
      <>
        <div className="my-4 space-y-2 ">
          {Array.isArray(bundleModel.details) &&
            bundleModel.details.map((item) => (
              <ProductBundleListItem
                key={`${item.id}-${item.product_variant_id}`}
                bundleDiscountValue={bundleModel.discount_value}
                bundleDiscountType={bundleModel.discount_type}
                bundleDetail={item}
                productCardItems={productCardItems}
                onVariantSelect={onVariantSelect}
              />
            ))}
        </div>
      </>
    );
  }
}
