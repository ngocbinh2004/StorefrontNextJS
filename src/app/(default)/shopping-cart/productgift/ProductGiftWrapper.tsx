"use client";
import ProductGiftAccessoryNextApi from "@/common/api/next/ProductGiftAccessoryNextApi";
import ProductGiftAccessoryModel from "@/common/models/ProductGiftAccessoryModel";
import { Spinner } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import ProductGiftAccessoryList from "./ProductGiftAccessoryList";
import { IconGift } from "@tabler/icons-react";

export default function ProductGiftWrapper({
  productId,
  variantCardId,
}: {
  productId: number;
  variantCardId: number;
}) {
  const [loading, setLoading] = useState(false);

  const [productGiftAccessoryModel, setProductGiftAccessoryModel] =
    useState<ProductGiftAccessoryModel>(
      new ProductGiftAccessoryModel(ProductGiftAccessoryModel.getDefaultData())
    );

  const fetchProductGiftAccessory = useCallback(async (product_id: number) => {
    setLoading(true);
    const myObj = await ProductGiftAccessoryNextApi.getGiftAccessoryDetail({
      product_id: product_id,
    });

    setProductGiftAccessoryModel(myObj);

    setLoading(false);
  }, []);

  useEffect(() => {
    if (productId > 0) {
      fetchProductGiftAccessory(productId);
    }
  }, [productId, fetchProductGiftAccessory]);

  if (productGiftAccessoryModel.id === 0) {
    return null;
  } else {
    return (
      <>
        {loading ? (
          <Spinner />
        ) : (
          <div className="p-3 rounded-xl bg-gray-50 mt-2">
            <div className="flex items-center text-gray-900 text-sm font-bold mb-3">
              <IconGift size={18} color="#df0000" className="mr-1" />{" "}
              {"Quà tặng kèm"}
            </div>
            <ProductGiftAccessoryList
              variantCardId={variantCardId}
              giftModel={productGiftAccessoryModel}
            />
          </div>
        )}
      </>
    );
  }
}
