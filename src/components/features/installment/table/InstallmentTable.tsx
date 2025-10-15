"use client";
import InstallmentModel from "@/common/models/InstallmentModel";
import { InstallmentJson } from "@/common/types/Installment";
import Helper from "@/common/utils/helper";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

const InstallmentTable = ({
  items,
  isLoading,
  onSelectedInstallment,
}: {
  items: InstallmentJson[];
  isLoading: boolean;
  onSelectedInstallment: (item: InstallmentJson) => void;
}) => {
  const handleSelectFin = (item: InstallmentJson) => {
    onSelectedInstallment(item);
  };

  return (
    <>
      <div className="my-10 border-red-500">
        <div className="mb-4">
          <span className="block font-semibold">
            {"Bảng tính thông tin trả góp"}
          </span>
          <span className="block text-red-500 text-sm">
            {"* Bảng tính chỉ mang tính chất tham khảo"}
          </span>
        </div>
        <div className="overflow-x-auto">
          <Table isStriped aria-label="installment" removeWrapper>
            <TableHeader>
              {[
                <TableColumn key={"head"} style={{ width: "150px" }}>
                  {"CÔNG TY"}
                </TableColumn>,
                ...items.map((item, idx) => (
                  <TableColumn key={"head" + idx} className="text-right">
                    <span className="text-red-600 font-semibold text-2xs uppercase">
                      {InstallmentModel.getMerchantBank(item.merchant_id)
                        ?.name ?? "bank"}
                    </span>
                  </TableColumn>
                )),
              ]}
            </TableHeader>
            <TableBody isLoading={isLoading}>
              <TableRow>
                {[
                  <TableCell key={"price"}>{"Giá mua trả góp"}</TableCell>,
                  ...items.map((item, idx) => (
                    <TableCell
                      key={"key" + idx}
                      className="text-right font-bold"
                    >
                      {Helper.moneyFormat(item.price)}
                    </TableCell>
                  )),
                ]}
              </TableRow>
              <TableRow>
                {[
                  <TableCell key={"pre_paid_amount"}>
                    {"Số tiền trả trước"}
                  </TableCell>,
                  ...items.map((item, idx) => (
                    <TableCell
                      key={"pre_paid_amount" + idx}
                      className="text-right "
                    >
                      {Helper.moneyFormat(item.pre_paid_amount)}
                    </TableCell>
                  )),
                ]}
              </TableRow>
              <TableRow>
                {[
                  <TableCell key={"tenor"}>{"Kỳ hạn"}</TableCell>,
                  ...items.map((item, idx) => (
                    <TableCell key={"tenor" + idx} className="text-right">
                      {item.tenor} {"Tháng"}
                    </TableCell>
                  )),
                ]}
              </TableRow>
              <TableRow>
                {[
                  <TableCell key={"payment_per_month"}>
                    {"Góp mỗi tháng"}
                  </TableCell>,
                  ...items.map((item, idx) => (
                    <TableCell
                      key={"payment_per_month" + idx}
                      className="text-right font-bold"
                    >
                      {Helper.moneyFormat(item.payment_per_month)}
                    </TableCell>
                  )),
                ]}
              </TableRow>
              <TableRow>
                {[
                  <TableCell key={"interest_rate"}>{"Lãi suất"}</TableCell>,
                  ...items.map((item, idx) => (
                    <TableCell
                      key={"interest_rate" + idx}
                      className="text-right font-bold"
                    >
                      {Helper.numberFormat(item.interest_rate * 100)}
                      {"%"}
                    </TableCell>
                  )),
                ]}
              </TableRow>
              <TableRow>
                {[
                  <TableCell key={"total_price_after_installment"}>
                    {"Tổng tiền phải trả"}
                  </TableCell>,
                  ...items.map((item, idx) => (
                    <TableCell
                      key={"total_price_after_installment" + idx}
                      className="text-right"
                    >
                      {Helper.moneyFormat(item.total_price_after_installment)}
                    </TableCell>
                  )),
                ]}
              </TableRow>
              <TableRow>
                {[
                  <TableCell key={"total_interest"}>
                    {"Chênh lệch với giá mua trả thẳng"}
                  </TableCell>,
                  ...items.map((item, idx) => (
                    <TableCell
                      key={"total_interest" + idx}
                      className="text-right"
                    >
                      {Helper.moneyFormat(item.total_interest)}
                    </TableCell>
                  )),
                ]}
              </TableRow>
              <TableRow>
                {[
                  <TableCell key={"subscribe"}>{""}</TableCell>,
                  ...items.map((item, idx) => (
                    <TableCell key={"subscribe" + idx}>
                      <div
                        onClick={() => handleSelectFin(item)}
                        className="flex cursor-pointer flex-col items-center justify-center rounded bg-red-600 p-1.5"
                      >
                        <p className="text-sm text-white">Chọn mua</p>
                        <p className="text-xs text-white">Duyệt online</p>
                      </div>
                    </TableCell>
                  )),
                ]}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default InstallmentTable;
