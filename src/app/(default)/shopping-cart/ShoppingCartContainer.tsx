"use client";

import CartNextApi from "@/common/api/next/CartNextApi";
import CustomerCartModel from "@/common/models/CustomerCartModel";
import TextMoney from "@/components/shared/displaydata/TextMoney";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ShoppingCartEmpty from "./ShoppingCartEmpty";
import ShoppingCartItem from "./ShoppingCartItem";
import useCheckoutStore from "@/common/zustands/useCheckoutStore";

const ShoppingCartContainer = () => {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);

  const [processing, setProcessing] = useState(false);
  const [cart, setCart] = useCheckoutStore((state) => [
    state.cart,
    state.setCart,
  ]);

  const calculatedData = useMemo(
    () => CustomerCartModel.calculatePrices(cart),
    [cart]
  );

  const getCartDetail = useCallback(async () => {
    setLoading(true);
    const myCart = await CartNextApi.getDetail();
    setLoading(false);
    if (myCart.hasError()) {
      setErrors(myCart.error.errors);
    } else {
      setCart(myCart.toJson());
    }
  }, [setCart]);

  const onChangeQuantity = useCallback(
    async (product_variant_id: number, quantity: number) => {
      const backupCart = { ...cart };

      //optimistic, update cart in client ui first
      setCart({
        ...cart,
        details: cart.details.map((i) =>
          i.product_variant_id === product_variant_id ? { ...i, quantity } : i
        ),
      });

      setProcessing(true);
      const updatedCart = await CartNextApi.editCartItem({
        product_variant_id,
        quantity,
      });
      setProcessing(false);

      if (updatedCart.hasError()) {
        toast.error("Có lỗi khi lưu thông tin");
        //rollback
        setCart(backupCart);
      } else {
        //nothing
        toast.success("Thông tin đã được lưu");

        //remove on delete
        if (quantity <= 0) {
          setCart({
            ...cart,
            details: cart.details.filter(
              (i) => i.product_variant_id !== product_variant_id
            ),
          });
        }
      }
    },
    [cart, setCart]
  );

  useEffect(() => {
    getCartDetail();
  }, [getCartDetail]);

  return (
    <div className="container antialiased">
      <div className="px-2 lg:px-0">
        <h1 className="mt-6 mb-2 text-2xl font-semibold tracking-tight text-gray-900">
          Giỏ hàng
        </h1>
        <div className="grid items-start justify-start grid-cols-3 gap-8 max-md:grid-cols-1">
          <section className="col-span-2" aria-labelledby="cart-heading">
            {loading ? (
              <Spinner />
            ) : (
              <>
                {cart.details.length > 0 ? (
                  <>
                    <h2 id="cart-heading" className="sr-only">
                      Các sản phẩm đang có trong giỏ hàng của bạn
                    </h2>

                    <ul
                      role="list"
                      className="border-t border-b border-gray-200 divide-y divide-gray-200 "
                    >
                      {cart.details &&
                        cart.details.map((item, index) => {
                          return (
                            <ShoppingCartItem
                              key={index}
                              item={item}
                              processing={processing}
                              onChangeQuantity={onChangeQuantity}
                            />
                          );
                        })}
                    </ul>
                  </>
                ) : (
                  <div>
                    <ShoppingCartEmpty />
                  </div>
                )}
              </>
            )}
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="p-4 rounded-lg bg-gray-50"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Tổng quan đơn hàng
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Thành tiền</dt>
                <dd className="text-sm font-medium text-gray-900">
                  <TextMoney money={calculatedData.price_sell} />
                </dd>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Phí giao hàng (Tạm tính)</span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  <TextMoney money={calculatedData.price_shipping} />
                </dd>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <dt className="text-base font-medium text-gray-900">
                  CẦN THANH TOÁN
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  <TextMoney money={calculatedData.price_final} />
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <Button
                color="primary"
                type="submit"
                fullWidth
                isDisabled={cart.details.length === 0}
              >
                <Link className="w-full h-full leading-10" href={"/checkout"}>
                  Đặt hàng & Thanh toán
                </Link>
              </Button>
            </div>
          </section>
        </div>
        <Toaster toastOptions={{ success: { duration: 1000 } }} />
      </div>
    </div>
  );
};

export default ShoppingCartContainer;
