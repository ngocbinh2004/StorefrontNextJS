"use client";

import { PaginationParams } from "@/common/types/Page";
import { Button } from "@nextui-org/react";
import { IconSearch } from "@tabler/icons-react";
import React from "react";

const ProductListPagination = ({
  total,
  limit,
  currentpage,
  loading,
  doLoadMore,
}: PaginationParams & {
  loading: boolean;
  doLoadMore: (v: number) => void;
}) => {
  const remainCount = total - currentpage * limit;

  return (
    <div>
      <div className="flex items-center justify-center py-2 px-10">
        {remainCount > 0 ? (
          <Button
            isLoading={loading}
            disabled={loading}
            color="primary"
            variant="flat"
            radius="none"
            onClick={() => {
              doLoadMore(currentpage + 1);
            }}
          >
            <IconSearch size={18} /> Xem thêm {remainCount} sản phẩm
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default ProductListPagination;
