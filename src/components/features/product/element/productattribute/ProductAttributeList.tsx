"use client";

import ProductCategoryNextApi from "@/common/api/next/ProductCategoryNextApi";
import ProductCategoryCollection from "@/common/collections/ProductCategoryCollection";
import { AttributeJson } from "@/common/types/Attribute";
import {
  ProductAttributeOverrideJson,
  ProductJson,
} from "@/common/types/Product";
import { Button, useDisclosure } from "@nextui-org/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import ProductAttributeItem from "./ProductAttributeItem";
import ProductAttributeModalDetail from "./ProductAttributeModalDetail";

const ProductAttributeList = ({ product }: { product: ProductJson }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [categoryCollection, setCategoryCollection] =
    useState<ProductCategoryCollection>(new ProductCategoryCollection());

  const fetchData = useCallback(async (categoryId: number) => {
    const collection = await ProductCategoryNextApi.getAttributeCategory(
      categoryId,
    );
    setCategoryCollection(collection);
  }, []);

  const hasAttributeGroup: boolean = useMemo(() => {
    return (
      (categoryCollection.items[0]?.attribute_group &&
        categoryCollection.items[0].attribute_group.length > 0) ||
      false
    );
  }, [categoryCollection]);

  const myCategory = categoryCollection.items[0];

  const filterAttributeListHasDefaultShow = useMemo(() => {
    let newAttrItems: AttributeJson[] = [];
    let newAttrOverride: ProductAttributeOverrideJson[] = [];

    if (
      typeof myCategory?.attribute_group !== "undefined" &&
      myCategory?.attribute_group.length > 0
    ) {
      for (let i = 0; i < myCategory.attribute_group.length; i++) {
        let group = myCategory.attribute_group[i];
        const attributeList = myCategory.attribute?.filter(
          (i) => i.attribute_group_id === group.id,
        );
        if (attributeList && attributeList.length > 0) {
          for (let i = 0; i < attributeList.length; i++) {
            let attr = attributeList[i];
            let findValue: ProductAttributeOverrideJson | undefined =
              product.attribute_detail.find(
                (i) => i.id === attr.id && attr.default_show === 1,
              );
            if (
              typeof findValue !== "undefined" &&
              findValue.id > 0 &&
              findValue.value !== ""
            ) {
              newAttrItems.push(attr);
              newAttrOverride.push(findValue);
            }
          }
        }
      }
    }

    return {
      attributeItems: newAttrItems,
      attributeOverrideItems: newAttrOverride,
    };
  }, [myCategory, product]);

  const handleOpen = () => {
    onOpen();
  };

  useEffect(() => {
    if (product.category_primary > 0) {
      fetchData(product.category_primary);
    }
  }, [product.category_primary, fetchData]);

  if (
    myCategory?.id > 0 &&
    hasAttributeGroup &&
    product.attribute_detail.length > 0
  ) {
    return (
      <>
        {hasAttributeGroup ? (
          <div className="col-span-2 max-md:order-11">
            <h2 className="mb-4 text-xl font-bold max-md:mx-2">
              {"Cấu hình " + product.name}
            </h2>

            {hasAttributeGroup &&
            filterAttributeListHasDefaultShow.attributeItems.length > 0 &&
            filterAttributeListHasDefaultShow.attributeOverrideItems.length > 0
              ? filterAttributeListHasDefaultShow.attributeItems.map(
                  (item, key) => {
                    return (
                      <ProductAttributeItem
                        key={item.id}
                        attributeItem={item}
                        keyItem={key}
                        attributeOverrideItems={
                          filterAttributeListHasDefaultShow.attributeOverrideItems
                        }
                      />
                    );
                  },
                )
              : null}

            <div className="flex items-center justify-center mt-4 mb-4 lg:mb-0">
              <Button
                className="border-1.5 border-primary bg-white text-primary"
                onClick={handleOpen}>
                Xem thêm cấu hình chi tiết
              </Button>
            </div>
          </div>
        ) : null}

        {isOpen ? (
          <ProductAttributeModalDetail
            myCategory={myCategory.toJson()}
            product={product}
            isOpen={isOpen}
            onClose={() => {
              onClose();
            }}
            onOpenChange={onOpenChange}
          />
        ) : null}
      </>
    );
  }
};

export default ProductAttributeList;
