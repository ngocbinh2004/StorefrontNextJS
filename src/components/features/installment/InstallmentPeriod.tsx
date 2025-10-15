"use client";
import React, { useCallback } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import InstallmentModel from "@/common/models/InstallmentModel";

const InstallmentPeriod = ({
  onChange,
}: {
  onChange: (value: number) => void;
}) => {
  return (
    <Select
      label={"Chọn kỳ hạn"}
      onChange={(e: any) => {
        onChange(e.target.value);
      }}
      size="sm"
      variant="bordered"
    >
      {InstallmentModel.getPeriod().map((item) => (
        <SelectItem
          key={item.id}
          value={item.id}
          className="text-blue-600 font-semibold"
        >
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default InstallmentPeriod;
