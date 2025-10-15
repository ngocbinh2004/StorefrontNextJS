"use client";

import { ProductCardJson } from "@/common/types/ProductCard";
import ProductCard from "../product/card/ProductCard";

const WishlistList = ({
  productCardItems,
}: {
  productCardItems: ProductCardJson[];
}) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {productCardItems.map((item) => {
          return <ProductCard key={item.id} data={item} />;
        })}
      </div>
    </>
  );
};

export default WishlistList;
