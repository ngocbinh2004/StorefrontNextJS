"use client";

import Product from "@/common/contants/Product";
import { ProductJson } from "@/common/types/Product";
import Image from "next/image";
import { useCallback } from "react";
import dayjs from "dayjs";

const ProductStickerList = ({ product }: { product: ProductJson }) => {
  const imageWidth = 150;
  const imageHeight = 150;

  const checkValidDate = useCallback((start: string, end: string) => {
    let valid = false;

    let now = dayjs();
    let dateStart = 0;
    let dateEnd = 0;

    if (start !== "" && end !== "") {
      dateStart = dayjs(start, "DD/MM/YYYY").unix();
      dateEnd = dayjs(end, "DD/MM/YYYY").unix();

      // mặc định là hiện, nếu có ngày thì kiểm tra hợp lệ mới hiện
      if (dateStart >= now.unix() && now.unix() <= dateEnd) {
        valid = true;
      }
    }

    return valid;
  }, []);

  const checkRenderImage = useCallback(
    (type: number) => {
      return product.decorations.find(
        (i) =>
          i.type === type &&
          i.id > 0 &&
          checkValidDate(i.date_started, i.date_ended),
      );
    },
    [product.decorations, checkValidDate],
  );

  return (
    <>
      {checkRenderImage(Product.TYPE_STICKER_TOP_LEFT) !== undefined ? (
        <div className="absolute top-0 left-0">
          <Image
            src={
              checkRenderImage(Product.TYPE_STICKER_TOP_LEFT)?.file.url ?? ""
            }
            width={imageWidth}
            height={imageHeight}
            alt=""
          />
        </div>
      ) : null}

      {checkRenderImage(Product.TYPE_STICKER_TOP_RIGHT) !== undefined ? (
        <div className="absolute top-0 right-0">
          <Image
            src={
              checkRenderImage(Product.TYPE_STICKER_TOP_RIGHT)?.file.url ?? ""
            }
            width={imageWidth}
            height={imageHeight}
            alt=""
          />
        </div>
      ) : null}

      {checkRenderImage(Product.TYPE_STICKER_BOTTOM_LEFT) !== undefined ? (
        <div className="absolute bottom-0 left-0">
          <Image
            src={
              checkRenderImage(Product.TYPE_STICKER_BOTTOM_LEFT)?.file.url ?? ""
            }
            width={imageWidth}
            height={imageHeight}
            alt=""
          />
        </div>
      ) : null}

      {checkRenderImage(Product.TYPE_STICKER_BOTTOM_RIGHT) !== undefined ? (
        <div className="absolute bottom-0 right-0">
          <Image
            src={
              checkRenderImage(Product.TYPE_STICKER_BOTTOM_RIGHT)?.file.url ??
              ""
            }
            width={imageWidth}
            height={imageHeight}
            alt=""
          />
        </div>
      ) : null}
    </>
  );
};

export default ProductStickerList;
