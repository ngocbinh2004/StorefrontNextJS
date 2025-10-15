"use client";

import OrderModel from "@/common/models/OrderModel";
import { OrderJson } from "@/common/types/Order";
import { cn } from "@/common/utils/cn";
import TextDateTime from "@/components/shared/displaydata/TextDateTime";
import TextMoney from "@/components/shared/displaydata/TextMoney";
import LayoutSpinner from "@/components/shared/layout/spinner/Spinner";
import { Button, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import OrderDetailModal from "../../order/OrderDetailModal";
import OrderNextApi from "@/common/api/next/OrderNextApi";

const AccountTabOrderList = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [processing, setProcessing] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderJson[]>([]);
  const [viewItem, setViewItem] = useState<OrderJson>(
    OrderModel.getDefaultData()
  );

  const fetchOrder = useCallback(async () => {
    setProcessing(true);
    // getListOfCurrentWebUser
    const collection = await OrderNextApi.getItems({
      page: 1,
      limit: 100,
      sortby: "id",
      sorttype: "DESC",
    });
    if (!collection.hasError()) {
      setOrderItems(collection.items);
    }
    setProcessing(false);
  }, []);

  const handleOpen = (item: OrderJson) => {
    onOpen();
    setViewItem(item);
  };

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  return (
    <div className="flex flex-col gap-4">
      {!processing ? (
        orderItems.length > 0 ? (
          orderItems.map((item) => {
            return (
              <div key={item.id}>
                <div className="p-5 space-y-1 border border-b-0 md:flex md:items-baseline md:space-x-4 md:space-y-0">
                  <h5 className="text-xl font-bold text-primary md:flex-shrink-0">
                    {`Mã đơn hàng: #${item.id}`}
                  </h5>
                  <div className="space-y-5 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 md:min-w-0 md:flex-1">
                    <p className="text-sm">
                      Ngày: <TextDateTime ts={item.date_created} />
                      <span
                        className={cn(
                          `text-white bg-opacity-1 text-[0.625rem] rounded-full py-0.5 px-2 ml-2`
                        )}
                        style={{
                          backgroundColor: OrderModel.getStatus(item.status)
                            ?.color,
                        }}
                      >
                        {OrderModel.getStatus(item.status)?.label}
                      </span>
                    </p>

                    <div className="flex">
                      <Button color="primary" onClick={() => handleOpen(item)}>
                        Xem đơn hàng
                      </Button>
                    </div>
                  </div>
                </div>

                <ul className="border">
                  {item.order_details.length > 0
                    ? item.order_details.map((item) => {
                        let avatarUrl = "/assets/no-image.svg";
                        if (item.avatar_file_list.length > 0) {
                          avatarUrl = item.avatar_file_list[0].url;
                        }
                        return (
                          <li key={item.id} className="p-4 sm:p-6">
                            <div className="flex items-center sm:items-start">
                              <div className="flex-shrink-0 p-2 overflow-hidden border rounded-lg">
                                <Image
                                  width={103}
                                  height={103}
                                  src={avatarUrl}
                                  alt=""
                                  title={item.item_title}
                                />
                              </div>
                              <div className="flex-1 my-auto ml-6">
                                <div className="text-gray-900 sm:flex sm:justify-between">
                                  <h5 className="text-base font-bold">
                                    {item.item_title}
                                  </h5>
                                  <h5 className="font-bold">
                                    Số lượng: {item.item_quantity}
                                  </h5>
                                  <p className="text-2xl font-bold text-primary">
                                    <TextMoney money={item.item_unit_price} />
                                  </p>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })
                    : null}
                </ul>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center mt-8">
            <p className="text-center">Bạn chưa có đơn hàng nào</p>
          </div>
        )
      ) : (
        <LayoutSpinner className="mt-8" />
      )}

      {viewItem.id > 0 && isOpen ? (
        <OrderDetailModal
          item={viewItem}
          isOpen={isOpen}
          onClose={onClose}
          onOpenChange={onOpenChange}
        />
      ) : null}
    </div>
  );
};

export default AccountTabOrderList;
