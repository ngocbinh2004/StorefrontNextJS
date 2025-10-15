"use client";

import { Aggregation } from "@/common/types/Aggregation";
import UrlUtil from "@/common/utils/url";
import {
  IconCircle,
  IconCircleDotFilled,
  IconSquare,
  IconSquareCheckFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

const ProductListFilterBrand = ({
  agg,
  paginationUrl,
}: {
  agg: Aggregation;
  paginationUrl: string;
}) => {
  const searchParams = useSearchParams();
  const filterByBrand = searchParams.get("b") ?? "";

  const [buckets, setBuckets] = useState(agg.buckets);

  useEffect(() => {
    //update buckets
    if (filterByBrand.length == 0) {
      setBuckets(agg.buckets);
    }
  }, [agg.buckets, filterByBrand]);

  return (
    <div>
      <h2 className="mb-2 uppercase text-sm font-bold">
        Lọc theo <span className="font-bold">Thương hiệu</span>:
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
                    paramName: "b",
                    paramValue: item.id.toString(),
                    isMultiple: true,
                  })}
                  className="text-sm hover:text-primary"
                >
                  {filterByBrand.split(".").includes(item.id.toString()) ? (
                    <IconSquareCheckFilled
                      size={16}
                      strokeWidth={0.5}
                      className="inline-block mr-1 -mt-0.5"
                    />
                  ) : (
                    <IconSquare
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

export default ProductListFilterBrand;
