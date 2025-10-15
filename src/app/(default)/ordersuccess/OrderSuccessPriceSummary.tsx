import { OrderJson } from "@/common/types/Order";
import TextMoney from "@/components/shared/displaydata/TextMoney";
import React from "react";

const OrderSuccessPriceSummary = ({ orderItem }: { orderItem: OrderJson }) => {
  return (
    <>
      <dl className="pt-4 space-y-6 text-sm border-t border-gray-200">
        <div className="flex justify-between">
          <dt className="font-medium text-gray-900">Tiền hàng</dt>
          <dd className="text-gray-700">
            <TextMoney money={orderItem.price_sell} />
          </dd>
        </div>

        {orderItem.promotion_code !== "" ? (
          <div className="flex justify-between">
            <dt className="flex font-medium text-gray-900">
              Giảm giá
              <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600">
                {orderItem.promotion_code}
              </span>
            </dt>
            <dd className="text-gray-700">
              -<TextMoney money={orderItem.price_discount} />
            </dd>
          </div>
        ) : null}

        <div className="flex justify-between">
          <dt className="font-medium text-gray-900">Phí vận chuyển</dt>
          <dd className="text-gray-700">
            <TextMoney money={orderItem.price_shipping} />
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-bold text-gray-900">Tổng cộng</dt>
          <dd className="font-bold text-gray-900">
            <TextMoney money={orderItem.price_final} />
          </dd>
        </div>
      </dl>
    </>
  );
};

export default OrderSuccessPriceSummary;
