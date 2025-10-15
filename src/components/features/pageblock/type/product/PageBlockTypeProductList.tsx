"use client";

import { ListInputItem, ListInputItems } from "@/common/interfaces/ListInput";
import { ProductCardJson } from "@/common/types/ProductCard";
import ProductList from "@/components/features/product/list/ProductList";
import { Button } from "@nextui-org/react";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import PageBlockTypeProductSubMenu from "./PageBlockTypeProductSubMenu";

const PageBlockTypeProductList = ({
  listItems,
  productCardItems,
  children,
}: {
  listItems: ListInputItems;
  productCardItems: ProductCardJson[];
  children?: ReactNode;
}) => {
  const limitNumberOfViewedProducts = 10;

  const [selectedItem, setSelectedItem] = useState<ListInputItem | undefined>(
    undefined
  );
  const [items, setItems] = useState<ProductCardJson[]>([]);

  const allowLoadAllItems = useMemo(() => {
    return (
      productCardItems.length > limitNumberOfViewedProducts &&
      items.length < productCardItems.length
    );
  }, [productCardItems, items]);

  const getViewedProducts = useCallback(() => {
    let newItems: ProductCardJson[] = [];
    for (let i = 0; i < productCardItems.length; i++) {
      let item = productCardItems[i];
      if (i < limitNumberOfViewedProducts) {
        newItems.push(item);
      }
    }
    setItems(newItems);
  }, [productCardItems]);

  const loadAllItems = useCallback(() => {
    setItems(productCardItems);
  }, [productCardItems]);

  useEffect(() => {
    getViewedProducts();
  }, [getViewedProducts]);

  return (
    <>
      {/* sub menu */}
      {listItems.length > 0 ? (
        <div className="flex items-end justify-end p-2 space-x-2">
          <PageBlockTypeProductSubMenu
            subMenuItems={listItems}
            onChange={setSelectedItem}
          />
        </div>
      ) : null}

      {/* banner */}
      {children}

      {/* product list */}
      <div className="flex items-center justify-center">
        <ProductList
          className="py-0 m-0 sm:mx-2 lg:mx-2"
          gridCol="grid-cols-5"
          items={items}
        />
      </div>
      {allowLoadAllItems ? (
        <div className="flex items-center justify-center w-full px-2 pt-2">
          <Button
            className="px-4 w-[162px] bg-white border-1.5 hover:text-primary"
            onClick={loadAllItems}
          >
            Xem tất cả
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default PageBlockTypeProductList;
