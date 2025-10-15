import { BaseModelJson } from "../interfaces/BaseModelJson";
import { BannerImageJson } from "../types/BannerImage";
import BaseModel from "./BaseModel";
import FileModel from "./FileModel";

class BannerImageModel
  extends BaseModel
  implements BaseModelJson<BannerImageJson>
{
  banner_id: number;
  id: number;
  screen_mode: number;
  link: string;
  alt_text: string;
  title: string;
  file_id: number;
  display_order: number;
  status: number;
  file: FileModel;

  constructor(json: BannerImageJson) {
    super();

    this.banner_id = json.banner_id || 0;
    this.id = json.id || 0;
    this.screen_mode = json.screen_mode || 0;
    this.link = json.link || "";
    this.alt_text = json.alt_text || "";
    this.title = json.title || "";
    this.file_id = json.file_id || 0;
    this.display_order = json.display_order || 0;
    this.status = json.status || 0;
    this.file = new FileModel(json.file || FileModel.getDefaultData());
  }

  static getDefaultData(): BannerImageJson {
    return {
      banner_id: 0,
      id: 0,
      screen_mode: 0,
      link: "",
      alt_text: "",
      title: "",
      file_id: 0,
      display_order: 0,
      status: 0,
      file: new FileModel(FileModel.getDefaultData()),
    };
  }

  toJson(): BannerImageJson {
    return {
      banner_id: this.banner_id,
      id: this.id,
      screen_mode: this.screen_mode,
      link: this.link,
      alt_text: this.alt_text,
      title: this.title,
      file_id: this.file_id,
      display_order: this.display_order,
      status: this.status,
      file: this.file.toJson(),
    };
  }
}

export default BannerImageModel;
