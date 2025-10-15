import ProductFilterGroupApi from "@/common/api/server/ProductFilterGroupApi";
import React from "react";
import ProductFilterGroup from "./ProductFilterGroup";

const ProductFilterWrapper = async ({
  category_id,
  paginationUrl,
}: {
  category_id: number;
  paginationUrl: string;
}) => {
  const filterGroups = await ProductFilterGroupApi.getItemsByCategoryId(
    category_id
  );

  return (
    <div className="product-filter-group-wrapper">
      <div className="product-filter-group-list">
        {filterGroups.items.map((i) => (
          <ProductFilterGroup
            key={i.id}
            group={i.toJson()}
            paginationUrl={paginationUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductFilterWrapper;
