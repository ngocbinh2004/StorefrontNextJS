"use client";
import OrderDetailNextApi from "@/common/api/next/OrderDetailNextApi";
import { OrderDetailJson } from "@/common/types/OrderDetail";
import TextMoney from "@/components/shared/displaydata/TextMoney";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const OrderSuccessDetail = ({ orderId }: { orderId: number }) => {
  const [processing, setProcessing] = useState(false);
  const [details, setDetails] = useState<OrderDetailJson[]>([]);

  const fetchOrderDetail = useCallback(async (orderId: number) => {
    setProcessing(true);
    const collection = await OrderDetailNextApi.getItems(orderId);
    if (!collection.hasError()) {
      setDetails(collection.items);
    }
    setProcessing(false);
  }, []);

  useEffect(() => {
    if (orderId > 0) {
      fetchOrderDetail(orderId);
    }
  }, [fetchOrderDetail, orderId]);

  return (
    <>
      <h2 className="sr-only">Chi tiết đơn hàng</h2>

      <h3 className="sr-only">Sản phẩm</h3>
      {details.map((product) => {
        let avatarUrl = "/assets/no-image.svg";

        if (product.avatar_file_list.length > 0) {
          avatarUrl = product.avatar_file_list[0].url;
        }
        return (
          <div
            key={product.id}
            className="flex py-4 space-x-6 border-b border-gray-200"
          >
            <Image
              height={"100"}
              width={"100"}
              src={avatarUrl}
              alt={""}
              className="flex-none object-cover object-center w-10 h-10 bg-gray-100 rounded-lg sm:h-20 sm:w-20"
            />
            <div className="flex flex-col flex-auto">
              <div>
                <h4 className="font-medium text-gray-900">
                  <span>{product.item_name}</span>
                </h4>
              </div>
              <div className="flex items-end flex-1 mt-6">
                <dl className="flex space-x-4 text-sm divide-x divide-gray-200 sm:space-x-6">
                  <div className="flex">
                    <dt className="font-medium text-gray-900">Số lượng</dt>
                    <dd className="ml-2 text-gray-700">
                      {product.item_quantity}
                    </dd>
                  </div>
                  <div className="flex pl-4 sm:pl-6">
                    <dt className="font-medium text-gray-900">Đơn giá</dt>
                    <dd className="ml-2 text-gray-700">
                      {<TextMoney money={product.item_unit_price} />}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default OrderSuccessDetail;
