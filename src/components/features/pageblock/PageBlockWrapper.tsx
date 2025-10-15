import PageBlock from "@/common/contants/PageBlock";
import { PageBlockJson } from "@/common/types/PageBlock";
import PageBlockTypeBanner from "./type/PageBlockTypeBanner";
import PageBlockTypeGrid from "./type/PageBlockTypeGrid";
import PageBlockTypeProduct from "./type/PageBlockTypeProduct";
import PageBlockTypeText from "./type/PageBlockTypeText";
import PageBlockTypeTextWithImage from "./type/PageBlockTypeTextWithImage";
import PageBlockModel from "@/common/models/PageBlockModel";

const PageBlockWrapper = ({ blockItem }: { blockItem: PageBlockJson }) => {
  let dataHtml = blockItem.data.html ?? ``;

  let com = null;
  switch (blockItem.type) {
    case PageBlock.TYPE_TEXT:
    case PageBlock.TYPE_INLINE_HTML:
      if (dataHtml !== "") {
        com = (
          <PageBlockTypeText
            key={blockItem.id}
            html={dataHtml
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .replace(/&amp;/g, "&")}
          />
        );
      }
      break;
    case PageBlock.TYPE_TEXT_WITH_IMAGE:
      com = (
        <PageBlockTypeTextWithImage key={blockItem.id} blockItem={blockItem} />
      );
      break;
    case PageBlock.TYPE_TEXT_GRID:
      com = <PageBlockTypeGrid key={blockItem.id} blockItem={blockItem} />;
      break;
    case PageBlock.TYPE_BANNER:
      com = <PageBlockTypeBanner key={blockItem.id} blockItem={blockItem} />;
      break;
    case PageBlock.TYPE_PRODUCT:
      com = <PageBlockTypeProduct key={blockItem.id} blockItem={blockItem} />;
      break;
  }

  return (
    <div
      style={{
        backgroundColor:
          typeof blockItem.data?.background_color === "string" &&
          blockItem.data.background_color.length > 0
            ? `${blockItem.data.background_color}`
            : undefined,
        color:
          typeof blockItem.data?.text_color === "string" &&
          blockItem.data.text_color.length > 0
            ? `${blockItem.data.text_color}`
            : undefined,
        padding:
          typeof blockItem.data?.padding === "string" &&
          blockItem.data.padding.length > 0
            ? `${blockItem.data.padding}`
            : undefined,
      }}
      className={`container ${PageBlockModel.getRoundedClass(
        blockItem.data.rounded_size
      )}`}
    >
      {typeof blockItem.data?.title === "string" &&
      blockItem.data.title.length > 0 ? (
        <div
          style={{
            color:
              typeof blockItem.data?.title_color === "string" &&
              blockItem.data.title_color.length > 0
                ? `${blockItem.data.title_color}`
                : undefined,
            padding:
              typeof blockItem.data?.title_padding === "string" &&
              blockItem.data.title_padding.length > 0
                ? `${blockItem.data.title_padding}`
                : undefined,
          }}
          className={`ldp-title-box ${PageBlockModel.getTextAlignClass(
            blockItem.data.title_align
          )} ${PageBlockModel.getTextSizeClass(blockItem.data.title_size)}`}
        >
          <strong>{blockItem.data.title}</strong>
        </div>
      ) : null}
      <div>{com}</div>
    </div>
  );
};

export default PageBlockWrapper;
