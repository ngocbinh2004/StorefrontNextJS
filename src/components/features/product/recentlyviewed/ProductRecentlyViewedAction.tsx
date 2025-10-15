"use client";

import ProductRecentlyViewedNextApi from "@/common/api/next/ProductRecentlyViewedNextApi";
import { useCallback, useEffect } from "react";
import _ from "lodash";

const ProductRecentlyViewedAction = ({ productId }: { productId: number }) => {
  const setNextCookies = useCallback(async (productIdList: string) => {
    await ProductRecentlyViewedNextApi.addData(productIdList);
  }, []);

  const getNextCookies = useCallback(async () => {
    let productIdList = "";
    const productRecentlyViewedIdList =
      await ProductRecentlyViewedNextApi.getItems();
    if (
      productRecentlyViewedIdList.idList !== "" &&
      typeof productRecentlyViewedIdList.idList !== "undefined"
    ) {
      let idList = productRecentlyViewedIdList.idList
        .split(".")
        .map((i: string) => +i);
      idList.push(productId);
      productIdList = _.union(idList).join(".");
    } else {
      // init productIdList
      productIdList = productId.toString();
    }

    if (productIdList !== "") {
      setNextCookies(productIdList);
    }
  }, [productId, setNextCookies]);

  useEffect(() => {
    if (productId > 0) {
      getNextCookies();
    }
  }, [productId, getNextCookies]);

  // using for debug
  return <span className="hidden">{productId}</span>;
};

export default ProductRecentlyViewedAction;
