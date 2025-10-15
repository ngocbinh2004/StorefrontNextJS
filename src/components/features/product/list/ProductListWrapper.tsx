"use client";

import ProductNextApi from "@/common/api/next/ProductNextApi";
import { FilterProduct } from "@/common/types/Product";
import {
  ProductCardCollectionJson,
  ProductCardJson,
} from "@/common/types/ProductCard";
import { useCallback, useEffect, useState } from "react";
import ProductList from "./ProductList";
import ProductListPagination from "./ProductListPagination";

const ProductListWrapper = ({
  collection,
  filter,
}: {
  collection: ProductCardCollectionJson;
  filter: FilterProduct;
}) => {
  const [currentCollection, setCurrentCollection] =
    useState<ProductCardCollectionJson>(collection);
  const [items, setItems] = useState<ProductCardJson[]>(collection.items);
  const [nextPage, setNextPage] = useState<number>(+filter.page + 1);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const doLoadMore = useCallback(async () => {
    setLoading(true);
    setErrors([]);

    const newCollection = await ProductNextApi.search(
      {
        ...filter,
        page: nextPage,
      },
      []
    );
    setLoading(false);

    if (newCollection.hasError()) {
      setErrors(newCollection.error.errors);
    } else {
      //detect load page 1, replaace current data
      let newItems = newCollection.items.map((i) => i.toJson());
      if (nextPage === 1) {
        setItems(newItems);
      } else {
        //append new items
        setItems([...items, ...newItems]);
      }

      setCurrentCollection(newCollection.toJson());
      setNextPage(nextPage + 1);
    }
  }, [filter, items, nextPage]);

  useEffect(() => {
    setCurrentCollection(collection);
    setItems(collection.items);
    setNextPage(2);
  }, [collection]);

  return (
    <>
      {loading && currentCollection.total === 0 ? (
        <div>Đang tìm kiếm...</div>
      ) : (
        <>
          {items.length > 0 && !loading ? <ProductList items={items} /> : null}
        </>
      )}
      <ProductListPagination
        total={currentCollection.total}
        limit={currentCollection.limit}
        currentpage={currentCollection.currentpage}
        doLoadMore={doLoadMore}
        loading={loading}
      />
    </>
  );
};

export default ProductListWrapper;
