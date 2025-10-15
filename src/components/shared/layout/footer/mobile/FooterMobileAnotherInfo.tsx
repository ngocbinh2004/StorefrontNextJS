import PageBlockModel from "@/common/models/PageBlockModel";
import PageBlockEmbedHtml from "@/components/features/pageblock/PageBlockEmbedHtml";
import FooterMobileAnotherInfoWrapper from "./FooterMobileAnotherInfoWrapper";

const FooterMobileAnotherInfo = ({
  allPageBlocks,
}: {
  allPageBlocks: PageBlockModel[];
}) => {
  return (
    <FooterMobileAnotherInfoWrapper
      title={<p className="my-0 text-[13px] font-medium">Thông tin khác</p>}>
      <div className="box-border p-2 bg-gray-100">
        <PageBlockEmbedHtml
          identifier="footer-mobile-another-info"
          allPageBlocks={allPageBlocks}
        />
      </div>
    </FooterMobileAnotherInfoWrapper>
  );
};

export default FooterMobileAnotherInfo;
