import { BannerImageJson } from "./BannerImage";
import { BaseCollectionJson } from "./BaseCollection";

type BannerJson = {
  id: number;
  mode: number;
  title: string;
  description: string;
  identifier: string;
  width: number;
  height: number;
  column_desktop: number;
  column_mobile: number;
  background_color: string;
  slide_autoplay: number;
  slide_delay: number;
  column_gap: number;
  row_gap: number;
  rounded_size: string;
  classname: string;
  status: number;
  images: BannerImageJson[];
};

type BannerCollectionJson = BaseCollectionJson<BannerJson>;

type FilterBanner = {
  id?: number;
  identifier?: string;
  identifier_list?: string;
};

export type { BannerJson, BannerCollectionJson, FilterBanner };
