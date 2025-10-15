import OrderModel from "@/common/models/OrderModel";
import { OrderJson } from "@/common/types/Order";
import React, { useMemo } from "react";
import region from "@/common/contants/region.json";

const OrderSuccessInformation = ({ orderItem }: { orderItem: OrderJson }) => {
  const findRegion = (id: number) => {
    return region.find((i) => i.id === id)?.name || "";
  };

  const mappingShippingRegion = useMemo(() => {
    let address = "";
    if (orderItem.shipping_sub_sub_region_id > 0) {
      address += findRegion(orderItem.shipping_sub_sub_region_id) + ", ";
    }
    if (orderItem.shipping_sub_region_id > 0) {
      address += findRegion(orderItem.shipping_sub_region_id) + ", ";
    }
    if (orderItem.shipping_region_id > 0) {
      address += findRegion(orderItem.shipping_region_id);
    }
    return address;
  }, [orderItem]);

  const mappingBillingRegion = useMemo(() => {
    let address = "";
    if (orderItem.billing_sub_sub_region_id > 0) {
      address += findRegion(orderItem.billing_sub_sub_region_id) + ", ";
    }
    if (orderItem.billing_sub_region_id > 0) {
      address += findRegion(orderItem.billing_sub_region_id) + ", ";
    }
    if (orderItem.billing_region_id > 0) {
      address += findRegion(orderItem.billing_region_id);
    }
    return address;
  }, [orderItem]);

  return (
    <>
      <h4 className="sr-only">Địa chỉ</h4>
      <dl className="grid grid-cols-2 py-4 text-sm gap-x-6">
        <div>
          <dt className="font-medium text-gray-900">Thông tin giao hàng</dt>
          <dd className="mt-2 text-gray-700">
            <address className="not-italic">
              <span className="block">{orderItem.shipping_full_name}</span>
              <span className="block">{orderItem.shipping_address}</span>
              <span className="block">{mappingShippingRegion}</span>
            </address>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-gray-900">Thông tin đặt hàng</dt>
          <dd className="mt-2 text-gray-700">
            <address className="not-italic">
              <span className="block">{orderItem.billing_full_name}</span>
              <span className="block">{orderItem.billing_address}</span>
              <span className="block">{mappingBillingRegion}</span>
            </address>
          </dd>
        </div>
      </dl>

      <h4 className="sr-only">Payment</h4>
      <dl className="grid grid-cols-2 py-4 text-sm border-t border-gray-200 gap-x-6">
        <div>
          <dt className="font-medium text-gray-900">Phương thức thanh toán</dt>
          <dd className="mt-2 text-gray-700">
            <p>
              {
                OrderModel.getPaymentMethod(orderItem.payment_method.method)
                  ?.label
              }
            </p>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-gray-900">Phương thức giao hàng</dt>
          <dd className="mt-2 text-gray-700">
            <p className=" italic">{"Đang xử lý"}</p>
          </dd>
        </div>
      </dl>
    </>
  );
};

export default OrderSuccessInformation;
