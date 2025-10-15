"use client";
import {
  InstallmentAlePayJson,
  PeriodAlePayJson,
} from "@/common/types/InstallmentAlePay";
import Helper from "@/common/utils/helper";
import { Button } from "@nextui-org/react";
import { useMemo } from "react";

const AlePayPeriodTable = ({
  amount,
  installment,
  typeCard,
  onSelectedInstallment,
}: {
  amount: number;
  installment: InstallmentAlePayJson;
  typeCard: string;
  onSelectedInstallment: (v: PeriodAlePayJson) => void;
}) => {
  const intallmentPeriods = useMemo(() => {
    let periods: PeriodAlePayJson[] = [];
    const result = installment.paymentMethods.find(
      (item) => item.paymentMethod === typeCard
    );
    if (typeof result !== "undefined") {
      periods = result.periods;
    }

    return periods;
  }, [installment, typeCard]);

  const handleSelectFin = (item: PeriodAlePayJson) => {
    onSelectedInstallment(item);
  };

  if (intallmentPeriods.length > 0) {
    return (
      <>
        <div className="bg-red-600 text-white p-2 mb-2 uppercase text-sm font-bold">{`Trả góp qua ${installment.bankName} bằng thẻ ${typeCard}`}</div>
        <div className="overflow-x-auto">
          <table className="table-fixed w-full border text-sm">
            <thead className="border text-black-500">
              <tr className="px-6 py-3">
                {[
                  <td
                    className="border p-2"
                    key={"month"}
                    style={{ width: "190px" }}
                  >
                    {"Số tháng trả góp"}
                  </td>,
                  ...intallmentPeriods.map((item, idx) => (
                    <td
                      className="p-2 border font-bold text-center"
                      key={"month" + idx}
                      style={{ width: "150px" }}
                    >
                      {item.month}
                    </td>
                  )),
                ]}
              </tr>
            </thead>
            <tbody>
              <tr className="text-left even:bg-gray-100 odd:bg-white ">
                {[
                  <td className="border p-2" key={"amount"}>
                    {"Giá mua trả góp"}
                  </td>,
                  ...intallmentPeriods.map((item, idx) => (
                    <td className="border p-2 text-center" key={"amount" + idx}>
                      {Helper.moneyFormat(amount)}
                    </td>
                  )),
                ]}
              </tr>
              <tr className="text-left even:bg-gray-100 odd:bg-white ">
                {[
                  <td className="border p-2" key={"amountByMonth"}>
                    {"Góp mỗi tháng"}
                  </td>,
                  ...intallmentPeriods.map((item, idx) => (
                    <td
                      className="border p-2 text-center"
                      key={"amountByMonth" + idx}
                    >
                      {Helper.moneyFormat(item.amountByMonth)}
                    </td>
                  )),
                ]}
              </tr>
              <tr className="text-left even:bg-gray-100 odd:bg-white ">
                {[
                  <td className="border p-2" key={"amountFee"}>
                    {"Phí chuyển đổi sang trả góp"}
                  </td>,
                  ...intallmentPeriods.map((item, idx) => (
                    <td
                      className="border p-2 text-center"
                      key={"amountFee" + idx}
                    >
                      {Helper.moneyFormat(item.amountFee)}
                    </td>
                  )),
                ]}
              </tr>
              <tr className="text-left even:bg-gray-100 odd:bg-white ">
                {[
                  <td className="border p-2" key={"amountFinal"}>
                    {"Tổng tiền mua trả góp"}
                  </td>,
                  ...intallmentPeriods.map((item, idx) => (
                    <td
                      className="border p-2 text-center"
                      key={"amountFinal" + idx}
                    >
                      {Helper.moneyFormat(item.amountFinal)}
                    </td>
                  )),
                ]}
              </tr>
              <tr className="text-left even:bg-gray-100 odd:bg-white ">
                {[
                  <td key={"subscribe"}>{""}</td>,
                  ...intallmentPeriods.map((item, idx) => (
                    <td className="p-2" key={"subscribe" + idx}>
                      <Button
                        onClick={() => handleSelectFin(item)}
                        className="flex cursor-pointer flex-col items-center justify-center rounded bg-white text-red-600 hover:bg-red-600 hover:text-white active:bg-red-600 border p-1.5 w-full"
                      >
                        <p className="text-sm">Chọn mua</p>
                      </Button>
                    </td>
                  )),
                ]}
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  } else {
    return (
      <div className=" text-center italic text-gray-400">
        {"Không tìm thấy kết quả phù hợp!"}
      </div>
    );
  }
};

export default AlePayPeriodTable;
