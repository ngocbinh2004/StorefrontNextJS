import ProductModel from "@/common/models/ProductModel";
import { ProductCardJson } from "@/common/types/ProductCard";
import Helper from "@/common/utils/helper";
import TextMoney from "@/components/shared/displaydata/TextMoney";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";

const ProductSearchResultItem = ({ data }: { data: ProductCardJson }) => {
  const productInfo = data.variants[0];

  const productUrl = ProductModel.getMarkUrl(
    data.category.seo_url,
    data.seo_url,
    data.id
  );
  const productAvatar = data.thumbnails[0];

  const displayListingPrice = useMemo(() => {
    let price = 0;
    if (productInfo.listing_price > productInfo.price) {
      price = productInfo.listing_price;
    } else if (
      productInfo.listing_price === productInfo.price ||
      productInfo.listing_price < productInfo.price
    ) {
      price = 0;
    } else if (
      productInfo.listing_price === 0 ||
      productInfo.listing_price === 1 ||
      productInfo.listing_price === 10
    ) {
      price = 0;
    }
    return price;
  }, [productInfo]);

  return (
    <div className="flex">
      <div className="w-45px] flex-none">
        <Link href={productUrl}>
          <Image
            src={productAvatar?.url || "/assets/no-image.svg"}
            width={45}
            height={45}
            alt={productInfo?.title || ""}
          />
        </Link>
      </div>
      <div className="ml-2 text-xs">
        <span className="block font-medium group-hover:text-primary hover:underline line-clamp-2">
          <Link href={productUrl} title={productInfo?.title || ""}>
            {productInfo?.title || ""}
          </Link>
        </span>

        <div className="flex items-center font-medium">
          <div className="flex flex-row items-start gap-x-2">
            {productInfo.price > 0 ? (
              <>
                <span className="font-medium text-red-500">
                  <TextMoney money={productInfo.price} />
                </span>
                {displayListingPrice > 0 &&
                displayListingPrice !== productInfo.listing_price ? (
                  <span className="text-[0.625rem] text-gray-500 font-medium line-through">
                    <TextMoney money={displayListingPrice} />
                  </span>
                ) : null}
              </>
            ) : (
              <span className="font-medium text-red-500">Liên hệ</span>
            )}
          </div>

          {productInfo.listing_price > 0 &&
          productInfo.price > 0 &&
          productInfo.listing_price > productInfo.price &&
          displayListingPrice !== productInfo.listing_price ? (
            <div className="ml-2 text-xs text-amber-700">
              {"-"}
              {Helper.percentDiscount(
                productInfo.listing_price,
                productInfo.price
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductSearchResultItem;
