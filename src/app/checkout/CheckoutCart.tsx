import useCheckoutStore from "@/common/zustands/useCheckoutStore";
import CheckoutCartItem from "./CheckoutCartItem";

const CheckoutCart = () => {
  const items = useCheckoutStore((state) => state.cart.details);

  return (
    <ul className="pt-2 pr-1">
      {items.map((item) => (
        <CheckoutCartItem key={item.product_variant_id} item={item} />
      ))}
    </ul>
  );
};

export default CheckoutCart;
