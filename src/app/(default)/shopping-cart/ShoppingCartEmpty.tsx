import { Button } from "@nextui-org/button";
import { IconSearch, IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const ShoppingCartEmpty = () => {
  return (
    <div className="text-center">
      <div className="mt-12">
        <IconShoppingCart
          size={128}
          stroke={1}
          className="inline-block text-gray-400"
        />
      </div>
      <div className="mt-4 mb-8">Giỏ hàng của bạn đang trống.</div>
      <div className="mt-8">
        <Button color="primary" variant="bordered">
          <IconSearch size={18} />
          <Link href="/">Tiếp tục mua hàng</Link>
        </Button>
      </div>
    </div>
  );
};

export default ShoppingCartEmpty;
