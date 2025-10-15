"use client";

import OrderModel from "@/common/models/OrderModel";
import { OrderJson } from "@/common/types/Order";
import TextDateTime from "@/components/shared/displaydata/TextDateTime";
import OrderDetailItem from "./OrderDetailItem";

const OrderTrackingDetail = ({ order }: { order: OrderJson }) => {
  return (
    <div>
      <p>
        Đơn hàng #<span className="bg-[#fcf8e3] p-1">{order.id}</span> được đặt
        vào ngày{" "}
        <span className="px-4 py-1 text-xs bg-gray-200 rounded-full">
          <TextDateTime ts={order.date_created} />
        </span>{" "}
        và hiện{" "}
        <span
          className={`bg-opacity-1 text-white text-xs rounded-full px-4 py-1`}
          style={{
            backgroundColor: OrderModel.getStatus(order.status)?.color,
          }}
        >
          {OrderModel.getStatus(order.status)?.label}
        </span>
      </p>
      <h1 className="mt-4 mb-2 font-semibold uppercase">Chi tiết đơn hàng</h1>

      <OrderDetailItem item={order} />
    </div>
  );
};

export default OrderTrackingDetail;
