import { PageBlockJson } from "@/common/types/PageBlock";
import { cn } from "@/common/utils/cn";
import Helper from "@/common/utils/helper";
import PageBlockDisplayImage from "../PageBlockDisplayImage";
import PageBlockTypeText from "./PageBlockTypeText";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";

const PageBlockTypeTextWithImage = ({
  blockItem,
}: {
  blockItem: PageBlockJson;
}) => {
  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  );

  let dataHtml = blockItem.data.html ?? ``;
  let listItems = blockItem.data.items ?? [];
  let imageLayout = blockItem.data.image_layout ?? "";
  let photoHeight = 100;

  let link = "";
  let url = "";
  let alt = "";
  if (listItems.length > 0) {
    link = listItems[0].link;
    url = listItems[0].photo.files[0].url;
    photoHeight = listItems[0].photo.files[0].height;
    alt = listItems[0].description;
  }

  switch (imageLayout) {
    case "left":
    case "right":
      return (
        <div className={"flex overflow-hidden"}>
          <div
            className={cn(
              "grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2",
              isMobile ? "mx-2" : "mx-auto"
            )}
          >
            <div className="lg:ml-auto lg:pl-4 lg:pt-4">
              <div className="lg:max-w-lg">
                <PageBlockTypeText html={dataHtml} />
              </div>
            </div>
            <div
              className={`flex items-start justify-end ${
                imageLayout === "left" ? "order-first" : ""
              }`}
            >
              <PageBlockDisplayImage
                link={link}
                url={url}
                alt={alt}
                height={photoHeight}
                width={800}
              />
            </div>
          </div>
        </div>
      );
      break;
    case "background":
      return (
        <div
          className={cn(
            "bg-no-repeat bg-cover overflow-hidden",
            isMobile ? "mx-2" : ""
          )}
          style={{
            backgroundImage: `url(${url})`,
            height: "100%",
          }}
        >
          <PageBlockTypeText html={dataHtml} />
        </div>
      );
      break;
    default:
      return (
        <div className={cn("flex overflow-hidden", isMobile ? "mx-2" : "")}>
          <div className="flex-shrink-0 mr-4">
            <PageBlockDisplayImage
              link={link}
              url={url}
              alt={alt}
              height={photoHeight}
            />
          </div>
          <div>
            <PageBlockTypeText html={dataHtml} />
          </div>
        </div>
      );
      break;
  }
};

export default PageBlockTypeTextWithImage;
