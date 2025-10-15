"use client";

import ProductNextApi from "@/common/api/next/ProductNextApi";
import Product from "@/common/contants/Product";
import { ProductCardJson } from "@/common/types/ProductCard";
import Helper from "@/common/utils/helper";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { IconSearch } from "@tabler/icons-react";
import debounce from "lodash/debounce";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import ProductSearchResultItem from "./ProductSearchResultItem";

const ProductSearchBox = () => {
  const router = useRouter();
  const KEYWORD_MIN_LENGTH_TO_SEARCH = 3;

  const [keyword, setKeyword] = useState(" ");

  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [productCardItems, setProductCardItems] = useState<ProductCardJson[]>(
    []
  );

  const getSuggestion = useCallback(async (query: string) => {
    setLoading(true);
    if (query.length >= KEYWORD_MIN_LENGTH_TO_SEARCH) {
      const productCollection = await ProductNextApi.search(
        {
          page: 1,
          limit: 10,
          sorttype: "",
          sortby: "",
          keyword: query,
        },
        []
      );
      if (!productCollection.hasError()) {
        setTotal(productCollection.total);

        setProductCardItems(productCollection.items);
      }
    }
    setLoading(false);
  }, []);

  const getFooter = useCallback(() => {
    let coms: any[] = [];

    if (keyword.length >= KEYWORD_MIN_LENGTH_TO_SEARCH) {
      //check if loading
      if (loading) {
        coms.push(
          <AutocompleteItem key={"footer"} value={""} textValue={" "}>
            Đang tìm kiếm...
          </AutocompleteItem>
        );
      } else {
        coms.push(
          <AutocompleteItem
            key={"footer"}
            value={keyword}
            textValue={keyword}
            onClick={() => router.push(`/search?q=${keyword}&from=header`)}
            className="!bg-primary !text-white py-2 text-center hover:opacity-80"
          >
            Xem tất cả <span className="font-bold">{total}</span> kết quả
            &raquo;
          </AutocompleteItem>
        );
      }
    }

    return coms;
  }, [keyword, loading, total, router]);

  const debounceLoadData = useMemo(
    () => debounce(getSuggestion, 1000),
    [getSuggestion]
  );

  useEffect(() => {
    debounceLoadData(keyword);
  }, [debounceLoadData, keyword]);

  return (
    <Autocomplete
      value={keyword}
      onInputChange={(value) => setKeyword(value)}
      allowsCustomValue={true}
      placeholder="Bạn tìm kiếm gì..."
      startContent={
        <IconSearch
          size={24}
          className="text-gray-500 cursor-pointer mr-1.5 hover:text-primary"
          onClick={() => {}}
        />
      }
      endContent={
        <>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">|</span>
            <span
              className="text-sm p-2 font-normal text-blue-500 w-[74px] h-[36px] cursor-pointer hover:text-primary"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/search?q=${keyword}`);
              }}
            >
              Tìm kiếm
            </span>
          </div>
        </>
      }
      id="page-search-input"
      inputProps={{
        classNames: {
          input: "text-black",
          inputWrapper: "h-[40px]",
        },
      }}
      listboxProps={{}}
      classNames={{
        selectorButton: "hidden",
      }}
      selectorIcon={null}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          router.push(`/search?q=${keyword}`);
        }
      }}
      filterOptions={{}}
      isClearable={true}
      defaultItems={productCardItems}
      defaultFilter={() => true}
    >
      {[
        ...productCardItems.map((item) => (
          <AutocompleteItem key={item.id} value={item.id} textValue={item.name}>
            <ProductSearchResultItem data={item} />
          </AutocompleteItem>
        )),
        ...getFooter(),
      ]}
    </Autocomplete>
  );
};

export default ProductSearchBox;
