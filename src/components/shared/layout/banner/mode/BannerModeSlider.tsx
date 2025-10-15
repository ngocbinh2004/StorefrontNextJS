import { BannerImageJson } from "@/common/types/BannerImage";
import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselItem,
} from "@/components/shared/displaydata/Carousel";
import Link from "next/link";

const BannerModeSlider = ({
  defaultLink,
  images,
  width,
  height,
  column,
  isMobile,
  autoPlay,
  delayInMs,
  columnGap,
  className,
  roundedClass,
}: {
  defaultLink: string;
  width?: number;
  height?: number;
  images: BannerImageJson[];
  column?: number;
  isMobile: boolean;
  autoPlay: boolean;
  delayInMs?: number;
  columnGap?: number;
  className?: string;
  roundedClass?: string;
}) => {
  //ensure column always between 1 and 12, default to 1
  const col =
    typeof column !== "undefined" && column >= 1 && column <= 12 ? column : 1;

  return (
    <div
      style={{
        width: typeof width !== "undefined" && width > 0 ? width : undefined,
        height:
          typeof height !== "undefined" && height > 0 ? height : undefined,
      }}
    >
      <Carousel
        className={className}
        autoPlay={autoPlay}
        loop
        slides={{ perView: col, spacing: columnGap ?? 10 }}
        hideDot
        hideDotOnMobile
        hideArrowOnMobile
        style={{
          height: height,
          width: "auto",
        }}
        delay={delayInMs}
      >
        {images.map((image) => {
          const imageLink = image.link.length > 0 ? image.link : defaultLink;

          return (
            <Link key={image.id} href={imageLink} title={image.title}>
              <CarouselItem
                style={{ width: isMobile ? "auto" : width, height: height }}
              >
                <Image
                  title={image.title}
                  alt={image.alt_text}
                  src={image.file.url}
                  width={image.file.width}
                  height={image.file.height}
                  sizes="100vw"
                  style={{ width: isMobile ? "100%" : width, height: height }}
                  className={`${roundedClass}`}
                />
              </CarouselItem>
            </Link>
          );
        })}
      </Carousel>
    </div>
  );
};

export default BannerModeSlider;
