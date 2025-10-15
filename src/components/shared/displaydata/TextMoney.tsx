"use client";
import { NumericFormat } from "react-number-format";

const TextMoney = ({
  money,
  noSymbol,
}: {
  money: number | string;
  noSymbol?: boolean;
}) => {
  //can get value from setting
  const symbolPrefix = "";
  const symbolSuffix = " ₫";
  const thousandSeparator = ".";
  const decimalSeparator = ",";
  const decimalScale = 0;

  return (
    <NumericFormat
      prefix={typeof noSymbol !== "undefined" && noSymbol ? "" : symbolPrefix}
      suffix={typeof noSymbol !== "undefined" && noSymbol ? "" : symbolSuffix}
      value={money}
      displayType="text"
      thousandSeparator={thousandSeparator}
      decimalSeparator={decimalSeparator}
      decimalScale={decimalScale}
    />
  );
};

export default TextMoney;
