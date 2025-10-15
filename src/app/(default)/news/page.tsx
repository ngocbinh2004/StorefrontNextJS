import NewsApi from "@/common/api/server/NewsApi";
import NewsCategoryApi from "@/common/api/server/NewsCategoryApi";
import NewsCategoryModel from "@/common/models/NewsCategoryModel";
import { notFound } from "next/navigation";
import NewsCategoryHeadingTitle from "./NewsCategoryHeadingTitle";
import NewsCategorySidebar from "./NewsCategorySidebar";
import NewsFeaturedSidebar from "./NewsFeaturedSidebar";
import NewsList from "./NewsList";
import NewsPagination from "./NewsPagination";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const categorySlug = searchParams.categoryslug?.toString() || "";
  let category = NewsCategoryModel.getDefaultData();
  if (categorySlug.length > 0) {
    const foundCategory = await NewsCategoryApi.getDetailBySlug(categorySlug);
    if (foundCategory.id > 0) {
      category = foundCategory.toJson();
    } else {
      notFound();
    }
  }

  const canonicalStr =
    category.seo_canonical.length > 0
      ? category.seo_canonical
      : `/news/${category.seo_url}`;

  const graphFile =
    category.seo_graph_file.id > 0
      ? category.seo_graph_file
      : category.avatar_file_list[0];

  return {
    title: category.seo_title,
    description: category.seo_meta_description,
    alternates: {
      canonical: canonicalStr,
    },
    openGraph: graphFile
      ? {
          images: [
            {
              url: graphFile.url,
              width: graphFile.width,
              height: graphFile.height,
              alt: category.name,
            },
          ],
          title:
            category.seo_title.length > 0 ? category.seo_title : category.name,
          description: category.seo_meta_description,
        }
      : null,
  };
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Filtering
  const categorySlug = searchParams.categoryslug?.toString() || "";
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;

  let filterByCategoryId = 0;
  let category = NewsCategoryModel.getDefaultData();

  if (categorySlug.length > 0) {
    const foundCategory = await NewsCategoryApi.getDetailBySlug(categorySlug);
    if (foundCategory.id > 0) {
      filterByCategoryId = foundCategory.id;
      category = foundCategory.toJson();
    } else {
      notFound();
    }
  } else {
    filterByCategoryId = 0;
  }

  const newsCollection = await NewsApi.getItems({
    page: page,
    limit: 10,
    sortby: "id",
    sorttype: "DESC",
    category_id: filterByCategoryId,
  });

  return (
    <div className="container mt-5 space-y-5 antialiased max-md:mt-0">
      <section className="max-[767px]:py-[30px] my-12">
        <div className="flex flex-wrap justify-between items-center mx-auto min-[1600px]:max-w-[1600px] min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px] relative">
          <div className="flex flex-wrap w-full">
            <div className="min-[992px]:w-[66.66%] w-full px-[12px]">
              <NewsCategoryHeadingTitle title={category.name} />
              <NewsList collection={newsCollection.toJson()} />
              {newsCollection.total > 0 ? (
                <NewsPagination
                  current_page={newsCollection.currentpage}
                  total={newsCollection.total}
                />
              ) : (
                <p className="text-center italic">
                  {"Chưa có bài viết nào..."}
                </p>
              )}
            </div>
            <div className="min-[992px]:w-[33.33%] w-full max-[991px]:mt-[30px] px-[12px]">
              <div className="p-[30px] border-[1px] border-solid border-[#eee] rounded-[5px] flex flex-col gap-y-12">
                <NewsCategorySidebar />
                <NewsFeaturedSidebar />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
