import { BaseCollectionJson } from "./BaseCollection";
import { FileJson } from "./File";
import { Filter } from "./Filter";

type BannerImageJson = {
  banner_id: number;
  id: number;
  screen_mode: number;
  link: string;
  alt_text: string;
  title: string;
  file_id: number;
  display_order: number;
  status: number;
  file: FileJson;
};

type BannerImageCollectionJson = BaseCollectionJson<BannerImageJson>;

export type { BannerImageJson, BannerImageCollectionJson };
