"use client";

import { useTranslation } from "@/app/i18n/client";
import CartNextApi from "@/common/api/next/CartNextApi";
import OrderNextApi from "@/common/api/next/OrderNextApi";
import PaymentMomoNextApi from "@/common/api/next/PaymentMomoNextApi";
import PaymentOnePayNextApi from "@/common/api/next/PaymentOnePayNextApi";
import Checkout from "@/common/contants/Checkout";
import Order from "@/common/contants/Order";
import OrderModel from "@/common/models/OrderModel";
import CustomerCartModel from "@/common/models/CustomerCartModel";
import { CheckoutForm, CheckoutRequest } from "@/common/types/Checkout";
import { StoreJson } from "@/common/types/Store";
import { CustomerJson } from "@/common/types/Customer";
import useCheckoutStore from "@/common/zustands/useCheckoutStore";
import ToastContentList from "@/components/toast/ToastContentList";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Sticky from "react-sticky-el";

import CheckoutCart from "./CheckoutCart";
import CheckoutNav from "./CheckoutNav";
import CheckoutPricingSummary from "./CheckoutPricingSummary";
import CheckoutFormDelivery from "./form/CheckoutFormDelivery";
import CheckoutFormPayment from "./form/CheckoutFormPayment";
import CheckoutFormPromotionCode from "./form/CheckoutFormPromotionCode";
import { CompanySettingContext } from "@/common/contexts/CompanySettingContextProvider";
import { useContext } from "react";
import ShoppingCartEmpty from "../(default)/shopping-cart/ShoppingCartEmpty";

const CheckoutContainer = ({
  loggedUser,
  allStores,
}: {
  loggedUser: CustomerJson;
  allStores: StoreJson[];
}) => {
  const router = useRouter();
  useTranslation("vn", ["checkout"]);

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);

  const [cart, setCart, emptyCart, promotionCodeResult] = useCheckoutStore(
    (state) => [
      state.cart,
      state.setCart,
      state.emptyCart,
      state.promotionCodeResult,
    ]
  );

  const [setUser] = useCheckoutStore((state) => [state.setUser]);
  const [setStores] = useCheckoutStore((state) => [state.setStores]);

  const calculatedData = useMemo(
    () => CustomerCartModel.calculatePrices(cart),
    [cart]
  );

  //get settting
  const setting = useContext(CompanySettingContext);
  const defaultStoreId = +setting.website_order_default_store;

  //for createing
  const [processing, setProcessing] = useState(false);
  const [checkoutErrors, setCheckoutErrors] = useState<string[]>([]);

  const [fieldErrors, setFieldErrors] = useState<FieldErrors<CheckoutForm>>({});
  const methods = useForm<CheckoutForm>({
    defaultValues: {
      delivery_type: "pickup",
      contact_email: loggedUser.email,

      billing_full_name: loggedUser.full_name,
      billing_gender: Checkout.GENDER_FEMALE,
      billing_phone: loggedUser.phone,
      billing_address: "",
      billing_region_id: 0,
      billing_sub_region_id: 0,
      billing_sub_sub_region_id: 0,

      shipping_is_same_billing: 1,
      shipping_full_name: "",
      shipping_gender: 0,
      shipping_phone: "",
      shipping_address: "",
      shipping_region_id: 0,
      shipping_sub_region_id: 0,
      shipping_sub_sub_region_id: 0,

      promotion_code: "",
      pickup_store_id: 0,
      payment_method: Checkout.PAYMENT_METHOD_COD,
    },
  });

  const onPaymentSubmit = useCallback(
    async (myOrder: OrderModel) => {
      let redirectUrl = `/order-success/${myOrder.hash_key}`;

      switch (myOrder.payment_method.method) {
        case Checkout.PAYMENT_METHOD_MOMO:
          const myPaymentMomo = await PaymentMomoNextApi.add({
            order_id: myOrder.id,
          });

          if (
            Number(myPaymentMomo.result_code) === 0 &&
            myPaymentMomo.pay_url.length > 0
          ) {
            redirectUrl = myPaymentMomo.pay_url;
          }
          break;

        case Checkout.PAYMENT_METHOD_COD:
        case Checkout.PAYMENT_METHOD_VNPAY:
        case Checkout.PAYMENT_METHOD_MONEY_TRANSFER:
          redirectUrl = `/order-success/${myOrder.hash_key}`;
      }

      router.replace(redirectUrl);
    },
    [router]
  );

  const onSubmit = useCallback(
    async (formData: CheckoutForm) => {
      //clear offline error
      setFieldErrors({});
      setCheckoutErrors([]);
      setProcessing(true);

      //prepare data
      const data: CheckoutRequest = {
        ...formData,
        promotion_code: promotionCodeResult.code,
        ...calculatedData,
        store_id:
          formData.delivery_type == Checkout.DELIVERY_TYPE_SHIPPING
            ? defaultStoreId
            : 0,
      };

      const newOrder = await OrderNextApi.add(data);
      setProcessing(false);

      if (newOrder.hasError()) {
        setCheckoutErrors(newOrder.error.errors);
        //show error
        toast.error(
          <ToastContentList
            items={newOrder.error.errors}
            translate_prefix="checkout:form.error"
          />
        );
      } else {
        onPaymentSubmit(newOrder);
        emptyCart();
      }
    },
    [
      promotionCodeResult.code,
      calculatedData,
      onPaymentSubmit,
      emptyCart,
      defaultStoreId,
    ]
  );

  const getCartDetail = useCallback(async () => {
    setLoading(true);
    const myEnrichedCart = await CartNextApi.getDetail();
    setLoading(false);
    if (myEnrichedCart.hasError()) {
      setErrors(myEnrichedCart.error.errors);
    } else {
      setCart(myEnrichedCart.toJson());
    }
  }, [setCart]);

  useEffect(() => {
    getCartDetail();
  }, [getCartDetail]);

  useEffect(() => {
    setUser(loggedUser);
  }, [loggedUser, setUser]);

  useEffect(() => {
    setStores(allStores);
  }, [allStores, setStores]);

  return (
    <div className="container h-full antialiased">
      <div className="px-2 lg:px-0">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit, (err) =>
              setFieldErrors(err)
            )}
          >
            <div className="flex flex-col h-full max-h-[796px] gap-8 lg:flex-row">
              {cart.details.length > 0 ? (
                <section className="basis-3/5">
                  <CheckoutNav />
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <Spinner />
                    </div>
                  ) : (
                    <div className="space-y-10">
                      <CheckoutFormDelivery />
                      <CheckoutFormPayment />

                      <Button
                        isLoading={processing}
                        size="lg"
                        color="primary"
                        type="submit"
                        className="w-full"
                      >
                        Thanh toán
                      </Button>
                    </div>
                  )}
                </section>
              ) : null}

              {loading ? (
                <div></div>
              ) : cart.details.length > 0 ? (
                <section className="h-full p-4 bg-gray-100">
                  <div className="overflow-auto h-full max-h-[535px]">
                    <CheckoutCart />
                  </div>
                  <Sticky stickyClassName="mt-4">
                    <CheckoutFormPromotionCode />
                    <CheckoutPricingSummary />
                  </Sticky>
                </section>
              ) : (
                <div className="flex items-center justify-center w-full h-full p-4 mt-8 bg-gray-100">
                  <ShoppingCartEmpty />
                </div>
              )}
            </div>
          </form>
        </FormProvider>
        <Toaster toastOptions={{ success: { duration: 1000 } }} />
      </div>
    </div>
  );
};

export default CheckoutContainer;
