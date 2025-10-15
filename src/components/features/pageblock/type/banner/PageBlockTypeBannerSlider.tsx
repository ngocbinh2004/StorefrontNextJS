import { ListInputItems } from "@/common/interfaces/ListInput";
import {
  Carousel,
  CarouselItem,
} from "@/components/shared/displaydata/Carousel";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";

const PageBlockTypeBannerSlider = ({
  listPhotos,
  photoHeight,
  photoWidth,
  perView,
  spacing,
  backgroundColor,
}: {
  listPhotos: ListInputItems;
  photoHeight: string;
  photoWidth: string;
  perView: number;
  spacing: number;
  backgroundColor?: string;
}) => {
  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  );

  let width: string = photoWidth !== "" ? `${photoWidth}px` : `100%`;
  let height: string = photoHeight !== "" ? `${photoHeight}px` : `100%`;

  return (
    <Carousel
      autoPlay={true}
      loop
      slides={{ perView: perView, spacing: spacing }}
      hideDot
      hideDotOnMobile
      hideArrowOnMobile
      style={{
        backgroundColor: backgroundColor || "",
        height: height,
        width: isMobile ? "auto" : "",
      }}
    >
      {listPhotos.map((item) => {
        const avatarUrl =
          item.photo.files.length > 0
            ? item.photo.files[0].url
            : "/assets/no-image.svg";
        const link = item.link !== "" ? item.link : "/";

        return (
          <Link key={item.key} href={link} title={item.title}>
            <CarouselItem
              key={item.key}
              style={{ width: isMobile ? "auto" : width, height: height }}
            >
              <Image
                src={avatarUrl}
                height={photoHeight !== "" ? +photoHeight : 0}
                width={photoWidth !== "" ? +photoWidth : 0}
                title={item.title}
                alt={item.title}
                sizes="100vw"
                style={{ width: isMobile ? "100%" : width, height: height }}
                className="rounded-lg "
              />
            </CarouselItem>
          </Link>
        );
      })}
    </Carousel>
  );
};

export default PageBlockTypeBannerSlider;
