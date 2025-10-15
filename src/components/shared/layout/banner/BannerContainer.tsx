import BannerImage from "@/common/contants/BannerImage";
import Banner from "@/common/contants/Banner";
import { BannerJson } from "@/common/types/Banner";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";
import BannerModeGrid from "./mode/BannerModeGrid";
import BannerModeSlider from "./mode/BannerModeSlider";
import PageBlockModel from "@/common/models/PageBlockModel";

const BannerContainer = async ({
  banner,
  className,
  style,
}: {
  banner: BannerJson;
  className?: string;
  style?: object;
}) => {
  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  );

  const images = banner.images.filter((i) => {
    return (
      i.screen_mode === BannerImage.SCREEN_MODE_ALL ||
      (i.screen_mode === BannerImage.SCREEN_MODE_DESKTOP_ONLY && !isMobile) ||
      (i.screen_mode === BannerImage.SCREEN_MODE_MOBILE_ONLY && isMobile)
    );
  });

  const width =
    typeof banner.width === "number" && banner.width > 0 ? banner.width : 1200;

  const height =
    typeof banner.height === "number" && banner.height > 0
      ? banner.height
      : undefined;

  //factory, render banner type
  const renderBanner = (banner: BannerJson) => {
    let com = null;

    //init default values
    const defaultLink = "/";

    switch (banner.mode) {
      case Banner.MODE_GRID:
        com = (
          <BannerModeGrid
            className={banner.classname}
            defaultLink={defaultLink}
            images={images}
            width={width}
            height={height}
            column={isMobile ? banner.column_mobile : banner.column_desktop}
            columnGap={banner.column_gap}
            rowGap={banner.row_gap}
            roundedClass={PageBlockModel.getRoundedClass(banner.rounded_size)}
          />
        );
        break;
      case Banner.MODE_SLIDER:
        com = (
          <BannerModeSlider
            className={banner.classname}
            defaultLink={defaultLink}
            images={images}
            width={width}
            height={height}
            column={isMobile ? banner.column_mobile : banner.column_desktop}
            isMobile={isMobile}
            autoPlay={banner.slide_autoplay === 1}
            delayInMs={banner.slide_delay}
            columnGap={banner.column_gap}
            roundedClass={PageBlockModel.getRoundedClass(banner.rounded_size)}
          />
        );
        break;
    }
    return com;
  };

  return (
    <div
      className={className}
      style={{
        ...style,
        backgroundColor:
          banner.background_color.length > 0
            ? `#${banner.background_color}`
            : undefined,
      }}
    >
      {renderBanner(banner)}
    </div>
  );
};

export default BannerContainer;
