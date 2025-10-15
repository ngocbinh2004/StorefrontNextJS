import { ProductCardJson } from "@/common/types/ProductCard";
import { CarouselItem } from "@/components/shared/displaydata/Carousel";
import ProductCard from "../card/ProductCard";

const ProductRecentlyViewedItem = async ({
  productCard,
}: {
  productCard: ProductCardJson;
}) => {
  return (
    <CarouselItem className="w-full">
      <ProductCard data={productCard} />
    </CarouselItem>
  );
};

export default ProductRecentlyViewedItem;
