import LandingApi from "@/common/api/server/LandingApi";
import RedirectLinkApi from "@/common/api/server/RedirectLinkApi";
import LandingModel from "@/common/models/LandingModel";
import Helper from "@/common/utils/helper";
import LandingPageBlock from "@/components/features/landing/pageblock/LandingPageBlockList";
import { notFound, redirect } from "next/navigation";

const LandingPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const slug = searchParams.slug?.toString() || "";

  let myPage = new LandingModel(LandingModel.getDefaultData());

  if (slug.length > 0) {
    // we define slug "index" is homepage, so if slug is "index" we redirect to homepage
    if (slug === "index") {
      redirect("/");
    } else {
      myPage = await LandingApi.getDetailBySlug(slug);
      if (myPage.hasError() || !Helper.compareStrings(slug, myPage.seo_url)) {
        const getRedirecLink = await RedirectLinkApi.getDetailBySourceUrl(
          `${slug}`,
        );
        if (!getRedirecLink.hasError()) {
          redirect(getRedirecLink.redirect_url);
        } else {
          notFound();
        }
      }
    }
  } else {
    notFound();
  }

  return (
    <div className="container pb-8 -mb-8">
      <div className="max-w-full px-4 prose sm:px-0">
        <h1 className="mt-8 mb-4">{myPage?.title}</h1>
        <LandingPageBlock pageId={myPage.id} />
      </div>
    </div>
  );
};

export default LandingPage;
