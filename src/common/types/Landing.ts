import { BaseCollectionJson } from "./BaseCollection";

type LandingJson = {
  id: number;
  title: string;
  content: string;
  status: number;
  seo_url: string;
  is_mandatory: number;
};

type LandingCollectionJson = BaseCollectionJson<LandingJson>;

export type { LandingCollectionJson, LandingJson };
