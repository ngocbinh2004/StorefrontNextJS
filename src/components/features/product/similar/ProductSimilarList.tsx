"use client";

import ProductNextApi from "@/common/api/next/ProductNextApi";
import ProductCardCollection from "@/common/collections/ProductCardCollection";
import { ProductJson } from "@/common/types/Product";
import { ProductCardJson } from "@/common/types/ProductCard";
import {
  Carousel,
  CarouselItem,
} from "@/components/shared/displaydata/Carousel";
import { useCallback, useEffect, useState } from "react";
import ProductCard from "../card/ProductCard";

const ProductSimilarList = ({ product }: { product: ProductJson }) => {
  const [loading, setLoading] = useState(false);
  const [collection, setCollection] = useState<ProductCardCollection>(
    new ProductCardCollection()
  );

  const fetchData = useCallback(
    async (categoryId: number) => {
      if (product.variants.length > 0) {
        const value = product.variants[0].price;
        setLoading(true);
        const productCollection = await ProductNextApi.search(
          {
            page: 1,
            limit: 20,
            sorttype: "",
            sortby: "",
            keyword: "",
            category_id: categoryId,
            price: `${value - 2000000}-${value + 2000000}`,
          },
          []
        );

        setCollection(productCollection);
        setLoading(false);
      }
    },
    [product]
  );

  useEffect(() => {
    fetchData(product.category_primary);
  }, [fetchData, product.category_primary]);

  if (loading) {
    <>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 ">
        <div>
          <div className="relative isolate space-y-5 overflow-hidden rounded-2xl bg-black/5 p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-rose-100/10 before:bg-gradient-to-r before:from-transparent before:via-rose-100/10 before:to-transparent">
            <div className="h-24 rounded-lg bg-rose-100/10"></div>
            <div className="space-y-3">
              <div className="w-3/5 h-3 rounded-lg bg-rose-100/10"></div>
              <div className="w-4/5 h-3 rounded-lg bg-rose-100/20"></div>
              <div className="w-2/5 h-3 rounded-lg bg-rose-100/20"></div>
            </div>
          </div>
        </div>
        <div>
          <div className="relative isolate space-y-5 overflow-hidden rounded-2xl bg-black/5 p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-rose-100/10 before:bg-gradient-to-r before:from-transparent before:via-rose-100/10 before:to-transparent">
            <div className="h-24 rounded-lg bg-rose-100/10"></div>
            <div className="space-y-3">
              <div className="w-3/5 h-3 rounded-lg bg-rose-100/10"></div>
              <div className="w-4/5 h-3 rounded-lg bg-rose-100/20"></div>
              <div className="w-2/5 h-3 rounded-lg bg-rose-100/20"></div>
            </div>
          </div>
        </div>
        <div className="hidden sm:block">
          <div className="relative isolate space-y-5 overflow-hidden rounded-2xl bg-black/5 p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-rose-100/10 before:bg-gradient-to-r before:from-transparent before:via-rose-100/10 before:to-transparent">
            <div className="h-24 rounded-lg bg-rose-100/10"></div>
            <div className="space-y-3">
              <div className="w-3/5 h-3 rounded-lg bg-rose-100/10"></div>
              <div className="w-4/5 h-3 rounded-lg bg-rose-100/20"></div>
              <div className="w-2/5 h-3 rounded-lg bg-rose-100/20"></div>
            </div>
          </div>
        </div>
      </div>
    </>;
  }

  if (collection.total > 0) {
    return (
      <div className="space-y-4 border rounded-[5px] p-2 max-md:p-0 max-md:border-none">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">Sản phẩm tương tự</h3>
        </div>
        <Carousel
          slides={{ perView: 3, spacing: 16 }}
          breakpoints={{
            "(max-width: 1023px)": {
              slides: { perView: 2, spacing: 8 },
            },
            "(max-width: 767px)": {
              slides: { perView: 3, spacing: 8 },
            },
            "(max-width: 512px)": {
              slides: { perView: 2, spacing: 8 },
            },
            "(max-width: 370px)": {
              slides: { perView: 1, spacing: 8 },
            },
          }}
          hideDot
        >
          {collection.items
            .filter((item) => item.id !== product.id)
            .map((item: ProductCardJson) => {
              return (
                <CarouselItem key={item.id}>
                  <ProductCard data={item} />
                </CarouselItem>
              );
            })}
        </Carousel>
      </div>
    );
  }
};

export default ProductSimilarList;
