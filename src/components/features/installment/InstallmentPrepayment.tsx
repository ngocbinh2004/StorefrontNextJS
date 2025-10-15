"use client";
import React, { useCallback, useMemo } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import InstallmentModel from "@/common/models/InstallmentModel";
import { PrepaymentJson } from "@/common/types/Installment";
import Helper from "@/common/utils/helper";

const InstallmentPrepayment = ({
  amount,
  onChange,
}: {
  amount: number;
  onChange: (value: number) => void;
}) => {
  const values: PrepaymentJson[] = useMemo(() => {
    let items: any[] = [
      {
        value: 50,
        label: `${50}%  (${Helper.moneyFormat((50 * amount) / 100)})`,
      },
      {
        value: 60,
        label: `${60}%  (${Helper.moneyFormat((60 * amount) / 100)})`,
      },
      {
        value: 70,
        label: `${70}%  (${Helper.moneyFormat((70 * amount) / 100)})`,
      },
    ];

    return items;
  }, [amount]);

  return (
    <Select
      label={"Chọn mức trả trước"}
      onChange={(e: any) => {
        onChange(e.target.value);
      }}
      size="sm"
      variant="bordered"
    >
      {values.map((item) => (
        <SelectItem
          key={item.value}
          value={item.value}
          className=" text-blue-600 font-semibold"
        >
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default InstallmentPrepayment;
