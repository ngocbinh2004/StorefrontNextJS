"use client";

import CustomerWishlistNextApi from "@/common/api/next/CustomerWishlistNextApi";
import { CustomerJson } from "@/common/types/Customer";
import {
  CustomerWishlistJson,
  CustomerWishlistJsonAdd,
} from "@/common/types/CustomerWishlist";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import update from "immutability-helper";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

const WishlistButton = ({
  wishlistItems,
  productId,
  from,
  label,
  loggedUser,
}: {
  wishlistItems: CustomerWishlistJson[];
  productId: number;
  from: number;
  label?: string;
  loggedUser?: CustomerJson;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [items, setItems] = useState<CustomerWishlistJson[]>([]);

  const findProductWishlist = useMemo(() => {
    return items.find((i) => i.product_id === productId);
  }, [productId, items]);

  const addProductToWishlist = useCallback(
    async (id: number) => {
      if (id > 0) {
        const data: CustomerWishlistJsonAdd = {
          product_id: id,
          from: from,
        };

        const addData = await CustomerWishlistNextApi.addData(data);
        if (!addData.hasError()) {
          let findIndex = items.findIndex((i) => i.id === addData.id);
          if (findIndex > -1) {
            // update
            setItems(
              update(items, {
                [findIndex]: { $set: addData },
              })
            );
          } else {
            // append
            setItems(update(items, { $push: [addData] }));
          }
        }
      }
    },
    [from, items]
  );

  const removeProductFromWishlist = useCallback(
    async (id: number) => {
      if (id > 0) {
        const deleteData = await CustomerWishlistNextApi.deleteData(id);
        if (deleteData.length === 0) {
          setItems(items.filter((i) => i.id !== id));
        }
      }
    },
    [items]
  );

  useEffect(() => {
    setItems(wishlistItems);
  }, [wishlistItems]);

  const checkLoggedUser = useMemo(() => {
    let userId = 0;
    if (loggedUser) {
      userId = loggedUser.id;
    }

    return userId > 0 ? true : false;
  }, [loggedUser]);

  return (
    <>
      <div className="flex items-center gap-0.5 cursor-pointer">
        <span className="text-sm ">{label || ""}</span>
        {findProductWishlist !== undefined && findProductWishlist.id > 0 ? (
          <IconHeartFilled
            size={18}
            color="red"
            className="text-primary"
            onClick={(e) => {
              e.preventDefault();
              if (checkLoggedUser) {
                removeProductFromWishlist(findProductWishlist.id);
              } else {
                onOpen();
              }
            }}
          />
        ) : (
          <IconHeart
            size={18}
            color="red"
            className="text-primary"
            onClick={(e) => {
              e.preventDefault();
              if (checkLoggedUser) {
                addProductToWishlist(productId);
              } else {
                onOpen();
              }
            }}
          />
        )}
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        size="xs"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="grid justify-items-center">
                {"Thông báo"}
              </ModalHeader>
              <ModalBody>
                <p>Vui lòng đăng nhập tài khoản để thêm sản phẩm yêu thích.</p>
              </ModalBody>
              <ModalFooter className="justify-center">
                <Button color="danger" onPress={onClose} className="bg-primary">
                  <Link href={"/account/login"}>Đăng nhập</Link>
                </Button>
                <Button
                  color="default"
                  onPress={onClose}
                  className="bg-white border-2 border-primary text-primary"
                >
                  <Link href={"/account/signup"}>Đăng kí</Link>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default WishlistButton;
