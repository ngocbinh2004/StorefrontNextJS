"use client";

import FileModel from "@/common/models/FileModel";
import {
  ProductFilterJson,
  ProductFilterOption,
  ProductFilterOptionValue,
} from "@/common/types/ProductFilter";
import UrlUtil from "@/common/utils/url";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const ProductFilterTypeBrand = ({
  filter,
  paginationUrl,
}: {
  filter: ProductFilterJson;
  paginationUrl: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterByBrand = searchParams.get("b") ?? "";

  // used for price button select
  const [selectedOptions, setSelectedOptions] = useState<ProductFilterOption[]>(
    []
  );

  const setUrlByBrand = useCallback(() => {
    let url = paginationUrl;
    if (selectedOptions.length > 0) {
      //set b
      url = UrlUtil.buildUrl({
        paginationUrl: url,
        paramName: "b",
        paramValue: `${selectedOptions.map((i) => i.value).join(".")}`,
        isMultiple: false,
      });
    }

    //redirect
    return router.push(url);
  }, [paginationUrl, router, selectedOptions]);

  const resetFilterBrand = useCallback(() => {
    setSelectedOptions([]);

    let url = paginationUrl;

    //remove current 'pricerange - pr' param
    url = UrlUtil.buildUrl({
      paginationUrl: url,
      paramName: "b",
      paramValue: null,
      isMultiple: false,
    });

    //redirect
    router.push(url);
  }, [paginationUrl, router]);

  const handleSelectedOption = useCallback(
    (value: ProductFilterOptionValue) => {
      //check if option already existed
      const foundSelectedIndex = selectedOptions.findIndex(
        (i) => i.value === value
      );
      if (foundSelectedIndex >= 0) {
        setSelectedOptions(selectedOptions.filter((i) => i.value !== value));
      } else {
        const newItem = filter.options.find((i) => i.value === value);
        if (typeof newItem !== "undefined") {
          setSelectedOptions([...selectedOptions, newItem]);
        }
      }
    },
    [filter.options, selectedOptions]
  );

  useEffect(() => {
    if (filterByBrand !== "") {
      const brandIdList = filterByBrand.split(".").map((i) => +i);
      setSelectedOptions(
        filter.options.filter((i) => brandIdList.includes(+i.value))
      );
    }
  }, [filterByBrand, filter.options]);

  return (
    <div>
      <div className="flex items-center gap-1 mb-2 no-scrollbar max-md:justify-start max-md:overflow-x-scroll md:flex-wrap">
        {filter.options.map((option) => {
          return (
            <div
              key={option.value}
              onClick={() => handleSelectedOption(option.value)}
              title={option.label}
              className={`flex items-center cursor-pointer justify-center py-1 px-2 border border-gray-200 rounded md:overflow-hidden hover:text-red-500 hover:border-gray-800 ${
                selectedOptions.findIndex((i) => i.value === option.value) >= 0
                  ? " border-blue-600"
                  : ""
              }`}
            >
              <p className="text-sm whitespace-nowrap">
                <Image
                  src={FileModel.getThumbnailFromUrl(
                    option.image_url,
                    100,
                    40,
                    "resize"
                  )}
                  alt={option.label}
                  width={100}
                  height={40}
                />
              </p>
            </div>
          );
        })}
      </div>

      {selectedOptions.length > 0 ? (
        <div className="space-x-2">
          <Button className="mt-4" onClick={() => resetFilterBrand()}>
            Bỏ lọc
          </Button>
          <Button
            className="mt-4"
            color="primary"
            onClick={() => setUrlByBrand()}
          >
            Tìm kiếm
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default ProductFilterTypeBrand;
