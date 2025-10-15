import { ProductFilterGroupJson } from "@/common/types/ProductFilterGroup";
import React from "react";
import ProductFilterBox from "./ProductFilterBox";

const ProductFilterGroup = ({
  group,
  paginationUrl,
}: {
  group: ProductFilterGroupJson;
  paginationUrl: string;
}) => {
  if (group.filters.length === 0) {
    return null;
  }

  //parameterize later (for ONE or TWO column layout)
  const layoutClassname = "flex space-x-2";

  return (
    <div className="product-filter-group">
      <div className="product-filter-summary"></div>
      <div className={`product-filter-list ${layoutClassname}`}>
        {group.filters.map((i) => (
          <ProductFilterBox
            key={i.id}
            filter={i}
            paginationUrl={paginationUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductFilterGroup;
