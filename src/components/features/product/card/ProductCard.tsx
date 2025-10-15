import ProductModel from "@/common/models/ProductModel";
import { CustomerJson } from "@/common/types/Customer";
import { ProductCardJson } from "@/common/types/ProductCard";
import { cn } from "@/common/utils/cn";
import Helper from "@/common/utils/helper";
import TextMoney from "@/components/shared/displaydata/TextMoney";
import RatingStars from "@/components/shared/displaydata/rating/RatingStars";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useMemo } from "react";
import ProductCardImage from "./ProductCardImage";
import ProductVariantModel from "@/common/models/ProductVariantModel";

const ProductCard = ({
  className,
  data,
}: {
  className?: string;
  data: ProductCardJson;
}) => {
  const productInfo =
    data.variants.length > 0
      ? data.variants[0]
      : ProductVariantModel.getDefaultData();

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

  if (typeof productInfo === "undefined") {
    return null;
  }

  return (
    <div
      className={cn(
        "group relative p-4 max-md:p-3 bg-white border-1 border-gray-200",
        className
      )}
    >
      <div className="flex gap-1 items-center absolute top-1.5 left-2 z-10">
        {productInfo.listing_price > 0 &&
        productInfo.price > 0 &&
        productInfo.listing_price > productInfo.price ? (
          <Button
            radius="lg"
            className="min-w-[60px] h-[18px] text-[0.625rem] px-[3px] text-white bg-orange-500"
          >
            Giảm{" "}
            {Helper.percentDiscount(
              productInfo.listing_price,
              productInfo.price
            )}
          </Button>
        ) : null}
      </div>

      <Link
        href={productUrl}
        className="relative flex justify-center mt-4 overflow-hidden group-hover:z-40 max-md:p-0"
      >
        <ProductCardImage url={productAvatar?.url} alt={data.name} />
      </Link>

      <div className="relative flex flex-col justify-center gap-3 mt-2 telative">
        <div className="text-sm font-medium text-gray-900 group-hover:text-primary hover:underline line-clamp-2">
          <Link href={productUrl} title={data.name} className="text-gray-900">
            {`${data.name}`}
          </Link>
        </div>

        <div className="flex items-center justify-between font-medium">
          <div className="flex flex-col items-start">
            {productInfo.price > 0 ? (
              <>
                <span className="font-medium text-red-500">
                  <TextMoney money={productInfo.price} />
                </span>
                {displayListingPrice > 0 ? (
                  <span className="text-[0.625rem] text-gray-500 font-medium line-through">
                    <TextMoney money={displayListingPrice} />
                  </span>
                ) : null}
              </>
            ) : (
              <span className="font-medium text-red-500">Liên hệ</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          {data.avg_rating > 0 ? (
            <RatingStars rating={data.avg_rating} />
          ) : (
            <p></p>
          )}
        </div>

        {data.info_promotion.length > 0 &&
        data.info_promotion.slice(3, -4) !== "" ? (
          <div className="text-gray-500 bg-[#F0F2F5] rounded-medium flex items-center p-2 max-sm:hidden">
            <div
              className="product-item-promotion-info line-clamp-2"
              dangerouslySetInnerHTML={{
                __html: data.info_promotion,
              }}
            ></div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProductCard;
