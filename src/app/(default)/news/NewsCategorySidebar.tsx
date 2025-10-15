import React from "react";
import { IconChevronDown } from "@tabler/icons-react";
import NewsCategoryApi from "@/common/api/server/NewsCategoryApi";
import Link from "next/link";
import NewsCategoryModel from "@/common/models/NewsCategoryModel";

const NewsCategorySidebar = async () => {
  const categories = await NewsCategoryApi.getByParent(0);

  return (
    <div>
      <div className="border-b-[2px] border-solid border-[#eee] pb-[15px]">
        <h3 className="w-full flex justify-between relative leading-[1.2] mb-[6px] font-Poppins text-[18px] font-medium">
          {"Danh mục tin tức"}
          <div>
            <IconChevronDown size={16} />
          </div>
        </h3>
      </div>
      <div>
        <ul>
          {categories.toJson().items.map((item) => (
            <li key={item.id}>
              <div className="gi-sidebar-block-item py-[15px] border-b-[1px] border-solid border-[#eee] flex flex-row max-[1199px]:flex-col max-[991px]:flex-row relative">
                <Link
                  href={NewsCategoryModel.getMarkSlug(item.id, item.seo_url)}
                  className="w-full text-[#777] text-[14px] leading-[20px] font-normal capitalize cursor-pointer flex justify-between"
                >
                  {item.name}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewsCategorySidebar;
