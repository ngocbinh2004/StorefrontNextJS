import PageBlock from "../contants/PageBlock";
import { BaseModelJson } from "../interfaces/BaseModelJson";
import { PageBlockDataTypeJson, PageBlockJson } from "../types/PageBlock";
import BaseModel from "./BaseModel";

class PageBlockModel extends BaseModel implements BaseModelJson<PageBlockJson> {
  page_id: number;
  id: number;
  mode: number;
  group_id: number;
  type: number;
  name: string;
  identifier: string;
  data: PageBlockDataTypeJson;
  class_name: string;
  display_order: number;
  is_mandatory: number;
  style: string;

  constructor(json: PageBlockJson) {
    super();

    this.page_id = json.page_id || 0;
    this.id = json.id || 0;
    this.mode = json.mode || 0;
    this.group_id = json.group_id || 0;
    this.type = json.type || 0;
    this.name = json.name || "";
    this.identifier = json.identifier || "";
    this.data = json.data || {};
    this.class_name = json.class_name || "";
    this.display_order = json.display_order || 0;
    this.is_mandatory = json.is_mandatory || 0;
    this.style = json.style || "";
  }

  static getDefaultData(): PageBlockJson {
    return {
      page_id: 0,
      id: 0,
      mode: PageBlock.MODE_PAGE,
      group_id: 0,
      type: 0,
      name: "",
      identifier: "",
      data: {},
      class_name: "",
      display_order: 0,
      is_mandatory: 0,
      style: "",
    };
  }

  toJson(): PageBlockJson {
    return {
      page_id: this.page_id,
      id: this.id,
      mode: this.mode,
      group_id: this.group_id,
      type: this.type,
      name: this.name,
      identifier: this.identifier,
      data: this.data,
      class_name: this.class_name,
      display_order: this.display_order,
      is_mandatory: this.is_mandatory,
      style: this.style,
    };
  }

  static getRoundedClass(roundedSize?: string): string {
    let roundedClass = "";

    if (typeof roundedSize === "string") {
      switch (roundedSize) {
        case "sm":
          roundedClass = "rounded-sm";
          break;
        case "default":
          roundedClass = "rounded";
          break;
        case "md":
          roundedClass = "rounded-md";
          break;
        case "lg":
          roundedClass = "rounded-lg";
          break;
        case "xl":
          roundedClass = "rounded-xl";
          break;
        case "2xl":
          roundedClass = "rounded-2xl";
          break;
        case "3xl":
          roundedClass = "rounded-md";
          break;
        case "full":
          roundedClass = "rounded-full";
          break;
        default:
          roundedClass = "";
          break;
      }
    }

    return roundedClass;
  }

  static getTextAlignClass(align?: string): string {
    let alignClass = "";

    if (typeof align === "string") {
      switch (align) {
        case "left":
          alignClass = "text-left";
          break;
        case "center":
          alignClass = "text-center";
          break;
        case "right":
          alignClass = "text-right";
          break;
      }
    }

    return alignClass;
  }

  static getTextSizeClass(size?: string): string {
    let sizeClass = "";

    if (typeof size === "string") {
      switch (size) {
        case "xs":
          sizeClass = "text-xs";
          break;
        case "sm":
          sizeClass = "text-sm";
          break;
        case "base":
          sizeClass = "text-base";
          break;
        case "lg":
          sizeClass = "text-lg";
          break;
        case "xl":
          sizeClass = "text-xl";
          break;
        case "2xl":
          sizeClass = "text-2xl";
          break;
        case "3xl":
          sizeClass = "text-3xl";
          break;
        case "4xl":
          sizeClass = "text-4xl";
          break;
        case "5xl":
          sizeClass = "text-5xl";
          break;
        case "6xl":
          sizeClass = "text-6xl";
          break;
        case "7xl":
          sizeClass = "text-7xl";
          break;
        case "8xl":
          sizeClass = "text-8xl";
          break;
        case "9xl":
          sizeClass = "text-9xl";
          break;
      }
    }

    return sizeClass;
  }
}

export default PageBlockModel;
