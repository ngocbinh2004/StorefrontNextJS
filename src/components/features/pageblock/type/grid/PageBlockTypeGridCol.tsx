import { PageBlockJson } from "@/common/types/PageBlock";
import { cn } from "@/common/utils/cn";
import Helper from "@/common/utils/helper";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import {
  Carousel,
  CarouselItem,
} from "@/components/shared/displaydata/Carousel";
import { v4 as uuidv4 } from "uuid";
import { ListInputItem, ListInputItems } from "@/common/interfaces/ListInput";
import { useMemo } from "react";
import { getSelectorsByUserAgent } from "react-device-detect";

const PageBlockTypeGridCol = ({
  blockItem,
  gridCols,
}: {
  blockItem: PageBlockJson;
  gridCols: string;
}) => {
  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  );

  const listItems = useMemo(() => {
    return blockItem.data.items ?? [];
  }, [blockItem]);
  let itemHeight = blockItem.data.item_height ?? "";
  let isDisplayBorder = blockItem.data.is_display_border;
  let titleStyle = blockItem.data.title_style ?? "";

  const limit = 8;

  const sliderItem1: ListInputItems = useMemo(() => {
    let item = [];
    for (let i = 0; i < limit; i++) {
      if (typeof listItems[i] !== "undefined") {
        item.push(listItems[i]);
      }
    }
    return item;
  }, [listItems]);
  const sliderItem2: ListInputItems = useMemo(() => {
    let item = [];
    for (let i = limit; i < limit * 2; i++) {
      if (typeof listItems[i] !== "undefined") {
        item.push(listItems[i]);
      }
    }
    return item;
  }, [listItems]);
  const sliderItem3: ListInputItems = useMemo(() => {
    let item = [];
    for (let i = limit * 2; i < limit * 3; i++) {
      if (typeof listItems[i] !== "undefined") {
        item.push(listItems[i]);
      }
    }
    return item;
  }, [listItems]);

  const renderSliderItem = (item: ListInputItem) => {
    const avatarUrl =
      item?.photo.files.length > 0
        ? item.photo.files[0].url
        : "/assets/no-image.svg";
    const link = item.link !== "" ? item.link : "/";
    return (
      <li key={uuidv4()}>
        <div
          className={`flex items-center overflow-hidden justify-center hover:text-primary
           ${
             isDisplayBorder !== undefined && isDisplayBorder === 1
               ? "border rounded-lg"
               : ""
           }
        `}
        >
          <Link
            href={link}
            title={item.title}
            className={"flex flex-col items-center md:col-span-1"}
            style={{
              height: itemHeight !== "" ? `${itemHeight}px` : "100%",
            }}
          >
            <div className={"relative flex items-center my-1"}>
              <Image
                src={avatarUrl}
                alt={item.title}
                width={55}
                height={55}
                title={item.title}
                className="overflow-visible transition duration-300 ease-in-out hover:scale-110"
              />
            </div>
            <span className="p-0.5 text-center">{item.title}</span>
          </Link>
        </div>
      </li>
    );
  };

  return (
    <div>
      {isMobile ? (
        <div className="px-2 overflow-hidden">
          <Carousel
            autoPlay
            loop
            slides={{ perView: 1, spacing: 20 }}
            hideArrow
            hideDot
          >
            {sliderItem1.length > 0 ? (
              <CarouselItem key={uuidv4()} className="w-full">
                <ul role="list" className="grid grid-cols-4 gap-4">
                  {sliderItem1.map((item) => renderSliderItem(item))}
                </ul>
              </CarouselItem>
            ) : null}
            {sliderItem2.length > 0 ? (
              <CarouselItem key={uuidv4()} className="w-full">
                <ul role="list" className="grid grid-cols-4 gap-4">
                  {sliderItem2.map((item) => renderSliderItem(item))}
                </ul>
              </CarouselItem>
            ) : null}
            {sliderItem3.length > 0 ? (
              <CarouselItem key={uuidv4()} className="w-full">
                <ul role="list" className="grid grid-cols-4 gap-4">
                  {sliderItem3.map((item) => renderSliderItem(item))}
                </ul>
              </CarouselItem>
            ) : null}
          </Carousel>
        </div>
      ) : (
        <div className={`px-5 pb-2 overflow-hidden ${gridCols}`}>
          {listItems.map((item) => {
            const avatarUrl =
              item.photo.files.length > 0
                ? item.photo.files[0].url
                : "/assets/no-image.svg";
            const link = item.link !== "" ? item.link : "/";
            return (
              <div
                key={item.key}
                className={`flex mx-1 hover:text-primary ${
                  isDisplayBorder !== undefined && isDisplayBorder === 1
                    ? "border rounded-lg"
                    : ""
                }`}
              >
                <Link
                  href={link}
                  title={item.title}
                  className={"flex flex-col items-center md:col-span-1"}
                  style={{
                    height: itemHeight !== "" ? `${itemHeight}px` : "100%",
                    width: "100%",
                  }}
                >
                  <div className={"relative flex items-center my-1"}>
                    <Image
                      src={avatarUrl}
                      alt={item.title}
                      width={55}
                      height={55}
                      title={item.title}
                      className="overflow-visible transition duration-300 ease-in-out hover:scale-110"
                    />
                  </div>
                  <span className="p-0.5 text-sm text-center text-gray-900">
                    {item.title}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PageBlockTypeGridCol;
