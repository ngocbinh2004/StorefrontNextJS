"use client";

import OrderModel from "@/common/models/OrderModel";
import { OrderJson } from "@/common/types/Order";
import TextDateTime from "@/components/shared/displaydata/TextDateTime";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import OrderDetailItem from "./OrderDetailItem";

const OrderDetailModal = ({
  item,
  isOpen,
  onClose,
  onOpenChange,
}: {
  item: OrderJson;
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}) => {
  return (
    <Modal
      size={"5xl"}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
    >
      <ModalContent>
        {(onClose: any) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Chi tiết đơn hàng #{item.id}
              <p className="text-xs">
                Đơn hàng được đặt vào ngày{" "}
                <span className="px-4 py-1 text-xs bg-gray-200 rounded-full">
                  <TextDateTime ts={item.date_created} />
                </span>{" "}
                và trạng thái đơn hiện tại{" "}
                <span
                  className={`bg-opacity-1 text-white text-xs rounded-full px-4 py-1`}
                  style={{
                    backgroundColor: OrderModel.getStatus(item.status)?.color,
                  }}
                >
                  {OrderModel.getStatus(item.status)?.label}
                </span>
              </p>
            </ModalHeader>
            <ModalBody>
              <OrderDetailItem item={item} />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Đóng
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default OrderDetailModal;
