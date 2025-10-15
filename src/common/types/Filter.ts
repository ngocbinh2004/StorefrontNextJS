type FilterValue = number | string;

type Filter = {
  page: FilterValue;
  limit: FilterValue;
  sortby: FilterValue;
  sorttype: FilterValue;
};

export type { Filter, FilterValue };
