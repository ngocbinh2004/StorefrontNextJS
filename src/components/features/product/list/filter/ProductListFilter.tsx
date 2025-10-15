import { Aggregation } from "@/common/types/Aggregation";
import { useCallback, useMemo } from "react";
import ProductListFilterBrand from "./ProductListFilterBrand";
import ProductListFilterCategory from "./ProductListFilterCategory";
import ProductListFilterPriceRange from "./ProductListFilterPriceRange";

export default function ProductListFilter({
  aggs,
  paginationUrl,
}: {
  aggs?: Aggregation[];
  paginationUrl: string;
}) {
  const getFilterComponent = useCallback(
    (agg: Aggregation) => {
      let com = null;

      switch (agg.type) {
        case "agg_category":
          com = (
            <ProductListFilterCategory
              agg={agg}
              paginationUrl={paginationUrl}
            />
          );
          break;
        case "agg_brand":
          com = (
            <ProductListFilterBrand agg={agg} paginationUrl={paginationUrl} />
          );
          break;
        default:
        //default filter here
      }
      return com;
    },
    [paginationUrl]
  );

  const hasAggs = useMemo(() => {
    return !Array.isArray(aggs) || aggs.length > 0;
  }, [aggs]);

  return (
    <>
      {hasAggs && aggs !== undefined
        ? aggs.map((agg) => {
            return <div key={agg.name}>{getFilterComponent(agg)}</div>;
          })
        : null}
    </>
  );
}
