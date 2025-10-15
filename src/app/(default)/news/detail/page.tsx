import NewsApi from "@/common/api/server/NewsApi";
import { NewsJson } from "@/common/types/News";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsCategorySidebar from "../NewsCategorySidebar";
import NewsFeaturedSidebar from "../NewsFeaturedSidebar";
import NewsModel from "@/common/models/NewsModel";
import Image from "next/image";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const slug = searchParams.newsslug?.toString() || "";
  let news = NewsModel.getDefaultData();
  if (slug.length > 0) {
    const foundNews = await NewsApi.getDetailBySlug(slug);
    if (foundNews.id > 0) {
      news = foundNews.toJson();
    } else {
      notFound();
    }
  }

  const canonicalStr =
    news.seo_canonical.length > 0
      ? news.seo_canonical
      : NewsModel.getMarkSlug(news.id, news.seo_url, news.category_slug);

  const graphFile =
    news.seo_graph_file.id > 0 ? news.seo_graph_file : news.avatar_file_list[0];

  return {
    title: news.seo_title,
    description: news.seo_meta_description,
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
              alt: news.title,
            },
          ],
          title: news.seo_title.length > 0 ? news.seo_title : news.title,
          description: news.seo_meta_description,
        }
      : null,
  };
}
const NewsDetailPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const slug = searchParams.newsslug?.toString() || "";
  const detail = await NewsApi.getDetailBySlug(slug);

  if (detail.id === 0) {
    notFound();
  }

  let myNews: NewsJson = detail.toJson();

  return (
    <div className="container mt-5 space-y-5 antialiased max-md:mt-0">
      <section className="max-[767px]:py-[30px] my-12">
        <div className="flex flex-wrap justify-between items-center mx-auto min-[1600px]:max-w-[1600px] min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px] relative">
          <div className="flex flex-wrap w-full">
            <div className="min-[992px]:w-[66.66%] w-full px-[12px]">
              <Image
                alt={myNews.title}
                src={myNews.avatar_file_list[0].url}
                sizes="100vw"
                width={1000}
                height={1000}
                className="object-cover mb-8"
              />
              <h1 className=" font-bold text-xl">{myNews.title}</h1>
              <div
                className="mt-3 text-sm leading-6 text-gray-600"
                dangerouslySetInnerHTML={{ __html: myNews.content }}
              ></div>
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
};

export default NewsDetailPage;
