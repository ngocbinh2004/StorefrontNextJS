import FileModel from "@/common/models/FileModel";
import Image from "next/image";
import React from "react";

const ProductCardImage = ({
  url,
  alt,
  width,
  height,
}: {
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
}) => {
  return (
    <Image
      src={
        typeof url === "string" && url.length > 0
          ? FileModel.getThumbnailFromUrl(url, 180, 180, "crop")
          : "/assets/no-image.svg"
      }
      width={width ?? 180}
      height={height ?? 180}
      alt={alt ?? "product thumbnail"}
      className="object-contain p-2 w-full h-full transition group-hover:scale-110"
    />
  );
};

export default ProductCardImage;
