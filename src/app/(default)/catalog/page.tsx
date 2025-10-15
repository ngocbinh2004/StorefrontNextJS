import ProductCategoryApi from "@/common/api/server/ProductCategoryApi";
import RedirectLinkApi from "@/common/api/server/RedirectLinkApi";
import ProductCategoryModel from "@/common/models/ProductCategoryModel";
import ProductModel from "@/common/models/ProductModel";
import { BreadcrumbItem } from "@/common/types/Breadcrumb";
import { FilterProduct } from "@/common/types/Product";
import Helper from "@/common/utils/helper";
import UrlUtil from "@/common/utils/url";
import CategoryContent from "@/components/features/category/CategoryContent";
import ProductFilterWrapper from "@/components/features/productfilter/ProductFilterWrapper";
import Breadcrumb from "@/components/shared/displaydata/Breadcrumb";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import ProductList from "./components/ProductList";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const categorySlug = searchParams.categoryslug?.toString() || "";
  let category = ProductCategoryModel.getDefaultData();
  if (categorySlug.length > 0) {
    const foundCategory = await ProductCategoryApi.getDetailBySlug(
      categorySlug
    );
    if (foundCategory.id > 0) {
      category = foundCategory.toJson();
    }
  }

  const canonicalStr =
    category.seo_canonical.length > 0
      ? category.seo_canonical
      : `${category.seo_url}`;

  const graphFile =
    category.seo_graph_file.id > 0
      ? category.seo_graph_file
      : category.avatar_file_list[0];

  return {
    title:
      category.seo_title.length > 0 ? category.seo_title : category.name_short,
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
              alt: category.name_short,
            },
          ],
          title:
            category.seo_title.length > 0 ? category.seo_title : category.name,
          description: category.seo_meta_description,
        }
      : null,
  };
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  //Sorting
  const sortby = searchParams.s?.toString() || "";

  // Filtering
  const categorySlug = searchParams.categoryslug?.toString() || "";
  const filterByBrand = searchParams.b?.toString() || "";
  const filterByPriceRange = searchParams.pr?.toString() || "";
  const filterByCustomRange = searchParams.cr?.toString() || "";

  //check category
  let filterByCategoryId = 0;
  let category = ProductCategoryModel.getDefaultData();
  if (categorySlug.length > 0) {
    const foundCategory = await ProductCategoryApi.getDetailBySlug(
      categorySlug
    );
    if (
      foundCategory.id > 0 ||
      !Helper.compareStrings(categorySlug, foundCategory.seo_url)
    ) {
      category = foundCategory.toJson();
      filterByCategoryId = foundCategory.id;
    } else {
      //find from redirectlink repository
      const getRedirecLink = await RedirectLinkApi.getDetailBySourceUrl(
        `${categorySlug}`
      );
      if (!getRedirecLink.hasError()) {
        redirect(getRedirecLink.redirect_url);
      } else {
        notFound();
      }
    }
  }

  // Fetching
  const filter: FilterProduct = {
    page: 1,
    limit: 20,
    sortby: sortby,
    sorttype: "",
    category_id: filterByCategoryId,
    price: ProductModel.buildPriceQueryString(
      filterByPriceRange,
      filterByCustomRange
    ),
    brand: filterByBrand,
  };

  const getDataByChild = async (id: number) => {
    return await ProductCategoryApi.getDataByChild(id);
  };

  // get category list by child to set currentParentId,currentCategoryLevel1,currentCategoryLevel2
  const getCategoryList = await getDataByChild(category.id);

  let paginationUrl = `/${category.seo_url}?`;

  if (filterByBrand !== "") {
    paginationUrl = UrlUtil.buildUrl({
      paginationUrl,
      paramName: "b",
      paramValue: filterByBrand,
      isMultiple: false,
    });
  }

  if (filterByPriceRange !== "") {
    paginationUrl = UrlUtil.buildUrl({
      paginationUrl,
      paramName: "pr",
      paramValue: filterByPriceRange,
      isMultiple: false,
    });
  }

  if (filterByCustomRange !== "") {
    paginationUrl = UrlUtil.buildUrl({
      paginationUrl,
      paramName: "cr",
      paramValue: filterByCustomRange,
      isMultiple: false,
    });
  }

  // get all product category
  const nav: BreadcrumbItem[] = [
    ...(category.id > 0
      ? getCategoryList.items.map((i) => {
          return {
            label: i.name,
            href: `/${i.seo_url}`,
          };
        })
      : []),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      ...nav.map((item, idx) => ({
        "@type": "ListItem",
        position: ++idx,
        name: item.label,
        item: item.href,
      })),
    ],
  };

  return (
    <div className="bg-white -mb-8 pb-8">
      <Breadcrumb data={nav} />
      <div className="container mt-5 space-y-5 antialiased max-md:mt-0">
        <ProductFilterWrapper
          category_id={category.id}
          paginationUrl={paginationUrl}
        />

        <Suspense fallback={<div className="mt-4">Đang tải trang...</div>}>
          <ProductList
            heading={category.name}
            filter={filter}
            paginationUrl={paginationUrl}
          />
        </Suspense>

        {category.description.length > 0 ? (
          <CategoryContent content={category.description} />
        ) : null}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
