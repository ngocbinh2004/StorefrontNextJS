import PageBlockApi from "@/common/api/server/PageBlockApi";
import PageBlockEmbedHtml from "@/components/features/pageblock/PageBlockEmbedHtml";
import FooterMobileAnotherInfo from "./FooterMobileAnotherInfo";
import ScrollToTopButton from "../../ScrollToTopButton";

const FooterMobile = async () => {
  const getAllPageBlocks = await PageBlockApi.getItems();

  return (
    <footer className="flex justify-center w-full px-2 pt-2 pb-20 bg-white md:hidden">
      <div className="container [&_>_div+div]:border-t">
        <div className="py-2">
          <PageBlockEmbedHtml
            identifier="footer-mobile-member"
            allPageBlocks={getAllPageBlocks.items}
          />
        </div>
        <div className="[&_>_div]:px-0">
          <FooterMobileAnotherInfo allPageBlocks={getAllPageBlocks.items} />
        </div>

        <PageBlockEmbedHtml
          identifier="footer-mobile-partner-1"
          allPageBlocks={getAllPageBlocks.items}
        />

        <PageBlockEmbedHtml
          identifier="footer-mobile-connect-1"
          allPageBlocks={getAllPageBlocks.items}
        />

        <PageBlockEmbedHtml
          identifier="footer-mobile-1"
          allPageBlocks={getAllPageBlocks.items}
        />

        <div className="border-b-0">
          <PageBlockEmbedHtml
            identifier="footer-mobile"
            allPageBlocks={getAllPageBlocks.items}
          />
        </div>
      </div>

      <ScrollToTopButton />
    </footer>
  );
};

export default FooterMobile;
