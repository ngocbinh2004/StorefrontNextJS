import ProductApi from "@/common/api/server/ProductApi";
import ProductRecentlyViewedApi from "@/common/api/server/ProductRecentlyViewedApi";
import { ProductCardJson } from "@/common/types/ProductCard";
import { cn } from "@/common/utils/cn";
import { Carousel } from "@/components/shared/displaydata/Carousel";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";
import ProductRecentlyViewedItem from "./ProductRecentlyViewedItem";

const ProductRecentlyViewedList = async ({
  className,
}: {
  className?: string;
}) => {
  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  );

  const productRecentlyViewedIdList = await ProductRecentlyViewedApi.getItems();
  const productIdList = productRecentlyViewedIdList.split(".");

  // get ProductCard by idlist
  let productCardItems: ProductCardJson[] = [];
  const productCollection = await ProductApi.getByIdList(
    productIdList.join(",")
  );
  if (!productCollection.hasError()) {
    productCardItems = productCollection.items;
  }

  return productIdList.length > 0 ? (
    <section className={cn(className)}>
      <div className="bg-white rounded-2xl max-md:rounded-none max-md:p-2.5 no-scrollbar">
        <div className="flex px-2.5 py-2 sm:py-4 lg:py-4">
          <div className="flex items-start justify-start w-full">
            <h2 className="text-xl font-bold">Sản phẩm vừa xem</h2>
          </div>
        </div>
        {productCardItems.length > 0 ? (
          <div className={`${!isMobile ? "p-2" : ""}`}>
            <Carousel
              autoPlay={true}
              loop
              slides={{ perView: !isMobile ? 5 : 2, spacing: 16 }}
              hideDot
            >
              {productCardItems.map((item: ProductCardJson) => {
                return (
                  <ProductRecentlyViewedItem key={item.id} productCard={item} />
                );
              })}
            </Carousel>
          </div>
        ) : null}
      </div>
    </section>
  ) : null;
};

export default ProductRecentlyViewedList;
