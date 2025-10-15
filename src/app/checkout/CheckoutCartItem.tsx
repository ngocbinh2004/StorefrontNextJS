"use client";

import CustomerCartModel from "@/common/models/CustomerCartModel";
import { CustomerCartItem } from "@/common/types/CustomerCart";
import TextMoney from "@/components/shared/displaydata/TextMoney";
import { Badge } from "@nextui-org/react";
import Image from "next/image";
import { useMemo } from "react";
import CheckoutCartItemGift from "./CheckoutCartItemGift";

const CheckoutCartItem = ({ item }: { item: CustomerCartItem }) => {
  const imageUrl = useMemo(() => {
    return CustomerCartModel.getItemImageUrl(item);
  }, [item]);

  return (
    <li className="flex pb-4 mb-4 border-b border-dotted">
      <div className="flex-shrink-0">
        <Badge content={item.quantity} color="primary" size="lg">
          {imageUrl.length > 0 ? (
            <Image
              width={50}
              height={50}
              src={imageUrl}
              alt={item.product_name}
              className="object-cover object-center p-2 bg-white border border-gray-200"
            />
          ) : (
            <Image
              width={50}
              height={50}
              src={"/assets/no-image.svg"}
              alt={item.product_name}
              className="object-cover object-center rounded-md"
            />
          )}
        </Badge>
      </div>

      <div className="flex flex-col justify-between flex-1 ml-4">
        <div className="relative pr-9 md:grid md:grid-cols-3 md:gap-x-6 md:pr-0">
          <div className="col-span-2">
            <div className="flex justify-between">
              <h3 className="text-sm">
                <span className="font-medium text-gray-700">
                  {item.product_name}
                </span>
              </h3>
            </div>
            <div className="flex mt-1 text-sm">
              {item.color.length > 0 ? (
                <p className="text-gray-500">{item.color}</p>
              ) : null}

              {item.size.length > 0 ? (
                <p className="pl-4 ml-4 text-gray-500 border-l border-gray-200">
                  {item.size}
                </p>
              ) : null}
            </div>
          </div>
          <div className="text-sm text-right">
            <TextMoney money={item.price * item.quantity} />
          </div>
        </div>
        <CheckoutCartItemGift itemCart={item} />
      </div>
    </li>
  );
};

export default CheckoutCartItem;
