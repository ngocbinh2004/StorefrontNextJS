import { ProductCardJson } from "@/common/types/ProductCard";
import { CustomerWishlistJson } from "@/common/types/CustomerWishlist";
import { cn } from "@/common/utils/cn";
import SectionWrapper from "@/components/shared/layout/sections/SectionWrapper";
import React from "react";
import ProductCard from "../card/ProductCard";
import { CustomerJson } from "@/common/types/Customer";
import { v4 as uuidv4 } from "uuid";

const ProductList = ({
  items,
  className,
  gridCol,
}: {
  items: ProductCardJson[];
  className?: string;
  gridCol?: string;
}) => {
  return (
    <SectionWrapper className={`${className ?? "mt-0"}`}>
      <div
        className={cn(
          "grid gap-4 max-md:grid-cols-2 max-md:overflow-hidden",
          gridCol && gridCol !== "" ? gridCol : "grid-cols-5"
        )}
      >
        {items.map((item) => (
          <ProductCard key={item.id} data={item} className="flex-1" />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default ProductList;
