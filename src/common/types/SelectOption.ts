type SelectOptionColor =
  | "red"
  | "black"
  | "green"
  | "blue"
  | "yellow"
  | "orange"
  | "gray"
  | "purple"
  | "pink"
  | "cyan"
  | "purple"
  | "geekblue"
  | "magenta"
  | "volcano"
  | "gold"
  | "lime"
  | "white"
  | ""
  | "#ff7b7b";

type SelectOption = {
  value: number;
  label: string;
  parent_id?: number;
  color?: SelectOptionColor;
  disabled?: boolean;
  display_order?: number;
};

export type { SelectOption, SelectOptionColor };
