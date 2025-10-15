import { BaseCollectionJson } from "./BaseCollection";
import { FileJson } from "./File";
import { Filter } from "./Filter";

type AttributeJson = {
  attribute_group_id: number;
  id: number;
  name: string;
  type: number;
  description: string;
  options: string;
  status: number;
  display_order: number;
  allow_web_filter: number;
  default_show: number;
};

type AttributeCollectionJson = BaseCollectionJson<AttributeJson>;

type FilterAttribute = Filter & {
  id: number;
  attribute_group_id: number;
};

export type { AttributeJson, AttributeCollectionJson, FilterAttribute };
