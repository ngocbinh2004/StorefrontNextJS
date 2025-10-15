import BannerApi from "@/common/api/server/BannerApi";
import { PageBlockJson } from "@/common/types/PageBlock";
import { cn } from "@/common/utils/cn";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";
import BannerContainer from "@/components/shared/layout/banner/BannerContainer";

const PageBlockTypeBanner = async ({
  blockItem,
}: {
  blockItem: PageBlockJson;
}) => {
  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  );

  const blockBanner = await BannerApi.getItemById(
    blockItem.data.banner_id ?? 0
  );

  return (
    <>
      {blockBanner.images.length > 0 ? (
        <BannerContainer
          banner={blockBanner.toJson()}
          className={`flex justify-center mt-4`}
        />
      ) : null}
    </>
  );
};

export default PageBlockTypeBanner;
