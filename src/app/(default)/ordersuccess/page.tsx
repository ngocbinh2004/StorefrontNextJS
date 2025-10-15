import OrderApi from "@/common/api/server/OrderApi";
import { notFound } from "next/navigation";
import OrderSuccessContainer from "./OrderSuccessContainer";

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const hasKey = searchParams.haskey?.toString() || "";

  const foundedOrder = await OrderApi.getOrderByKey(hasKey);
  if (foundedOrder.id === 0) {
    return notFound();
  }

  return (
    <div className="w-full min-h-[600px]">
      <div className="container h-full antialiased">
        <OrderSuccessContainer orderItem={foundedOrder} />
      </div>
    </div>
  );
}
