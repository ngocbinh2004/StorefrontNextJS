"use client";

import OrderNextApi from "@/common/api/next/OrderNextApi";
import OrderModel from "@/common/models/OrderModel";
import { OrderCheckRequest, OrderJson } from "@/common/types/Order";
import FormFieldErrorMessage from "@/components/shared/form/FormFieldErrorMessage";
import LayoutSpinner from "@/components/shared/layout/spinner/Spinner";
import { Button, Input } from "@nextui-org/react";
import { useCallback, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import OrderTrackingDetail from "./OrderTrackingDetail";

const OrderTracking = () => {
  const [showTrackingInfo, setShowTrackingInfo] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState<OrderJson>(
    OrderModel.getDefaultData()
  );
  const [processing, setProcessing] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<OrderCheckRequest>
  >({});

  const { register, handleSubmit } = useForm<OrderCheckRequest>();

  const onSubmit = useCallback(async (formData: OrderCheckRequest) => {
    //clear offline error
    setFieldErrors({});
    setProcessing(true);
    setShowTrackingInfo(true);

    //prepare data
    const data: OrderCheckRequest = {
      ...formData,
    };

    const trackingOrder = await OrderNextApi.check(data);
    if (!trackingOrder.hasError()) {
      setTrackingInfo(trackingOrder);
    }
    setProcessing(false);
  }, []);

  return (
    <div>
      {!showTrackingInfo ? (
        <>
          <div className="md:flex w-full">
            <div className="p-8 md:mx-auto md:w-full md:max-w-md  border border-gray-200 rounded-lg">
              <div className="mb-5">
                <p>
                  {
                    'Để theo dõi đơn hàng của bạn, vui lòng nhập Mã đơn hàng và Số điện thoại vào ô bên dưới và nhấn nút "Tra cứu".'
                  }
                </p>
              </div>
              <div>
                <form
                  onSubmit={handleSubmit(onSubmit, (err) =>
                    setFieldErrors(err)
                  )}
                  className="grid grid-cols-1 gap-y-6"
                >
                  <div className="flex flex-col col-span-6 gap-3">
                    <label className="block">
                      <Input
                        placeholder="Mã đơn hàng *"
                        aria-label="Mã đơn hàng *"
                        {...register("id", {
                          required: {
                            value: true,
                            message: "Vui lòng nhập mã đơn hàng",
                          },
                        })}
                      />
                      <FormFieldErrorMessage
                        fieldErrors={fieldErrors}
                        name="id"
                      />
                    </label>
                  </div>
                  <div className="flex flex-col col-span-6 gap-3">
                    <label className="block">
                      <Input
                        placeholder="Số điện thoại *"
                        aria-label="Số điện thoại *"
                        {...register("phone", {
                          required: {
                            value: true,
                            message: "Vui lòng nhập số điện thoại",
                          },
                          minLength: {
                            value: 9,
                            message: "Số điện thoại không hợp lệ",
                          },
                        })}
                      />
                      <FormFieldErrorMessage
                        fieldErrors={fieldErrors}
                        name="phone"
                      />
                    </label>
                  </div>
                  <Button className="mt-4 w-full" color="primary" type="submit">
                    Tra cứu
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : processing ? (
        <LayoutSpinner className="flex mt-8" />
      ) : trackingInfo.id > 0 ? (
        <OrderTrackingDetail order={trackingInfo} />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg text-center">Không tìm thấy đơn hàng</p>
          <p className="text-lg text-center">
            Liên hệ
            <span className="font-bold text-primary">1800.6018</span> để được hỗ
            trợ
          </p>
          <Button
            className="mt-1"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              setShowTrackingInfo(false);
            }}
          >
            Tra cứu đơn khác
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
