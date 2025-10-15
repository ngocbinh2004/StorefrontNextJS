import PageBlockApi from "@/common/api/server/PageBlockApi";
import PageBlockEmbedHtml from "../../../../features/pageblock/PageBlockEmbedHtml";
import ScrollToTopButton from "../../ScrollToTopButton";

const FooterDesktop = async () => {
  const getAllPageBlocks = await PageBlockApi.getPageBlockByGroupIdentifier(
    "footer"
  );

  return (
    <footer className="flex flex-col items-center justify-center w-full pt-4 text-left bg-white border-t border-gray-200 max-md:hidden">
      <div className="container">
        <div className="flex items-start justify-start w-full">
          <div className="w-1/4">
            <PageBlockEmbedHtml
              identifier="footer-customer-support"
              allPageBlocks={getAllPageBlocks.items}
            />
          </div>
          <div className="w-1/4">
            <PageBlockEmbedHtml
              identifier="footer-policy"
              allPageBlocks={getAllPageBlocks.items}
            />
          </div>
          <div className="w-1/4">
            <PageBlockEmbedHtml
              identifier="footer-contact-1"
              allPageBlocks={getAllPageBlocks.items}
            />
          </div>

          <div className="w-1/4 pl-8">
            <PageBlockEmbedHtml
              identifier="footer-connect-1"
              allPageBlocks={getAllPageBlocks.items}
            />
          </div>
        </div>

        <div className="my-2 h-px w-[calc(100%+40px)] -ml-5 bg-primary"></div>

        <div className="grid grid-cols-4 text-xs pb-2.5 leading-6">
          <PageBlockEmbedHtml
            identifier="footer-col-1"
            allPageBlocks={getAllPageBlocks.items}
          />
          <PageBlockEmbedHtml
            identifier="footer-col-2"
            allPageBlocks={getAllPageBlocks.items}
          />
          <PageBlockEmbedHtml
            identifier="footer-col-3"
            allPageBlocks={getAllPageBlocks.items}
          />
          <PageBlockEmbedHtml
            identifier="footer-col-4"
            allPageBlocks={getAllPageBlocks.items}
          />
        </div>
      </div>

      <div className="flex items-center justify-center w-full p-2 bg-gray-100">
        <PageBlockEmbedHtml
          identifier="footer-1"
          allPageBlocks={getAllPageBlocks.items}
        />
      </div>

      <ScrollToTopButton />
    </footer>
  );
};

export default FooterDesktop;
