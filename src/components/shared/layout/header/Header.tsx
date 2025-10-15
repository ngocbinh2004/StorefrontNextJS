import PageBlockApi from "@/common/api/server/PageBlockApi";
import { ListInputItems } from "@/common/interfaces/ListInput";
import HeaderBar from "./bar/HeaderBar";
import HeaderNavigation from "./navigation/HeaderNavigation";
import BannerApi from "@/common/api/server/BannerApi";
import BannerContainer from "../banner/BannerContainer";
import Banner from "@/common/contants/Banner";

const LayoutHeader = async () => {
  // get pageblock headermenu by identity
  const headerMenuItems = await PageBlockApi.getDetailByIdentifier(
    "header-menu"
  );

  let listItems: ListInputItems = [];
  if (!headerMenuItems.hasError()) {
    if (typeof headerMenuItems.data.items !== "undefined") {
      listItems = headerMenuItems.data.items;
    }
  }

  //top page banner
  const topBanner = await BannerApi.getItemByIdentifier(
    Banner.IDENTIFIER_TOP_BANNER
  );

  return (
    <div className="header-bg max-md:px-2.5">
      {topBanner.images.length > 0 ? (
        <BannerContainer
          banner={topBanner.toJson()}
          className="flex justify-center"
        />
      ) : null}
      <HeaderBar headerMenuItems={listItems} />
      <HeaderNavigation headerMenuItems={listItems} />
    </div>
  );
};

export default LayoutHeader;
