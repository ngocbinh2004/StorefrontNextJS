"use client";
import ProductGiftAccessoryNextApi from "@/common/api/next/ProductGiftAccessoryNextApi";
import ProductVariantNextApi from "@/common/api/next/ProductVariantNextApi";
import ProductGiftAccessoryModel from "@/common/models/ProductGiftAccessoryModel";
import ProductVariantModel from "@/common/models/ProductVariantModel";
import TextMoney from "@/components/shared/displaydata/TextMoney";
import { Divider } from "@nextui-org/divider";
import { Spinner } from "@nextui-org/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function ProductGiftAccessoryList({
  product_id,
}: {
  product_id: number;
}) {
  const [loading, setLoading] = useState(false);

  //product-variant
  const [variantList, setVariantList] = useState<ProductVariantModel[]>([]);

  const fetchingVariantByIdList = useCallback(async (idList: string) => {
    const collection = await ProductVariantNextApi.getItems({
      page: 1,
      limit: 20,
      sorttype: "display_order",
      sortby: "ASC",
      ids: idList,
    });

    if (!collection.hasError()) {
      setVariantList(collection.items);
    }
  }, []);

  const [productGiftAccessoryModel, setProductGiftAccessoryModel] =
    useState<ProductGiftAccessoryModel>(
      new ProductGiftAccessoryModel(ProductGiftAccessoryModel.getDefaultData())
    );

  const fetchProductGiftAccessory = useCallback(
    async (product_id: number) => {
      setLoading(true);
      const myObj = await ProductGiftAccessoryNextApi.getGiftAccessoryDetail({
        product_id: product_id,
      });

      setProductGiftAccessoryModel(myObj);
      setLoading(false);
      if (typeof myObj.details !== "undefined" && myObj.details.length > 0) {
        let variantIdList: number[] = myObj.details.map(
          (i) => i.product_variant_id
        );
        if (variantIdList.length > 0) {
          fetchingVariantByIdList(variantIdList.join(","));
        }
      }
    },
    [fetchingVariantByIdList, setProductGiftAccessoryModel]
  );

  useEffect(() => {
    if (product_id > 0) {
      fetchProductGiftAccessory(product_id);
    }
  }, [product_id, fetchProductGiftAccessory]);

  if (productGiftAccessoryModel.id === 0) {
    return null;
  }

  return (
    <div className="border rounded py-[6px] px-2.5 max-md:order-11 max-md:mx-2">
      <h2 className="text-xl my-2.5 text-center">
        {"Tặng kèm khi mua sản phẩm"}
      </h2>
      <Divider />
      <div className="my-4 space-y-2">
        {loading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : null}
        {variantList.map((item) => (
          <div key={item.id} className="flex items-center gap-2 text-sm">
            <Image
              src={item.avatar_file_list[0]?.url || "/assets/no-image.svg"}
              width={80}
              height={80}
              alt={item.title}
            />
            <div className="flex flex-col gap-y-2">
              <div>{item.title}</div>
              <div className="space-x-1">
                <span className="font-bold text-primary">
                  <TextMoney money={item.price} />
                </span>
                {item.listing_price > 0 && item.listing_price !== item.price ? (
                  <span className="line-through text-xs text-[#999999]">
                    <TextMoney money={item.listing_price} />
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
