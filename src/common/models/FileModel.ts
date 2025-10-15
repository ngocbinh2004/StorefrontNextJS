import dayjs from "dayjs";

import BaseModel from "./BaseModel";

import type { FileJson, ThumbnailAction } from "@/common/types/File";
import { BaseModelJson } from "../interfaces/BaseModelJson";

class FileModel extends BaseModel implements BaseModelJson<FileJson> {
  company_id: number;
  creator_id: number;
  id: number;
  directory_id: number;
  title: string;
  description: string;
  md5_hash: string;
  file_path: string;
  object_type: number;
  object_id: number;
  width: number;
  height: number;
  randomcode: string;
  extension: string;
  size_in_byte: number;
  is_directory: number;
  date_created: number;
  date_modified: number;
  url: string;
  origin?: string;
  ip_address?: string;

  constructor(json: FileJson) {
    super();

    this.company_id = json.company_id || 0;
    this.creator_id = json.creator_id || 0;
    this.id = json.id || 0;
    this.directory_id = json.directory_id || 0;
    this.title = json.title || "";
    this.description = json.description || "";
    this.is_directory = json.is_directory || 0;
    this.md5_hash = json.md5_hash || "";
    this.file_path = json.file_path || "";
    this.width = json.width || 0;
    this.height = json.height || 0;
    this.object_type = json.object_type || 0;
    this.object_id = json.object_id || 0;
    this.randomcode = json.randomcode || "";
    this.extension = json.extension || "";
    this.size_in_byte = json.size_in_byte || 0;
    this.date_created = json.date_created || 0;
    this.date_modified = json.date_modified || 0;
    this.url = json.url || "";
    this.origin = json.origin || "";
    this.ip_address = json.ip_address || "";
  }

  static getDefaultData(): FileJson {
    return {
      company_id: 0,
      creator_id: 0,
      id: 0,
      directory_id: 0,
      title: " ",
      description: "",
      is_directory: 0,
      md5_hash: "",
      file_path: "",
      width: 0,
      height: 0,
      object_type: 0,
      object_id: 0,
      randomcode: "",
      extension: "",
      size_in_byte: 0,
      date_created: 0,
      date_modified: 0,
      url: "",
      origin: "",
      ip_address: "",
    };
  }

  toJson(): FileJson {
    return {
      company_id: this.company_id,
      creator_id: this.creator_id,
      id: this.id,
      directory_id: this.directory_id,
      title: this.title,
      description: this.description,
      is_directory: this.is_directory,
      md5_hash: this.md5_hash,
      file_path: this.file_path,
      width: this.width,
      height: this.height,
      object_type: this.object_type,
      object_id: this.object_id,
      randomcode: this.randomcode,
      extension: this.extension,
      size_in_byte: this.size_in_byte,
      date_created: this.date_created,
      date_modified: this.date_modified,
      url: this.url,
      origin: this.origin,
      ip_address: this.ip_address,
    };
  }

  static getImageExtensions(): string[] {
    return ["jpg", "png", "jpeg", "gif"];
  }

  isImage(): boolean {
    return FileModel.getImageExtensions().includes(this.extension);
  }

  static getThumbnailFromUrl(
    url: string,
    width?: number,
    height?: number,
    action?: ThumbnailAction
  ): string {
    if (url.length > 0) {
      let myurl = `${process.env.NEXT_PUBLIC_THUMBNAIL_BASE_URL}/upload/w_${
        typeof width !== "undefined" && !isNaN(width) && width > 0 ? width : 200
      },h_${
        typeof height !== "undefined" && !isNaN(height) && height > 0
          ? height
          : 200
      }${
        typeof action !== "undefined" && action === "crop" ? ",c_1" : ""
      }/${url}`;

      return myurl;
    }

    return "";
  }

  getThumbnail(
    width?: number,
    height?: number,
    action?: ThumbnailAction
  ): string {
    //only return IMAGE for imagetype
    if (this.isImage()) {
      return FileModel.getThumbnailFromUrl(this.url, width, height, action);
    } else {
      return "";
    }
  }

  getThumbnailSquare(size: number): string {
    return this.getThumbnail(size, size, "crop");
  }
}

export default FileModel;
