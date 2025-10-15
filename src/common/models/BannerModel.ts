import { BaseModelJson } from "../interfaces/BaseModelJson";
import { BannerJson } from "../types/Banner";
import BannerImageModel from "./BannerImageModel";
import BaseModel from "./BaseModel";

class BannerModel extends BaseModel implements BaseModelJson<BannerJson> {
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
  images: BannerImageModel[];

  constructor(json: BannerJson) {
    super();

    this.id = json.id || 0;
    this.mode = json.mode || 0;
    this.title = json.title || "";
    this.description = json.description || "";
    this.identifier = json.identifier || "";
    this.width = json.width || 0;
    this.height = json.height || 0;
    this.column_desktop = json.column_desktop || 0;
    this.column_mobile = json.column_mobile || 0;
    this.background_color = json.background_color || "";
    this.slide_autoplay = json.slide_autoplay || 0;
    this.slide_delay = json.slide_delay || 0;
    this.column_gap = json.column_gap || 0;
    this.row_gap = json.row_gap || 0;
    this.rounded_size = json.rounded_size || "";
    this.classname = json.classname || "";
    this.status = json.status || 0;

    this.images = json.images.map((i) => new BannerImageModel(i)) || [
      new BannerImageModel(BannerImageModel.getDefaultData()),
    ];
  }

  static getDefaultData(): BannerJson {
    return {
      id: 0,
      mode: 0,
      title: "",
      description: "",
      identifier: "",
      width: 0,
      height: 0,
      column_desktop: 0,
      column_mobile: 0,
      background_color: "",
      slide_autoplay: 0,
      slide_delay: 0,
      column_gap: 0,
      row_gap: 0,
      rounded_size: "",
      classname: "",
      status: 0,
      images: [],
    };
  }

  toJson(): BannerJson {
    return {
      id: this.id,
      mode: this.mode,
      title: this.title,
      description: this.description,
      identifier: this.identifier,
      width: this.width,
      height: this.height,
      column_desktop: this.column_desktop,
      column_mobile: this.column_mobile,
      background_color: this.background_color,
      slide_autoplay: this.slide_autoplay,
      slide_delay: this.slide_delay,
      column_gap: this.column_gap,
      row_gap: this.row_gap,
      rounded_size: this.rounded_size,
      classname: this.classname,
      status: this.status,
      images: this.images.map((i) => i.toJson()),
    };
  }
}

export default BannerModel;
