import { Aggregation } from "./Aggregation";

type BaseCollectionJson<ModelJson> = {
  items: ModelJson[];
  total: number;
  currentpage: number;
  limit: number;

  aggs?: Aggregation[];
};

export type { BaseCollectionJson };
