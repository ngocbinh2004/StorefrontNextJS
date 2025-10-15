"use client";

import { Aggregation } from "@/common/types/Aggregation";
import UrlUtil from "@/common/utils/url";
import {
  IconCircle,
  IconCircleCheckFilled,
  IconCircleDotFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

const ProductListFilterCategory = ({
  agg,
  paginationUrl,
}: {
  agg: Aggregation;
  paginationUrl: string;
}) => {
  const searchParams = useSearchParams();
  const filterByCategory = searchParams.get("c") ?? "";

  const [buckets, setBuckets] = useState(agg.buckets);

  useEffect(() => {
    //update buckets
    if (filterByCategory.length == 0) {
      setBuckets(agg.buckets);
    }
  }, [agg.buckets, filterByCategory]);

  return (
    <div>
      <h2 className="mb-2 uppercase text-sm font-bold">
        Lọc theo <span className="font-bold">Danh mục</span>:
      </h2>
      <ul className={""}>
        {buckets
          .filter((item) => item.name.length > 0)
          .map((item, i) => {
            return (
              <li key={item.id}>
                <Link
                  href={UrlUtil.buildUrl({
                    paginationUrl,
                    paramName: "c",
                    paramValue: item.id.toString(),
                    isMultiple: false,
                  })}
                  className="text-sm hover:text-primary"
                >
                  {item.id.toString() == filterByCategory.toString() ? (
                    <IconCircleDotFilled
                      size={16}
                      strokeWidth={0.5}
                      className="inline-block mr-1 -mt-0.5"
                    />
                  ) : (
                    <IconCircle
                      size={16}
                      strokeWidth={0.5}
                      className="inline-block mr-1 -mt-0.5"
                    />
                  )}
                  {item.name}
                  <span className="text-xs text-gray-400 ml-2">
                    ({item.count})
                  </span>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ProductListFilterCategory;
