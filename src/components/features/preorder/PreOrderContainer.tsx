"use client";

import PreOrderNextApi from "@/common/api/next/PreOrderNextApi";
import PreOrderModel from "@/common/models/PreOrderModel";
import { PreOrderJson } from "@/common/types/PreOrder";
import { ProductVariantJson } from "@/common/types/ProductVariant";
import { useDisclosure } from "@nextui-org/react";
import update from "immutability-helper";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import PreOrderFormRegister from "./PreOrderFormRegister";
import PreOrderList from "./PreOrderList";

const PreOrderContainer = ({ variant }: { variant: ProductVariantJson }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [preOrderItems, setPreOrderItems] = useState<PreOrderJson[]>([]);

  const fetchPreOrder = useCallback(async () => {
    const collection = await PreOrderNextApi.getItems({
      page: 1,
      limit: 20,
      sortby: "id",
      sorttype: "DESC",
      product_variant_id: variant.id,
    });
    if (!collection.hasError()) {
      setPreOrderItems(collection.items);
    }
  }, [variant]);

  const onSaveSuccess = useCallback(
    (item: PreOrderModel) => {
      // append
      setPreOrderItems(
        update(preOrderItems, {
          $push: [item],
        }),
      );
    },
    [preOrderItems],
  );

  useEffect(() => {
    if (variant.id > 0) {
      fetchPreOrder();
    }
  }, [fetchPreOrder, variant.id]);

  return (
    <div className="mx-2 lg:mx-0">
      <PreOrderFormRegister variant={variant} onSaveSuccess={onSaveSuccess} />

      {preOrderItems.length > 0 ? (
        <p className="my-2 text-sm text-left">
          Có <span className="text-primary">{preOrderItems.length}</span> khách
          hàng đã đăng kí (
          <Link
            href={"#"}
            onClick={(e) => {
              e.preventDefault();
              onOpen();
            }}
            className="text-sm leading-6 underline text-primary">
            Xem chi tiết
          </Link>
          )
        </p>
      ) : null}

      {isOpen ? (
        <PreOrderList
          preOrderItems={preOrderItems}
          isOpen={isOpen}
          onClose={onClose}
          onOpenChange={onOpenChange}
        />
      ) : null}
    </div>
  );
};

export default PreOrderContainer;
