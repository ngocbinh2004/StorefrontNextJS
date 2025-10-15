"use client";

import CustomerCartModel from "@/common/models/CustomerCartModel";
import { CustomerCartItem } from "@/common/types/CustomerCart";
import TextMoney from "@/components/shared/displaydata/TextMoney";
import FormInputIncrement from "@/components/shared/form/input/FormInputIncrement";
import ConfirmButton from "@/components/shared/layout/table/ConfirmButton";
import Image from "next/image";
import { useMemo } from "react";
import ProductGiftWrapper from "./productgift/ProductGiftWrapper";

const ShoppingCartItem = ({
  item,
  processing,
  onChangeQuantity,
}: {
  item: CustomerCartItem;
  processing: boolean;
  onChangeQuantity?: (v: number, v2: number) => void;
}) => {
  const imageUrl = useMemo(() => {
    return CustomerCartModel.getItemImageUrl(item);
  }, [item]);

  const isReadonly = typeof onChangeQuantity === undefined;

  return (
    <li className="flex py-6 md:py-10">
      <div className="flex-shrink-0">
        {imageUrl.length > 0 ? (
          <Image
            width={100}
            height={100}
            src={imageUrl}
            alt={item.product_name}
            className="rounded-md object-cover object-center"
          />
        ) : (
          <Image
            width={100}
            height={100}
            src={"/assets/no-image.svg"}
            alt={item.product_name}
            className="rounded-md object-cover object-center"
          />
        )}
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between md:ml-6">
        <div className="relative pr-9 md:grid md:grid-cols-3 md:gap-x-6 md:pr-0">
          <div className="col-span-2">
            <div className="flex justify-between">
              <h3 className="text-sm">{item.product_name}</h3>
            </div>
            <div className="mt-1 flex text-sm">
              {item.color.length > 0 ? (
                <p className="text-gray-500">{item.color}</p>
              ) : null}

              {item.size.length ? (
                <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                  {item.size}
                </p>
              ) : null}
            </div>
            <p className="mt-1 text-sm font-medium text-gray-900">
              <TextMoney money={item.price} />
            </p>
          </div>

          {typeof onChangeQuantity !== "undefined" ? (
            <div className="mt-4 md:mt-0 md:pr-9">
              <FormInputIncrement
                disabled={processing}
                defaultValue={item.quantity}
                onChange={(quantity) =>
                  onChangeQuantity(item.product_variant_id, quantity)
                }
                min={1}
              />

              <div className="absolute right-0 top-0">
                <ConfirmButton
                  onConfirm={() => onChangeQuantity(item.product_variant_id, 0)}
                />
              </div>
            </div>
          ) : null}
        </div>
        {/* <ShoppingCartItemGift key={"cart" + item.id} itemCart={item} /> */}
        <ProductGiftWrapper
          productId={item.product_id}
          variantCardId={item.product_variant_id}
        />
      </div>
    </li>
  );
};

export default ShoppingCartItem;
