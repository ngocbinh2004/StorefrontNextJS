"use client";

import Product from "@/common/contants/Product";
import { SelectOption } from "@/common/types/SelectOption";
import UrlUtil from "@/common/utils/url";
import { IconSquare, IconSquareCheckFilled } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const ProductListFilterInstallment = ({
  paginationUrl,
}: {
  paginationUrl: string;
}) => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const filterByInstallment = searchParams.get("i") ?? "";

  const installmentList: SelectOption[] = [
    {
      value: Product.INSTALLMENT_ALLOW_ZERO_RATE,
      label: "Góp 0%",
    },
  ];

  // console.log("paginationUrl: ", paginationUrl);

  const setUrlByInstallment = useCallback(
    (value: string) => {
      // console.log("🚀 ------------------🚀");
      // console.log("🚀 ~ value:", value);
      // console.log("🚀 ------------------🚀");

      let url = paginationUrl;

      url = UrlUtil.buildUrl({
        paginationUrl: url,
        paramName: "i",
        paramValue: value,
        isMultiple: false,
      });

      //console.log("url: ", url);

      //redirect
      return router.push(url);
    },
    [paginationUrl, router],
  );

  return (
    <div style={{ marginTop: 10 }}>
      <ul>
        {installmentList.map((item) => {
          return (
            <li key={item.value}>
              <div
                onClick={() => setUrlByInstallment(item.value.toString())}
                className="text-sm hover:text-primary">
                {filterByInstallment.includes(item.value.toString()) ? (
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
                {item.label}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductListFilterInstallment;
