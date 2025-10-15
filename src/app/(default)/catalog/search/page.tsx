import CustomerSessionApi from "@/common/api/server/CustomerSessionApi";
import ProductApi from "@/common/api/server/ProductApi";
import ProductModel from "@/common/models/ProductModel";
import { BreadcrumbItem } from "@/common/types/Breadcrumb";
import { FilterProduct } from "@/common/types/Product";
import UrlUtil from "@/common/utils/url";
import ProductListSort from "@/components/features/product/list/ProductListSort";
import ProductListWrapper from "@/components/features/product/list/ProductListWrapper";
import ProductListFilter from "@/components/features/product/list/filter/ProductListFilter";
import ProductListHeaderBar from "@/components/features/product/list/headerbar/ProductListHeaderBar";
import Breadcrumb from "@/components/shared/displaydata/Breadcrumb";
import {
  PageContent,
  PageSidebar,
  PageSizeWrapper,
} from "@/components/shared/layout/PageWrapper";

export default async function CatalogSearch({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  //Sorting
  const sortby = searchParams.s?.toString() || "";

  // Filtering
  const filterByKeyword = searchParams.q?.toString() || "";
  const filterByBrand = searchParams.b?.toString() || "";
  const filterByCategory = searchParams.c?.toString() || "";
  const filterByPriceRange = searchParams.pr?.toString() || "";
  const filterByCustomRange = searchParams.cr?.toString() || "";

  // Fetching
  const filter: FilterProduct = {
    page: 1,
    limit: 20,
    sortby: sortby,
    sorttype: "",
    keyword: filterByKeyword,
    category_id: filterByCategory.length > 0 ? +filterByCategory : 0,
    brand: filterByBrand,
    price: ProductModel.buildPriceQueryString(
      filterByPriceRange,
      filterByCustomRange
    ),
  };

  //assign aggs only in this page
  const productCollection = await ProductApi.search({
    ...filter,
    aggs: "agg_category:10,agg_brand:10,agg_string_facet:10",
  });

  const loggedUser = await CustomerSessionApi.getCurrentLoggedUserDetail();

  let paginationUrl = `/search?q=${filterByKeyword}`;
  if (filterByBrand !== "") {
    paginationUrl = UrlUtil.buildUrl({
      paginationUrl,
      paramName: "b",
      paramValue: filterByBrand,
      isMultiple: true,
    });
  }
  if (filterByCategory !== "") {
    paginationUrl = UrlUtil.buildUrl({
      paginationUrl,
      paramName: "c",
      paramValue: filterByCategory,
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

  //build the breadcrumb
  const nav: BreadcrumbItem[] = [
    {
      label: `Tìm kiếm theo từ "${filterByKeyword}"`,
      href: `/search?q=${filterByKeyword}`,
    },
  ];

  return (
    <div className="bg-white -mb-8 pb-8">
      <Breadcrumb data={nav} />
      <div className="container mt-5 space-y-5 antialiased max-md:mt-0">
        <PageSizeWrapper className="relative pt-[0.625rem]">
          <PageSidebar className="max-xl:hidden shrink-0">
            <ProductListFilter
              aggs={productCollection.aggs?.filter(
                (i) => i.type !== "agg_string_facet"
              )}
              paginationUrl={paginationUrl}
            />
          </PageSidebar>
          <PageContent className="space-y-4">
            <div className="pt-4 space-y-4 bg-white rounded-md">
              <div className="flex items-start justify-between">
                <div className="w-2/3 overflow-x-scroll no-scrollbar">
                  <ProductListHeaderBar
                    total={productCollection.total}
                    heading={
                      <>
                        Kết quả tìm kiếm
                        <span className="italic">{` "${filterByKeyword}"`}</span>
                      </>
                    }
                  />
                </div>
                <div className="flex items-center justify-end w-2/3">
                  <ProductListSort
                    paginationUrl={paginationUrl}
                    sortby={sortby}
                  />
                </div>
              </div>
            </div>

            <ProductListWrapper
              collection={productCollection.toJson()}
              filter={filter}
            />
          </PageContent>
        </PageSizeWrapper>
      </div>
    </div>
  );
}
