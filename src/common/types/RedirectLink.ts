import { BaseCollectionJson } from "./BaseCollection";
import { Filter } from "./Filter";

type RedirectLinkJson = {
  id: number;
  source_type: number;
  source_url: string;
  redirect_url: string;
  redirect_type: number;
  status: number;
};

type RedirectLinkCollectionJson = BaseCollectionJson<RedirectLinkJson>;

type FilterRedirectLink = Filter & {
  source_url: string;
};

export type {
  FilterRedirectLink,
  RedirectLinkCollectionJson,
  RedirectLinkJson,
};
