import { OrderJson } from "@/common/types/Order";
import OrderSuccessDetail from "./OrderSuccessDetail";
import OrderSuccessInformation from "./OrderSuccessInformation";
import OrderSuccessPriceSummary from "./OrderSuccessPriceSummary";

const OrderSuccessContainer = ({ orderItem }: { orderItem: OrderJson }) => {
  return (
    <div className="flex flex-col h-full gap-8 lg:flex-row">
      <section className="px-4 py-4 basis-3/5 sm:py-4">
        <div className="max-w-xl">
          <p className="mt-2 text-xl font-bold tracking-tight">
            Cảm ơn bạn đã đặt hàng!
          </p>
          <p className="mt-2 text-base text-gray-500">
            Đơn hàng <span className=" font-bold">#{orderItem.id}</span> sẽ được
            xử lý và giao trong thời gian sớm nhất.
          </p>
        </div>
        <div className="mt-10 border-t border-gray-200">
          <OrderSuccessDetail orderId={orderItem.id} />
          <div className="sm:ml-20 sm:pl-6">
            <h3 className="sr-only">{"Thông tin mua hàng"}</h3>
            <OrderSuccessInformation orderItem={orderItem} />
            <OrderSuccessPriceSummary orderItem={orderItem} />
          </div>
        </div>
      </section>

      <section className="px-4 py-4 basis-2/5 sm:py-8 bg-gray-50"></section>
    </div>
  );
};

export default OrderSuccessContainer;
