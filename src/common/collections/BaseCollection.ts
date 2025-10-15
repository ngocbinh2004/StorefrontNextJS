import { BaseModelJson } from "@/common/interfaces/BaseModelJson";
import { BaseCollectionJson } from "@/common/types/BaseCollection";
import ApiError from "../api/ApiError";
import { Aggregation } from "../types/Aggregation";

// Generic Type "M" (Model) implements BaseModelJson Interface, so that
// all model will have "toJson()" method so that it can be used in collection.toJson() method

// Generic Type "J" (Collection Json) extends BaseCollectionJson, so that
// all collection will have items, total, currentpage, limit property
// for used in fromJson

abstract class BaseCollection<
  MJson,
  M extends BaseModelJson<MJson>,
  J extends BaseCollectionJson<MJson>
> {
  items: M[];
  total: number;
  currentpage: number;
  limit: number;
  error: ApiError;
  aggs?: Aggregation[];

  constructor(json?: J) {
    this.items = [];
    this.total = 0;
    this.currentpage = 0;
    this.limit = 0;
    this.error = new ApiError({ statusCode: 0, errors: [] });

    if (typeof json !== "undefined" && json) {
      this.fromJson(json);
    }
  }

  abstract itemsFromJson(jsonItems: MJson[]): M[];

  fromJson(json: J) {
    this.total =
      typeof json.total === "string" ? parseInt(json.total) : json.total;
    this.currentpage = json.currentpage;
    this.limit = json.limit;
    this.items = this.itemsFromJson(json.items);
    this.aggs = json.aggs;
  }

  toJson(): J {
    return {
      total: this.total,
      currentpage: this.currentpage,
      limit: this.limit,
      items: this.items.map((item) => item.toJson()),
      aggs: this.aggs,
    } as J;
  }

  withError(error: ApiError) {
    this.items = [];
    this.total = 0;
    this.currentpage = 1;
    this.limit = 0;
    this.error = error;
  }

  hasError() {
    return (
      this.error != null &&
      this.error.errors != null &&
      this.error.errors.length > 0
    );
  }
}

export default BaseCollection;
