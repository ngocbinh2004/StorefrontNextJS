import InstallmentModel from "@/common/models/InstallmentModel";
import { InstallmentJson } from "@/common/types/Installment";
import Helper from "@/common/utils/helper";
import Image from "next/image";

const InstallmentPackageItem = ({
  item,
  onSelectedInstallment,
}: {
  item: InstallmentJson;
  onSelectedInstallment: (item: InstallmentJson) => void;
}) => {
  const merchantBank = InstallmentModel.getMerchantBank(item.merchant_id);

  return (
    <div className="border text-sm rounded-t-2xl rounded-b-xl">
      <div
        className="flex grid-cols-2 items-center rounded-t-2xl py-2 text-white"
        style={{ background: merchantBank?.color }}
      >
        <div className="text-center flex items-center justify-center w-[80px] p-2">
          <Image
            src={merchantBank?.logo ?? "no-image.svg"}
            height={50}
            width={50}
            style={{ height: "20px", width: "auto" }}
            alt={merchantBank?.name ?? "bank"}
          />
        </div>
        <div className="flex flex-col">
          <div className="font-bold">{`Kỳ hạn ${item.tenor} tháng`}</div>
          <div className="text-xs">{merchantBank?.note}</div>
        </div>
      </div>
      <div className="p-3 flex flex-col gap-y-2 w-[220px]">
        <div className="flex justify-between">
          <span>{"Giá sản phẩm:"}</span>
          <span className="font-bold">{Helper.moneyFormat(item.price)}</span>
        </div>
        <div className="flex justify-between">
          <span>{"Trả trước:"}</span>
          <span className="font-bold">
            {Helper.moneyFormat(item.pre_paid_amount)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>{"Kỳ hạn:"}</span>
          <span className="font-bold">{`${item.tenor} tháng`}</span>
        </div>
        <div className="flex justify-between">
          <span>{"Lãi suất:"}</span>
          <span className="font-bold text-red-700">
            {Helper.numberFormat(item.interest_rate * 100)}%
          </span>
        </div>
        <div className="flex justify-between">
          <span>{"Góp mỗi tháng:"}</span>
          <span className="font-bold">
            {Helper.moneyFormat(item.payment_per_month)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>{"Chênh lệch:"}</span>
          <span className="font-bold">
            {Helper.moneyFormat(item.total_interest)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>{"Tổng tiền góp:"}</span>
          <span className="font-bold">
            {Helper.moneyFormat(item.total_price_after_installment)}
          </span>
        </div>
        <div className="mt-3 mb-1">
          <button
            onClick={() => onSelectedInstallment(item)}
            className="border rounded border-red-500 text-red-500 block text-center mx-auto px-10 py-1.5 font-semibold"
          >
            {"Đặt mua"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallmentPackageItem;
