type PriceRangeType = "select" | "slider";

type PriceRangeOption = {
  id: number;
  text: string;
  value: number[];
};

export type { PriceRangeOption, PriceRangeType };
