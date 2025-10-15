import ProductCategory from "@/common/contants/ProductCategory";
import { ProductCategoryJson } from "@/common/types/ProductCategory";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

const ProductCategoryListHeaderBar = ({
  allCategoryItems,
  type,
  parentId,
  categoryId,
}: {
  allCategoryItems: ProductCategoryJson[];
  type: number;
  parentId?: number;
  categoryId?: number;
}) => {
  const renderImage = useMemo(() => {
    return (
      <div className="grid items-center w-full grid-flow-row-dense grid-cols-8 no-scrollbar max-md:mb-2 max-md:flex max-md:items-center max-md:justify-start max-md:overflow-x-scroll md:flex-wrap md:pb-2">
        {allCategoryItems.map((item) => {
          const avatarUrl =
            item.avatar_file_list.length > 0
              ? item.avatar_file_list[0].url
              : "/assets/no-image.svg";

          return (
            <Link
              key={item.id}
              href={`/${item.seo_url}`}
              style={{ minWidth: "auto" }}
              className={`flex items-center justify-center py-1 mb-2 mr-2 overflow-hidden border rounded-full ${
                categoryId === item.id ? "border-red-400" : "border-gray-400"
              }`}
            >
              <Image
                className="w-full h-full md:mx-2 md:px-2"
                width={0}
                height={0}
                src={avatarUrl}
                title={item.name}
                sizes="100vw"
                alt={item.name_short !== "" ? item.name_short : item.name}
              />
            </Link>
          );
        })}
      </div>
    );
  }, [allCategoryItems, categoryId]);

  const renderNameShort = useMemo(() => {
    return (
      <div
        className="flex items-center gap-2 no-scrollbar max-md:justify-start max-md:overflow-x-scroll md:flex-wrap"
        style={{ marginTop: 0 }}
      >
        {allCategoryItems.map((item) => {
          return (
            <Link
              key={item.id}
              href={`/${item.seo_url}`}
              title={item.name_short !== "" ? item.name_short : item.name}
              className={`flex items-center justify-center p-2 my-1 border rounded-lg max-md:border-border md:overflow-hidden hover:text-red-500 hover:border-red-500 ${
                categoryId === item.id
                  ? "text-white !bg-primary hover:text-white"
                  : ""
              }`}
            >
              <p className="text-sm whitespace-nowrap">
                {item.name_short !== "" ? item.name_short : item.name}
              </p>
            </Link>
          );
        })}
      </div>
    );
  }, [allCategoryItems, categoryId]);

  return type === ProductCategory.TYPE_IMAGE
    ? renderImage
    : type === ProductCategory.TYPE_NAME
    ? renderNameShort
    : null;
};

export default ProductCategoryListHeaderBar;
