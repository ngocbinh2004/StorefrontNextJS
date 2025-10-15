import { BaseCollectionJson } from "./BaseCollection";
import { Filter } from "./Filter";

type AttributeGroupJson = {
  attribute_category_id: number;
  id: number;
  name: string;
  description: string;
  status: number;
  display_order: number;
};

type AttributeGroupCollectionJson = BaseCollectionJson<AttributeGroupJson>;

type FilterAttributeGroup = Filter & {
  id: number;
  attribute_category_id: number;
};

export type {
  AttributeGroupJson,
  AttributeGroupCollectionJson,
  FilterAttributeGroup,
};
