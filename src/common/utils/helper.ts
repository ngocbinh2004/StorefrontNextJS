import { CSSProperties } from "react";
import { ProductJson } from "../types/Product";
import { ProductCardJson } from "../types/ProductCard";

class Helper {
  static moneyFormat(value: number): string {
    let output = "";

    //languagecode-countrycode:
    //languagecode: full list @ https://www.w3schools.com/tags/ref_language_codes.asp
    //countrycode: full list @ https://www.w3schools.com/tags/ref_country_codes.asp
    const locale = "vi-VN";

    //full currencylist at https://www.currency-iso.org/en/home/tables/table-a1.html
    const currency = "VND";

    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    });

    //formating data
    output = formatter.format(value);

    return output;
  }

  static numberFormat(value: number): string {
    let output = "";

    const locale = "vi-VN";
    const formatter = new Intl.NumberFormat(locale);

    //formating data
    output = formatter.format(value);

    return output;
  }

  static round(number: number, precision: number) {
    var shift = (number: number, precision: number) => {
      var numArray = ("" + number).split("e");
      return +(
        numArray[0] +
        "e" +
        (numArray[1] ? +numArray[1] + precision : precision)
      );
    };
    return shift(Math.round(shift(number, +precision)), -precision);
  }

  static isNumber(n: string) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  }

  static fileExtension(filename: string) {
    if (!filename) return "";
    var ext = (/[^./\\]*$/.exec(filename) || [""])[0];
    return ext.toLowerCase();
  }

  static codau2khongdau(str: string): string {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  }

  static checkDateString(date: number) {
    return date.toString().length < 8 ? "0" + date.toString() : date.toString();
  }

  static checkTimeString(time: number) {
    return time.toString().length < 4 ? "0" + time.toString() : time.toString();
  }

  static isJsonParsable(text: string): boolean {
    try {
      JSON.parse(text);
    } catch (e) {
      return false;
    }
    return true;
  }

  static cleanTagHtml(text: string, limit = 0) {
    const content = text.replace(/<[^>]*>/g, "");
    if (limit > 0) {
      return content.slice(0, limit);
    } else {
      return content;
    }
  }

  static strToAlias(str: string): string {
    str += "";
    str = str.toLowerCase();
    str = this.strStripedUnicode(str);
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,
      "-",
    );

    str = str.replace(/-+-/g, "-");
    str = str.replace(/^\-+|\-+$/g, "");

    return str;
  }

  static strStripedUnicode(str: string): string {
    str += "";
    str = str.replace(/a|à|á|ả|ã|ạ|ă|ằ|ắ|ẳ|ẵ|ặ|â|ầ|ấ|ẩ|ẫ|ậ/g, "a");
    str = str.replace(/A|À|Á|Ả|Ã|Ạ|Ă|Ằ|Ắ|Ẳ|Ẵ|Ặ|Â|Ầ|Ấ|Ẩ|Ẫ|Ậ/g, "A");
    str = str.replace(/e|è|é|ẻ|ẻ|ẹ|ê|ề|ế|ể|ễ|ệ/g, "e");
    str = str.replace(/E|È|É|Ẻ|Ẽ|Ẹ|Ê|Ề|Ế|Ể|Ễ|Ệ/g, "E");
    str = str.replace(/i|ì|í|ỉ|ĩ|ị/g, "i");
    str = str.replace(/I|Ì|Í|Ỉ|Ĩ|Ị/g, "I");
    str = str.replace(/o|ò|ó|ỏ|õ|ọ|ô|ồ|ố|ổ|ỗ|ộ|ơ|ờ|ớ|ở|ỡ|ợ/g, "o");
    str = str.replace(/O|Ò|Ó|Ỏ|Õ|Ọ|Ô|Ồ|Ố|Ổ|Ỗ|Ộ|Ơ|Ờ|Ớ|Ở|Ỡ|Ợ/g, "O");
    str = str.replace(/u|ù|ú|ủ|ũ|ụ|ư|ừ|ứ|ử|ữ|ự/g, "u");
    str = str.replace(/U|Ù|Ú|Ủ|Ũ|Ụ|Ư|Ừ|Ứ|Ử|Ữ|Ự/g, "U");
    str = str.replace(/y|ỳ|ý|ỷ|ỹ|ỵ/g, "y");
    str = str.replace(/Y|Ỳ|Ý|Ỷ|Ỹ|Ỵ/g, "Y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/Đ/g, "D");
    return str;
  }

  static percentDiscount(price: number, special: number) {
    return Math.round(((price - special) / price) * 100) + "%";
  }

  static convertString2CSSPropObject(stringStyle: string): CSSProperties {
    return stringStyle.split(";").reduce((acc: any, style: string) => {
      const [property, value] = style.split(":").map((s) => s.trim());
      if (property && value) {
        acc[property] = value;
      }
      return acc;
    }, {});
  }

  static checkVisibility(
    item: ProductCardJson | ProductJson,
    visibility: number,
  ): boolean {
    return item.visibility.includes(visibility);
  }

  static checkProductVisibility(
    items: ProductCardJson[],
    visibility: number,
  ): ProductCardJson[] {
    let newItems: ProductCardJson[] = [];

    for (let i = 0; i < items.length; i++) {
      let product: ProductCardJson = items[i];
      if (this.checkVisibility(product, visibility)) {
        newItems.push({ ...product });
      }
    }

    return newItems;
  }

  static detectingCSRMobileDevices() {
    const minWidth = 932; // Minimum width for desktop devices
    let isMobile = false;

    if (typeof window !== "undefined") {
      isMobile = window.innerWidth <= minWidth || screen.width <= minWidth;
    }

    return isMobile;
  }

  static compareStrings(s1: string, s2: string) {
    let isSame = false;

    if (s1.length === s2.length) {
      isSame = true;
    }

    return isSame;
  }
}

export default Helper;
