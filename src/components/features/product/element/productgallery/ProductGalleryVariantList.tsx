"use client";
import { ProductVariantJson } from "@/common/types/ProductVariant";
import Image from "next/image";
import React, { useCallback } from "react";
import { cn } from "@/common/utils/cn";

const ProductGalleryVariantList = ({
  variantId,
  variants,
  onChangeVariant,
}: {
  variantId: number;
  variants: ProductVariantJson[];
  onChangeVariant: (value: number) => void;
}) => {
  const setActiveVariant = useCallback(
    (id: number) => {
      onChangeVariant(id);
    },
    [onChangeVariant]
  );

  return (
    <div className=" overflow-x-auto mx-2">
      <div className="flex justify-start md:justify-center gap-2.5 mt-2.5">
        <div key={0} className="w-[55px] shrink-0">
          <div
            className={cn(
              "mb-[5px] w-full h-[55px] p-[7px] border rounded-sm flex justify-center items-center cursor-pointer hover:border-red-600",
              variantId === 0 ? "border-red-600" : ""
            )}
          >
            <Image
              src={"/assets/p_featured.png"}
              width={40}
              height={40}
              alt={"Điểm nổi bật"}
              onClick={() => setActiveVariant(0)}
            />
          </div>
          <p
            className="text-center line-clamp-2 text-xs text-gray-500"
            title={"Điểm nổi bật"}
          >
            {"Điểm nổi bật"}
          </p>
        </div>

        {variants.flatMap((item) => {
          if (item.avatar_file_list.length === 0) {
            return [];
          }
          return [
            <div
              key={item.id}
              className="w-[55px] shrink-0"
              onClick={() => setActiveVariant(item.id)}
            >
              <div
                className={cn(
                  "mb-[5px] w-full h-[55px] p-[7px] border rounded-sm flex justify-center items-center cursor-pointer focus:border-red-600 hover:border-red-600",
                  variantId === item.id ? "border-red-600" : ""
                )}
              >
                <Image
                  src={
                    item.avatar_file_list.length > 0
                      ? item.avatar_file_list[0].url
                      : "/assets/no-image.svg"
                  }
                  width={40}
                  height={40}
                  alt={item.title}
                />
              </div>
              <p
                className="text-center line-clamp-2 text-xs text-gray-500"
                title={item.title}
              >
                {item.color > 0 ? item.color_name : item.sku}
              </p>
            </div>,
          ];
        })}
      </div>
    </div>
  );
};

export default ProductGalleryVariantList;
