"use client";
import { ProductJson } from "@/common/types/Product";
import { useState } from "react";
import ProductGalleryCarousel from "./ProductGalleryCarousel";
import ProductGalleryVariantList from "./ProductGalleryVariantList";

const ProductGalleryWrapper = ({ product }: { product: ProductJson }) => {
  const [variantId, setVariantId] = useState(0);
  return (
    <>
      <ProductGalleryCarousel
        key={product.id}
        variantSelectedId={variantId}
        product={product}
      />
      <ProductGalleryVariantList
        variantId={variantId}
        onChangeVariant={(id: number) => setVariantId(id)}
        variants={product.variants}
      />
    </>
  );
};

export default ProductGalleryWrapper;
