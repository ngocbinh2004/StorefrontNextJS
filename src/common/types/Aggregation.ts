type AggregationBucket = {
  id: string;
  name: string;
  count: number;
  more_info: string;
};

type AggregationBucketStats = {
  count: number;
  min: number;
  max: number;
  avg: number;
  sum: number;
};

type Aggregation = {
  type: string;
  name: string;
  display_order: number;
  count_other: number;
  stats_bucket: AggregationBucketStats;
  buckets: AggregationBucket[];
};

export type { Aggregation, AggregationBucket };
