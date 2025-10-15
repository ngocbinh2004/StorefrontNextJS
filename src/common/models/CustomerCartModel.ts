import { BaseModelJson } from "../interfaces/BaseModelJson";
import {
  CustomerCartJson,
  CustomerCartItem,
  CartPrice,
} from "../types/CustomerCart";
import BaseModel from "./BaseModel";

class CustomerCartModel
  extends BaseModel
  implements BaseModelJson<CustomerCartJson>
{
  uuid: string;
  details: CustomerCartItem[];
  price_sell: number;
  price_shipping: number;
  price_discount: number;
  date_created: number;
  date_modified: number;

  constructor(json: CustomerCartJson) {
    super();

    this.uuid = json.uuid || "";
    this.details = json.details || [];
    this.price_sell = json.price_sell || 0;
    this.price_shipping = json.price_shipping || 0;
    this.price_discount = json.price_discount || 0;
    this.date_created = json.date_created || 0;
    this.date_modified = json.date_modified || 0;
  }

  static getDefaultData(): CustomerCartJson {
    return {
      uuid: "",
      details: [],
      price_sell: 0,
      price_shipping: 0,
      price_discount: 0,
      date_created: 0,
      date_modified: 0,
    };
  }

  toJson(): CustomerCartJson {
    return {
      uuid: this.uuid,
      details: this.details,
      price_sell: this.price_sell,
      price_shipping: this.price_shipping,
      price_discount: this.price_discount,
      date_created: this.date_created,
      date_modified: this.date_modified,
    };
  }

  getQuantity(): number {
    return this.details.reduce((acc, obj) => {
      return acc + obj.quantity;
    }, 0);
  }

  isNotInit(): boolean {
    return this.uuid.length === 0;
  }

  isEmpty(): boolean {
    return this.isNotInit() || this.details.length === 0;
  }

  static calculatePrices(cart: CustomerCartJson): CartPrice {
    let priceSell = 0;
    //currently not use ^^!
    let priceHandling = 0;
    let priceFinal = 0;
    let quantity = 0;

    let priceShipping = cart.price_shipping;
    let priceDiscount = cart.price_discount;

    //calculate subtotal & total quantity
    cart.details.forEach((item) => {
      const itemSubTotal = item.price * item.quantity;
      priceSell += itemSubTotal;
      quantity += item.quantity;
    });

    priceFinal = priceSell + priceHandling - priceDiscount + priceShipping;
    priceFinal = priceFinal >= 0 ? priceFinal : 0;

    return {
      price_sell: priceSell,
      price_handling: priceHandling,
      price_discount: priceDiscount,
      price_shipping: priceShipping,
      price_final: priceFinal,
      quantity,
    };
  }

  static getItemImageUrl(item: CustomerCartItem): string {
    return item.image;
  }
}

export default CustomerCartModel;
