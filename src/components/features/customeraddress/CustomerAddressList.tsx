"use client";

import CustomerAddressNextApi from "@/common/api/next/CustomerAddressNextApi";
import region from "@/common/contants/region.json";
import CustomerAddressModel from "@/common/models/CustomerAddressModel";
import { CustomerAddressJson } from "@/common/types/CustomerAddress";
import ToastContentList from "@/components/toast/ToastContentList";
import { Button, Link, useDisclosure } from "@nextui-org/react";
import { IconMapPin2 } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import CustomerAddressForm from "./UserAddressForm";

const CustomerAddressList = ({
  customerAddressItems,
  onSaveSuccess,
  onSetAsDefaultSuccess,
  onDeleteSuccess,
}: {
  customerAddressItems: CustomerAddressJson[];
  onSaveSuccess: (item: CustomerAddressModel) => void;
  onSetAsDefaultSuccess: (item: CustomerAddressModel) => void;
  onDeleteSuccess: (id: number) => void;
}) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [items, setItems] = useState<CustomerAddressJson[]>([]);
  const [editingItem, setEditingItem] = useState<CustomerAddressJson>(
    CustomerAddressModel.getDefaultData()
  );

  const findRegion = useCallback((id: number) => {
    return region.find((i) => i.id === id)?.name || "";
  }, []);

  const mappingAddress = useCallback(
    (item: CustomerAddressJson) => {
      let address = "";
      if (item.sub_sub_region_id > 0) {
        address += findRegion(item.sub_sub_region_id) + ", ";
      }
      if (item.sub_region_id > 0) {
        address += findRegion(item.sub_region_id) + ", ";
      }
      if (item.region_id > 0) {
        address += findRegion(item.region_id);
      }
      return address;
    },
    [findRegion]
  );

  const doDelete = useCallback(
    async (id: number) => {
      if (id > 0) {
        const deleteAddress = await CustomerAddressNextApi.delete(id);
        if (deleteAddress.length === 0) {
          toast.success(
            <ToastContentList title={"Xoá địa chỉ nhận hàng thành công"} />
          );

          onDeleteSuccess(id);
        }
      }
    },
    [onDeleteSuccess]
  );

  const doSetAsDefault = useCallback(
    async (id: number) => {
      if (id > 0) {
        const setDefault = await CustomerAddressNextApi.setAddressesAsDefault(
          id
        );
        if (!setDefault.hasError()) {
          toast.success(
            <ToastContentList title={"Thiết lập mặc định thành công"} />
          );

          onSetAsDefaultSuccess(setDefault);
        }
      }
    },
    [onSetAsDefaultSuccess]
  );

  const onOpenModalUpdate = useCallback(
    (item: CustomerAddressJson) => {
      if (item.id > 0) {
        setEditingItem(item);
        onOpen();
      }
    },
    [onOpen]
  );

  useEffect(() => {
    setItems(customerAddressItems);
  }, [customerAddressItems]);

  return (
    <>
      {items.length > 0 ? (
        <div className="border">
          {items.map((item) => {
            return (
              <div key={item.id} className="p-6 sm:flex border-b-1">
                <div className="flex items-center justify-center space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8">
                  <div className="min-w-0 flex-1 pt-1.5 sm:pt-0">
                    <div className="flex items-center py-1">
                      <h2 className="font-bold text-gray-900">
                        {item.full_name}
                      </h2>
                      <div className="flex mx-2 font-extralight">|</div>
                      <div className="flex items-center">
                        <h3 className="text-sm font-light text-gray-500">
                          0{item.phone}
                        </h3>
                      </div>
                      {/* badge */}
                      {item.is_default ? (
                        <div className="px-2 py-1 ml-2 text-xs font-medium text-green-700 rounded-md ring-1 ring-inset bg-green-50 ring-green-600/20">
                          Mặc định
                        </div>
                      ) : null}
                    </div>

                    <p className="text-sm font-light leading-5 text-gray-500">
                      {item.address}
                    </p>
                    <p className="text-sm font-light leading-5 text-gray-500">
                      {mappingAddress(item)}
                    </p>
                  </div>
                </div>

                <div className="sm:ml-6 sm:w-40 sm:flex-none">
                  <div className="sm:text-end">
                    <Link
                      href="#"
                      underline="hover"
                      onClick={(e) => {
                        e.preventDefault();
                        onOpenModalUpdate(item);
                      }}
                      className="text-sm leading-6 text-primary"
                    >
                      Cập nhật
                    </Link>
                    {!item.is_default ? (
                      <Link
                        href="#"
                        underline="hover"
                        onClick={(e) => {
                          e.preventDefault();
                          doDelete(item.id);
                        }}
                        className="ml-2 text-sm leading-6 text-primary"
                      >
                        Xoá
                      </Link>
                    ) : null}
                  </div>

                  {!item.is_default ? (
                    <div className="sm:text-end">
                      <Button
                        size="sm"
                        color="primary"
                        onClick={(e) => {
                          e.preventDefault();
                          doSetAsDefault(item.id);
                        }}
                        className="text-sm"
                      >
                        Thiết lập mặc định
                      </Button>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
          <Toaster toastOptions={{ success: { duration: 2000 } }} />
        </div>
      ) : (
        <div className="flex items-center justify-center my-6 text-xl">
          <IconMapPin2 className="mr-2" size={30} />
          <span>Bạn chưa có địa chỉ nào</span>
        </div>
      )}

      <div className="pt-2">
        <Button
          className="text-white bg-primary"
          onClick={(e) => {
            e.preventDefault();
            onOpen();
          }}
        >
          Thêm địa chỉ
        </Button>
      </div>

      {isOpen ? (
        <CustomerAddressForm
          editingItem={editingItem}
          onSaveSuccess={onSaveSuccess}
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setEditingItem(CustomerAddressModel.getDefaultData());
          }}
          onOpenChange={onOpenChange}
        />
      ) : null}
    </>
  );
};

export default CustomerAddressList;
