"use client";

import ProductGiftAccessoryNextApi from "@/common/api/next/ProductGiftAccessoryNextApi";
import ProductVariantNextApi from "@/common/api/next/ProductVariantNextApi";
import ProductGiftAccessoryModel from "@/common/models/ProductGiftAccessoryModel";
import ProductVariantModel from "@/common/models/ProductVariantModel";
import { CustomerCartItem } from "@/common/types/CustomerCart";
import TextMoney from "@/components/shared/displaydata/TextMoney";
import { Spinner } from "@nextui-org/react";
import { IconGift } from "@tabler/icons-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const ShoppingCartItemGift = ({ itemCart }: { itemCart: CustomerCartItem }) => {
  //fetch qua tang kem
  const [loading, setLoading] = useState(false);

  //product-variant
  const [variantList, setVariantList] = useState<ProductVariantModel[]>([]);

  const fetchingVariantByIdList = useCallback(async (idList: string) => {
    const collection = await ProductVariantNextApi.getItems({
      page: 1,
      limit: 50,
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
    if (itemCart.product_id > 0) {
      fetchProductGiftAccessory(itemCart.product_id);
    }
  }, [itemCart.product_id, fetchProductGiftAccessory]);

  if (productGiftAccessoryModel.id === 0) {
    return null;
  } else {
    return (
      <div className="p-3 mt-2 rounded-xl bg-gray-50">
        <div className="flex items-center mb-3 text-sm font-bold text-gray-900">
          <IconGift size={18} color="#df0000" className="mr-1" />{" "}
          {"Quà tặng kèm"}
        </div>
        <div className="space-y-2 ">
          {loading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : null}
          {variantList.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 pt-2 mt-2 text-xs border-t border-dotted"
            >
              <Image
                src={item.avatar_file_list[0]?.url || "/assets/no-image.svg"}
                width={50}
                height={50}
                alt={item.title}
              />
              <div className="flex flex-col gap-y-1">
                <div>{item.title}</div>
                <div className="space-x-1">
                  <span className="font-bold line-through text-primary">
                    <TextMoney money={item.price} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default ShoppingCartItemGift;
