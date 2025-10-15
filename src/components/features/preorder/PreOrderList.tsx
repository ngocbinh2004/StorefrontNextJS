import { PreOrderJson } from "@/common/types/PreOrder";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import PreOrderItem from "./PreOrderItem";

const PreOrderList = ({
  preOrderItems,
  isOpen,
  onClose,
  onOpenChange,
}: {
  preOrderItems: PreOrderJson[];
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      isDismissable={false}
      size="xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h5 className="text-xl font-bold text-primary">
                Danh sách khách hàng đã đăng kí
              </h5>
            </ModalHeader>
            <ModalBody>
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Tên khách hàng
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Số điện thoại
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Ngày đăng kí
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {preOrderItems.map((item) => (
                      <PreOrderItem key={item.id} preOrderItem={item} />
                    ))}
                  </tbody>
                </table>
              </div>
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

export default PreOrderList;
