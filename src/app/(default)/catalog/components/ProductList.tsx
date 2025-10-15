import ProductApi from "@/common/api/server/ProductApi";
import { FilterProduct } from "@/common/types/Product";
import ProductListSort from "@/components/features/product/list/ProductListSort";
import ProductListWrapper from "@/components/features/product/list/ProductListWrapper";
import ProductListHeaderBar from "@/components/features/product/list/headerbar/ProductListHeaderBar";
import {
  PageContent,
  PageSizeWrapper,
} from "@/components/shared/layout/PageWrapper";

const ProductList = async ({
  filter,
  paginationUrl,
  heading,
}: {
  filter: FilterProduct;
  paginationUrl: string;
  heading: string;
}) => {
  const productCollection = await ProductApi.search({
    ...filter,
  });

  return (
    <>
      <PageSizeWrapper className="relative pt-[0.625rem]">
        <PageContent className="space-y-4">
          <div className="pt-4 space-y-4 bg-white rounded-md">
            <div className="flex items-start justify-between">
              <div className="w-2/3 overflow-x-scroll no-scrollbar">
                <ProductListHeaderBar
                  total={productCollection.total}
                  heading={heading}
                />
              </div>
              <div className="flex items-center justify-end w-2/3">
                <ProductListSort
                  paginationUrl={paginationUrl}
                  sortby={filter.sortby.toString()}
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
    </>
  );
};

export default ProductList;
