import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { CustomerCartJson } from "../types/CustomerCart";
import CustomerCartModel from "../models/CustomerCartModel";
import { CustomerJson } from "../types/Customer";
import CustomerModel from "../models/CustomerModel";
import { StoreJson } from "../types/Store";
import { ShippingPriceJson } from "../types/ShippingPrice";
import ShippingPriceModel from "../models/ShippingPriceModel";
import { PromotionCodeResultJson } from "../types/PromotionCode";
import PromotionCodeResultModel from "../models/PromotionCodeResultModel";

type CheckoutStore = {
  cart: CustomerCartJson;
  setCart: (v: CustomerCartJson) => void;
  emptyCart: () => void;
  user: CustomerJson;
  setUser: (v: CustomerJson) => void;
  stores: StoreJson[];
  setStores: (v: StoreJson[]) => void;
  shippingPrice: ShippingPriceJson;
  setShippingPrice: (v: ShippingPriceJson) => void;
  promotionCodeResult: PromotionCodeResultJson;
  setPromotionCodeResult: (v: PromotionCodeResultJson, v2: number) => void;
};

//init store data
let store: StateCreator<CheckoutStore> = (set, get) => ({
  cart: CustomerCartModel.getDefaultData(),
  setCart: (cart) => set((state) => ({ ...state, cart })),
  emptyCart: () =>
    set((state) => ({
      ...state,
      cart: { ...CustomerCartModel.getDefaultData() },
    })),
  user: CustomerModel.getDefaultData(),
  setUser: (user) => set((state) => ({ ...state, user })),
  stores: [],
  setStores: (stores) => set((state) => ({ ...state, stores })),
  shippingPrice: ShippingPriceModel.getDefaultData(),
  setShippingPrice: (shippingPrice) =>
    set((state) => ({
      ...state,
      shippingPrice,
      cart: { ...get().cart, price_shipping: shippingPrice.price_shipping },
    })),
  promotionCodeResult: PromotionCodeResultModel.getDefaultData(),
  setPromotionCodeResult: (promotionCodeResult, priceDiscount) =>
    set((state) => ({
      ...state,
      promotionCodeResult,
      cart: { ...get().cart, price_discount: priceDiscount },
    })),
});

//create store
const useCheckoutStore = create(store);

export default useCheckoutStore;
