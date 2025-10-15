"use client";

import ProductNextApi from "@/common/api/next/ProductNextApi";
import CustomerWishlistNextApi from "@/common/api/next/CustomerWishlistNextApi";
import { ProductCardJson } from "@/common/types/ProductCard";
import { CustomerJson } from "@/common/types/Customer";
import { CustomerWishlistJson } from "@/common/types/CustomerWishlist";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import WishlistList from "../../wishlist/WishlistList";
import LayoutSpinner from "@/components/shared/layout/spinner/Spinner";

const AccountTabWishList = ({ loggedUser }: { loggedUser: CustomerJson }) => {
  const [processing, setProcessing] = useState(false);
  const [items, setItems] = useState<CustomerWishlistJson[]>([]);
  const [productCardItems, setProductCardItems] = useState<ProductCardJson[]>(
    []
  );

  const fetchProductCard = useCallback(async (productIds: number[]) => {
    const collection = await ProductNextApi.getByIdList(
      _.union(productIds).join(",")
    );
    if (!collection.hasError()) {
      setProductCardItems(collection.items);
    }
  }, []);

  const fetCustomerWishlist = useCallback(async () => {
    setProcessing(true);
    const collection = await CustomerWishlistNextApi.getItems({
      page: 1,
      limit: 100,
      sortby: "id",
      sorttype: "DESC",
    });
    if (!collection.hasError()) {
      setItems(collection.items);

      let productIds: number[] = [];
      productIds = collection.items.map((i) => i.product_id);
      if (productIds.length > 0) {
        fetchProductCard(productIds);
      }
    }
    setProcessing(false);
  }, [fetchProductCard]);

  useEffect(() => {
    fetCustomerWishlist();
  }, [fetCustomerWishlist]);

  return !processing ? (
    items.length > 0 ? (
      <WishlistList productCardItems={productCardItems} />
    ) : (
      <div className="flex flex-col items-center justify-center mt-8">
        <p className="text-center">Bạn chưa có sản phẩm yêu thích nào</p>
      </div>
    )
  ) : (
    <LayoutSpinner className="flex flex-col items-center justify-center mt-8" />
  );
};

export default AccountTabWishList;
