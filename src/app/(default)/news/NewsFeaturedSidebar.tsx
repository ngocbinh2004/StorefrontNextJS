import NewsApi from "@/common/api/server/NewsApi";
import NewsModel from "@/common/models/NewsModel";
import TextDateTime from "@/components/common/TextDateTime";
import { IconChevronDown } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NewsFeaturedSidebar = async () => {
  const newsCollection = await NewsApi.getItems({
    page: 1,
    limit: 5,
    sortby: "id",
    sorttype: "DESC",
    category_id: 0,
  });

  return (
    <div>
      <div className="border-b-[2px] border-solid border-[#eee] pb-[15px] mb-5">
        <h3 className="w-full flex justify-between relative leading-[1.2] mb-[6px] font-Poppins text-[18px] font-medium">
          {"Tin mới nhất"}
          <div>
            <IconChevronDown size={16} />
          </div>
        </h3>
      </div>
      <div>
        {newsCollection.toJson().items.map((item) => (
          <div key={item.id} className="flex flex-row border-b-small mb-4 pb-4">
            <div className="relative w-28 shrink-0">
              <Image
                alt={item.title}
                src={item.avatar_file_list[0].url}
                width={200}
                height={150}
                style={{ maxHeight: "150px" }}
                className="absolute inset-0 h-full w-full rounded-md bg-gray-50 object-cover"
              />
            </div>
            <div className="px-4">
              <h5 className="leading-[1.2] mb-[6px]">
                <Link
                  href={NewsModel.getMarkSlug(
                    item.id,
                    item.seo_url,
                    item.category_slug
                  )}
                  className="text-[#777] text-[16px] tracking-[0] leading-[22px] font-semibold capitalize"
                >
                  {item.title}
                </Link>
              </h5>
              <div className=" mb-[10px] text-[14px] text-[#999] leading-[1] tracking-[0]">
                <div className="text-xs text-gray-400">
                  {"Cập nhật ngày: "} <TextDateTime ts={item.date_created} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeaturedSidebar;
