type ProductFilterOptionValue = string | number;

type ProductFilterSelectionDetailItem = {
  value: ProductFilterOptionValue;
  label: string;
};

type ProductFilterOption = {
  value: ProductFilterOptionValue;
  label: string;
  image_url: string;
  display_order: number;
};

type ProductFilterJson = {
  id: number;
  label: string;
  type: number;
  style: number;
  object_id: number;
  limit_selection: number;
  selection_detail: ProductFilterSelectionDetailItem[];
  options: ProductFilterOption[];
  display_order: number;
};

export type {
  ProductFilterJson,
  ProductFilterSelectionDetailItem,
  ProductFilterOption,
  ProductFilterOptionValue,
};
