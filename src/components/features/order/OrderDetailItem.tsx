"use client";

import OrderDetailNextApi from "@/common/api/next/OrderDetailNextApi";
import OrderModel from "@/common/models/OrderModel";
import { OrderJson } from "@/common/types/Order";
import { OrderDetailJson } from "@/common/types/OrderDetail";
import TextMoney from "@/components/shared/displaydata/TextMoney";
import { useCallback, useEffect, useState } from "react";

const OrderDetailItem = ({ item }: { item: OrderJson }) => {
  const calculateOrderValue = useCallback((order: OrderJson) => {
    let subTotal = 0;
    let shippingPrice = order.price_shipping;
    let discountAmount = 0;

    order.order_details.map((i) => {
      return (subTotal += i.item_quantity * i.item_unit_price);
    });

    order.order_details.map((i) => {
      return (discountAmount += i.price_discount);
    });

    return {
      subTotal: subTotal,
      discount_amount: discountAmount,
      total: subTotal + shippingPrice - discountAmount,
    };
  }, []);

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
    if (item.id > 0) {
      fetchOrderDetail(item.id);
    }
  }, [fetchOrderDetail, item]);

  return (
    <>
      <table className="w-full border border-collapse [&_td]:border [&_th]:border [&_td]:p-2 [&_th]:p-2 first:[&_th]:w-2/3">
        <thead>
          <tr>
            <th className="text-left">Sản phẩm</th>
            <th className="text-right">Tổng cộng</th>
          </tr>
        </thead>
        <tbody>
          {details.length > 0
            ? details.map((i) => {
                return (
                  <tr key={i.product_id}>
                    <td>
                      {i.item_name} <b>x {i.item_quantity}</b>
                    </td>
                    <td className="text-right">
                      <TextMoney money={i.item_unit_price} />
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <b>Tổng phụ</b>
            </td>
            <td className="text-right">
              <TextMoney money={calculateOrderValue(item).subTotal} />
            </td>
          </tr>
          <tr>
            <td>
              <b>Phí giao hàng</b>
            </td>
            <td className="text-right">
              <TextMoney money={item.price_shipping} />
            </td>
          </tr>
          <tr>
            <td>
              <b>Phương thức thanh toán</b>
            </td>
            <td className="text-right">
              {OrderModel.getPaymentMethod(item.payment_method.method)?.label}
            </td>
          </tr>
          <tr>
            <td>
              <b>Tổng cộng</b>
            </td>
            <td className="text-right">
              <TextMoney money={item.price_final} />
            </td>
          </tr>
        </tfoot>
      </table>

      <h1 className="mt-4 mb-1 font-semibold uppercase">Địa chỉ người nhận</h1>
      <p>{item.billing_address}</p>
      <p>
        <b>Số điện thoại:</b> {item.billing_phone}
      </p>
      <p>
        <b>Email:</b> {item.contact_email}
      </p>
    </>
  );
};

export default OrderDetailItem;
