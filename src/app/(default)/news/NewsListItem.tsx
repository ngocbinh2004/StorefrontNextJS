import { NewsJson } from "@/common/types/News";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import NewsModel from "@/common/models/NewsModel";
import TextDateTime from "@/components/common/TextDateTime";

const NewsListItem = ({ item }: { item: NewsJson }) => {
  return (
    <>
      <article
        key={item.id}
        className="relative flex flex-col gap-8 lg:flex-row border-b mb-6 pb-6"
      >
        <div className="relative lg:w-52 lg:shrink-0">
          <Image
            alt={item.title}
            src={item.avatar_file_list[0].url}
            width={200}
            height={180}
            style={{ maxHeight: "200px" }}
            className="absolute inset-0 h-full w-full rounded-md bg-gray-50 object-cover"
          />
        </div>
        <div>
          <div className="group relative max-w-xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 mb-1">
              <Link
                href={NewsModel.getMarkSlug(
                  item.id,
                  item.seo_url,
                  item.category_slug
                )}
                className="hover:text-blue-600"
              >
                <span className="absolute inset-0" />
                {item.title}
              </Link>
            </h3>
            <div className="text-xs text-gray-400">
              Cập nhật ngày <TextDateTime ts={item.date_created} />
            </div>
            <div
              className="mt-5 text-sm leading-6 text-gray-600"
              dangerouslySetInnerHTML={{ __html: item.short_description }}
            ></div>
          </div>
        </div>
      </article>
    </>
  );
};

export default NewsListItem;
