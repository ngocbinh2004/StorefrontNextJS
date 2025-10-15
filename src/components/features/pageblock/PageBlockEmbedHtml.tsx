import PageBlockModel from "@/common/models/PageBlockModel";
import PageBlockWrapper from "./PageBlockWrapper";

const PageBlockEmbedHtml = ({
  identifier,
  allPageBlocks,
}: {
  identifier: string;
  allPageBlocks: PageBlockModel[];
}) => {
  const foundPageBlock = allPageBlocks.find(
    (item) => item.identifier === identifier,
  );

  if (
    typeof foundPageBlock !== "undefined" &&
    foundPageBlock.data.html !== undefined
  ) {
    return <PageBlockWrapper blockItem={foundPageBlock} />;
  } else {
    return <>[{identifier}]</>;
  }
};

export default PageBlockEmbedHtml;
