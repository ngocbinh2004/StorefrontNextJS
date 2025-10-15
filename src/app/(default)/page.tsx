import BannerApi from "@/common/api/server/BannerApi";
import PageApi from "@/common/api/server/PageApi";
import PageBlockApi from "@/common/api/server/PageBlockApi";
import Banner from "@/common/contants/Banner";
import PageBlockModel from "@/common/models/PageBlockModel";
import PageBlockWrapper from "@/components/features/pageblock/PageBlockWrapper";
import ProductRecentlyViewedList from "@/components/features/product/recentlyviewed/ProductRecentlyViewedList";
import BannerContainer from "@/components/shared/layout/banner/BannerContainer";

const Home = async () => {
  let blockItems: PageBlockModel[] = [];
  const pageIndex = await PageApi.getDetailBySlug("index");
  if (pageIndex.id > 0) {
    const pageBlockCollection = await PageBlockApi.getPageBlockByPageId(
      pageIndex.id
    );
    if (!pageBlockCollection.hasError()) {
      blockItems = pageBlockCollection.items;
    }
  }

  const bigBanner = await BannerApi.getItemByIdentifier(
    Banner.IDENTIFIER_HOMEPAGE_BIG_BANNER
  );

  const bigSlider = await BannerApi.getItemByIdentifier(
    Banner.IDENTIFIER_HOMEPAGE_BIG_SLIDER
  );

  return (
    <>
      <main className="space-y-8 bg-[#f3f3f3] -mb-8 pb-8 max-md:space-y-2 max-md:pb-2">
        {bigBanner.images.length > 0 ? (
          <BannerContainer
            banner={bigBanner.toJson()}
            className={`flex justify-center overflow-hidden ${Banner.IDENTIFIER_HOMEPAGE_BIG_BANNER}`}
            style={{ marginBottom: -76 }}
          />
        ) : null}

        {bigSlider.images.length > 0 ? (
          <BannerContainer
            banner={bigSlider.toJson()}
            className={`flex justify-center ${Banner.IDENTIFIER_HOMEPAGE_BIG_SLIDER}`}
          />
        ) : null}

        {blockItems.length > 0
          ? blockItems.map((item) => {
              return (
                <PageBlockWrapper key={item.id} blockItem={item.toJson()} />
              );
            })
          : null}

        <ProductRecentlyViewedList className="container" />
      </main>
    </>
  );
};

export default Home;
