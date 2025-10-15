"use client";

import CartNextApi from "@/common/api/next/CartNextApi";
import WebUserCartModel from "@/common/models/WebUserCartModel";
import useCheckoutStore from "@/common/zustands/useCheckoutStore";
import { Badge } from "@nextui-org/react";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const HeaderCart = () => {
  const [cart, setCart] = useCheckoutStore((state) => [
    state.cart,
    state.setCart,
  ]);

  const calculatedData = useMemo(
    () => WebUserCartModel.calculatePrices(cart),
    [cart]
  );

  const getCartDetail = useCallback(async () => {
    const myCart = await CartNextApi.getDetail();
    if (myCart.hasError()) {
      console.log("Error on fetch cart", myCart.error.errors);
    } else {
      setCart(myCart.toJson());
    }
  }, [setCart]);

  useEffect(() => {
    getCartDetail();
  }, [getCartDetail]);

  return (
    <Badge
      content={calculatedData.quantity}
      isInvisible={calculatedData.quantity === 0}
    >
      <Link href="/shopping-cart">
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.25 22.5C12.2855 22.5 13.125 23.3395 13.125 24.375C13.125 25.4105 12.2855 26.25 11.25 26.25C10.2145 26.25 9.375 25.4105 9.375 24.375C9.375 23.3395 10.2145 22.5 11.25 22.5Z"
            stroke="black"
            strokeWidth="1.5"
          />
          <path
            d="M20 22.5C21.0355 22.5 21.875 23.3395 21.875 24.375C21.875 25.4105 21.0355 26.25 20 26.25C18.9645 26.25 18.125 25.4105 18.125 24.375C18.125 23.3395 18.9645 22.5 20 22.5Z"
            stroke="black"
            strokeWidth="1.5"
          />
          <path
            d="M7.1875 15C7.1875 13.2057 7.18949 11.9543 7.31644 11.0101C7.43975 10.0929 7.66531 9.60721 8.01126 9.26126C8.35721 8.91531 8.84292 8.68975 9.76015 8.56644C10.7043 8.43949 11.9557 8.4375 13.75 8.4375H17.3965C19.4801 8.4375 20.9421 8.43974 22.0287 8.59396C23.0894 8.7445 23.6192 9.01889 23.9692 9.43208C24.3192 9.84525 24.5029 10.4131 24.477 11.484C24.4505 12.5811 24.2123 14.0236 23.8698 16.0789C23.6164 17.5991 23.4389 18.6535 23.2036 19.4439C22.9759 20.209 22.7243 20.6139 22.3913 20.896C22.0581 21.1781 21.6175 21.3598 20.8253 21.4586C20.007 21.5608 18.9379 21.5625 17.3965 21.5625H13.75C11.9557 21.5625 10.7043 21.5605 9.76015 21.4336C8.84292 21.3103 8.35721 21.0847 8.01126 20.7387C7.66531 20.3927 7.43975 19.9071 7.31644 18.9899C7.18949 18.0456 7.1875 16.7943 7.1875 15Z"
            stroke="black"
            strokeWidth="1.5"
          />
          <path
            d="M7.1875 14.375V6.25C7.1875 4.86929 6.06821 3.75 4.6875 3.75H3.125"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </Link>
    </Badge>
  );
};

export default HeaderCart;
