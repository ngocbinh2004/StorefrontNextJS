import { BannerImageJson } from "@/common/types/BannerImage";
import Image from "next/image";
import React from "react";

const BannerModeGrid = ({
  defaultLink,
  images,
  width,
  height,
  column,
  columnGap,
  rowGap,
  className,
  roundedClass,
}: {
  defaultLink: string;
  width?: number;
  height?: number;
  images: BannerImageJson[];
  column?: number;
  columnGap?: number;
  rowGap?: number;
  className?: string;
  roundedClass?: string;
}) => {
  //ensure column always between 1 and 12, default to 1
  const col =
    typeof column !== "undefined" && column >= 1 && column <= 12 ? column : 1;

  let gridCols = `grid `;
  switch (col) {
    case 1:
      gridCols += "grid-cols-1";
      break;
    case 2:
      gridCols += "grid-cols-2";
      break;
    case 3:
      gridCols += "grid-cols-3";
      break;
    case 4:
      gridCols += "grid-cols-4";
      break;
    case 5:
      gridCols += "grid-cols-5";
      break;
    case 6:
      gridCols += "grid-cols-6";
      break;
    case 7:
      gridCols += "grid-cols-7";
      break;
    case 8:
      gridCols += "grid-cols-8";
      break;
    case 9:
      gridCols += "grid-cols-9";
      break;
    case 10:
      gridCols += "grid-cols-10";
      break;
    case 11:
      gridCols += "grid-cols-11";
      break;
    case 12:
      gridCols += "grid-cols-12";
      break;
  }

  return (
    <div
      className={`${className} ${col > 1 ? gridCols : "flex justify-center"}`}
      style={{
        width: typeof width !== "undefined" && width > 0 ? width : undefined,
        height:
          typeof height !== "undefined" && height > 0 ? height : undefined,
        columnGap:
          typeof columnGap !== "undefined" && columnGap > 0 ? columnGap : 0,
        rowGap: typeof rowGap !== "undefined" && rowGap > 0 ? rowGap : 0,
      }}
    >
      {images.length > 0
        ? images.map((image) => {
            const imageLink = image.link.length > 0 ? image.link : defaultLink;

            return (
              <a
                key={image.id}
                href={imageLink}
                style={{ width: image.file.width, maxWidth: "100%" }}
              >
                <Image
                  title={image.title}
                  alt={image.alt_text}
                  src={image.file.url}
                  width={image.file.width}
                  height={image.file.height}
                  className={`${roundedClass}`}
                />
              </a>
            );
          })
        : null}
    </div>
  );
};

export default BannerModeGrid;
