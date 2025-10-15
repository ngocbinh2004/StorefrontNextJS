"use client";

import ProductModel from "@/common/models/ProductModel";
import { PriceRangeOption } from "@/common/types/PriceRange";
import UrlUtil from "@/common/utils/url";
import { Button, Input, Slider, SliderValue } from "@nextui-org/react";
import {
  IconAdjustments,
  IconCaretDownFilled,
  IconCaretUpFilled,
} from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const ProductFilterTypePrice = ({
  paginationUrl,
}: {
  paginationUrl: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterByCustomRange = searchParams.get("cr") ?? "";
  const filterByPriceRange = searchParams.get("pr") ?? "";

  // used for price button select
  const [selectedOptions, setSelectedOptions] = useState<PriceRangeOption[]>(
    []
  );

  // used for price slider
  const minPrice = 0;
  const maxPrice = 50000000;
  const defaultStep = 100000;
  const [isCustomRange, setIsCustomRange] = useState(true);
  const [customRange, setCustomRange] = useState<number[]>();

  const priceRangeOptions: PriceRangeOption[] = useMemo(() => {
    return ProductModel.getPriceRangeOptions();
  }, []);

  const setUrlByPriceRange = useCallback(() => {
    let url = paginationUrl;
    if (
      isCustomRange &&
      Array.isArray(customRange) &&
      customRange.length === 2
    ) {
      //remove current 'pricerange - pr' param
      url = UrlUtil.buildUrl({
        paginationUrl: url,
        paramName: "pr",
        paramValue: null,
        isMultiple: false,
      });

      //set cr
      url = UrlUtil.buildUrl({
        paginationUrl: url,
        paramName: "cr",
        paramValue: `${customRange[0]}-${customRange[1]}`,
        isMultiple: false,
      });
    } else if (selectedOptions.length > 0) {
      //remove current 'customrange - cr' param
      url = UrlUtil.buildUrl({
        paginationUrl: url,
        paramName: "cr",
        paramValue: null,
        isMultiple: false,
      });

      //set pr
      url = UrlUtil.buildUrl({
        paginationUrl: url,
        paramName: "pr",
        paramValue: `${selectedOptions.map((i) => i.id).join(".")}`,
        isMultiple: false,
      });
    }

    //redirect
    return router.push(url);
  }, [paginationUrl, router, customRange, selectedOptions, isCustomRange]);

  const resetFilterPrice = useCallback(() => {
    setSelectedOptions([]);
    setIsCustomRange(false);
    setCustomRange(undefined);

    let url = paginationUrl;

    //remove current 'customrange - cr' param
    url = UrlUtil.buildUrl({
      paginationUrl: url,
      paramName: "cr",
      paramValue: null,
      isMultiple: false,
    });

    //remove current 'pricerange - pr' param
    url = UrlUtil.buildUrl({
      paginationUrl: url,
      paramName: "pr",
      paramValue: null,
      isMultiple: false,
    });

    //redirect
    router.push(url);
  }, [paginationUrl, router]);

  const handleSelectedOption = useCallback(
    (id: number) => {
      //clear current slider value
      setIsCustomRange(false);
      setCustomRange(undefined);

      //check if option already existed
      const foundSelectedIndex = selectedOptions.findIndex((i) => i.id === id);
      if (foundSelectedIndex >= 0) {
        setSelectedOptions(selectedOptions.filter((i) => i.id !== id));
      } else {
        const newItem = priceRangeOptions.find((i) => i.id === id);
        if (typeof newItem !== "undefined") {
          setSelectedOptions([...selectedOptions, newItem]);
        }
      }
    },
    [priceRangeOptions, selectedOptions]
  );

  const handleChangeSlider = useCallback((sliderValue: SliderValue) => {
    if (Array.isArray(sliderValue)) {
      setCustomRange([sliderValue[0], sliderValue[1]]);
    }
  }, []);

  useEffect(() => {
    if (filterByCustomRange !== "") {
      const parts = filterByCustomRange.split("-").map((i) => +i);
      setCustomRange(parts);
      setIsCustomRange(true);

      //clear selected pricerange
      setSelectedOptions([]);
    }
  }, [filterByCustomRange]);

  useEffect(() => {
    if (filterByPriceRange !== "") {
      const priceRangeIdList = filterByPriceRange.split(".").map((i) => +i);
      setSelectedOptions(
        priceRangeOptions.filter((i) => priceRangeIdList.includes(i.id))
      );

      //clear selected customrange
      setCustomRange(undefined);
      setIsCustomRange(false);
    }
  }, [filterByPriceRange, priceRangeOptions]);

  return (
    <div>
      <div className="flex items-center gap-1 mb-2 no-scrollbar max-md:justify-start max-md:overflow-x-scroll md:flex-wrap">
        {priceRangeOptions.map((option, key) => {
          return (
            <div
              key={key}
              onClick={() => handleSelectedOption(option.id)}
              title={option.text}
              className={`bg-white flex items-center cursor-pointer justify-center py-1 px-2 border border-gray-300 rounded md:overflow-hidden hover:text-red-500 hover:border-gray-800 ${
                selectedOptions.findIndex((i) => i.id === option.id) >= 0
                  ? "text-white !bg-gray-500 hover:text-white"
                  : ""
              }`}
            >
              <p className="text-sm whitespace-nowrap">{option.text}</p>
            </div>
          );
        })}
      </div>

      <div>
        <div
          className="text-xs cursor-pointer text-primary-500"
          onClick={() => {
            setIsCustomRange(!isCustomRange);
            setSelectedOptions([]);
          }}
        >
          <IconAdjustments size={18} className="-mt-0.5 mr-0.5 inline-block" />{" "}
          Hoặc chọn mức giá phù hợp với bạn{" "}
          {isCustomRange ? (
            <IconCaretUpFilled size={12} className="inline-block" />
          ) : (
            <IconCaretDownFilled size={12} className="inline-block" />
          )}
        </div>

        {isCustomRange ? (
          <div className="mt-4">
            <div
              className="flex w-full gap-4 mb-4"
              style={{ maxWidth: "400px" }}
            >
              <div className="flex-col w-1/2">
                <Input
                  labelPlacement="outside"
                  step={defaultStep}
                  onChange={(e) => {
                    if (typeof customRange !== "undefined") {
                      setCustomRange([+e.target.value * 1000, customRange[1]]);
                    } else {
                      setCustomRange([+e.target.value * 1000, maxPrice]);
                    }
                  }}
                  size="sm"
                  variant="bordered"
                  value={
                    typeof customRange !== "undefined"
                      ? (customRange[0] / 1000).toString()
                      : (minPrice / 1000).toString()
                  }
                  startContent={
                    <span className="text-xs text-gray-400">Từ</span>
                  }
                  endContent={
                    <div className=" text-sm bg-gray-200 px-1 py-1 -mr-1.5">
                      ,000&nbsp;₫
                    </div>
                  }
                  classNames={{ input: "text-right" }}
                />
              </div>
              <div className="flex-col w-1/2">
                <Input
                  labelPlacement="outside"
                  step={defaultStep}
                  onChange={(e) => {
                    if (typeof customRange !== "undefined") {
                      setCustomRange([customRange[0], +e.target.value * 1000]);
                    } else {
                      setCustomRange([minPrice, +e.target.value * 1000]);
                    }
                  }}
                  size="sm"
                  variant="bordered"
                  value={
                    typeof customRange !== "undefined"
                      ? (customRange[1] / 1000).toString()
                      : (maxPrice / 1000).toString()
                  }
                  startContent={
                    <span className="text-xs text-gray-400">Đến</span>
                  }
                  endContent={
                    <div className=" text-sm bg-gray-200 px-1 py-1 -mr-1.5">
                      ,000&nbsp;₫
                    </div>
                  }
                  classNames={{ input: "text-right" }}
                />
              </div>
            </div>
            <Slider
              size="sm"
              step={defaultStep}
              minValue={minPrice}
              maxValue={maxPrice}
              value={
                typeof customRange !== "undefined"
                  ? customRange
                  : [minPrice, maxPrice]
              }
              onChange={handleChangeSlider}
              className="max-w-md"
            />
          </div>
        ) : null}
      </div>

      {selectedOptions.length > 0 || Array.isArray(customRange) ? (
        <div className="space-x-2">
          <Button className="mt-4" onClick={() => resetFilterPrice()}>
            Bỏ lọc giá
          </Button>
          <Button
            className="mt-4"
            color="primary"
            onClick={() => setUrlByPriceRange()}
          >
            Lọc theo giá
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default ProductFilterTypePrice;
