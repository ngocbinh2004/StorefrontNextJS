"use client";
import { ProductJson } from "@/common/types/Product";
import { cn } from "@/common/utils/cn";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import { ReactNode } from "react";

export default function ProductRatingNoticeModal({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Button color="primary" className={cn(className)} onPress={onOpen}>
        {children}
      </Button>
      <Modal size="xs" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="grid justify-items-center">
            {"Thông báo"}
          </ModalHeader>
          <ModalBody>
            <p>{"Vui lòng đăng nhập tài khoản để đánh giá."}</p>
          </ModalBody>
          <ModalFooter className="center">
            <Button color="primary" variant="bordered">
              <Link className="text-primary" href="/account/signup">
                Đăng ký
              </Link>
            </Button>
            <Button color="primary">
              <Link className="text-white" href="/account/login">
                Đăng nhập
              </Link>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
