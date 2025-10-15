"use client";

import { ProductJson } from "@/common/types/Product";
import { cn } from "@/common/utils/cn";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import ProductStickerList from "../productsticker/ProductStickerList";
import FileModel from "@/common/models/FileModel";

const ProductGalleryCarousel = ({
  variantSelectedId,
  product,
}: {
  variantSelectedId: number;
  product: ProductJson;
}) => {
  const [currentSlide, setCurrentSlide] = React.useState(10);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const handlePrevClick = (e: any) => {
    e.stopPropagation();
    if (!instanceRef.current) return;
    const details = instanceRef.current.track.details;
    if (details.position <= 0) return;
    if (instanceRef.current && details.position === 0)
      instanceRef.current?.moveToIdx(details.slidesLength - 1);
    else instanceRef.current?.prev();
  };

  const handleNextClick = (e: any) => {
    e.stopPropagation();
    if (!instanceRef.current) return;
    const details = instanceRef.current.track.details;
    if (details.position >= details.maxIdx) return;
    if (
      instanceRef.current &&
      instanceRef.current.track.details?.position ===
        instanceRef.current?.track.details?.slidesLength - 1
    )
      instanceRef.current?.moveToIdx(0);
    else instanceRef.current?.next();
  };

  const imageList = useMemo(() => {
    let images = product.avatar_file_list.concat(
      product.photo_gallery_file_list
    );

    if (variantSelectedId > 0) {
      const variant = product.variants.find((v) => v.id === variantSelectedId);

      if (typeof variant !== "undefined") {
        images = variant.avatar_file_list.concat(
          variant.photo_gallery_file_list
        );
      }
    }
    return images;
  }, [product, variantSelectedId]);

  return (
    <div key={variantSelectedId} className="relative flex-1">
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {imageList.map((item) => (
            <div key={item.id} className="relative keen-slider__slide">
              <Image
                src={FileModel.getThumbnailFromUrl(item.url, 500, 500)}
                width={500}
                height={500}
                alt={product.name}
                className="block w-full m-auto bg-transparent border-none md:w-4/6"
              />
              {product.avatar_file_id_list.includes(item.id) ? (
                <ProductStickerList product={product} />
              ) : null}
            </div>
          ))}
        </div>
        {loaded && instanceRef.current && imageList.length > 1 ? (
          <>
            <IconChevronLeft
              onClick={handlePrevClick}
              className={cn(
                "w-8 h-16 rounded-r-md absolute top-1/2 -translate-y-1/2 cursor-pointer bg-gray-800 hover:opacity-50 opacity-20",
                currentSlide === 0 ? "hover:opacity-20 cursor-not-allowed" : ""
              )}
              color="white"
            />

            <IconChevronRight
              className={cn(
                "w-8 h-16 rounded-l-md absolute top-1/2 -translate-y-1/2 cursor-pointer bg-gray-800 hover:opacity-50 opacity-20",
                "right-0",

                currentSlide === instanceRef.current.track.details?.maxIdx
                  ? "hover:opacity-20 cursor-not-allowed"
                  : ""
              )}
              color="white"
              onClick={handleNextClick}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ProductGalleryCarousel;
