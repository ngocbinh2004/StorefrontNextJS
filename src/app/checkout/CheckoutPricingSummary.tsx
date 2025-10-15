import PromotionCode from "@/common/contants/PromotionCode";
import CustomerCartModel from "@/common/models/CustomerCartModel";
import useCheckoutStore from "@/common/zustands/useCheckoutStore";
import TextMoney from "@/components/shared/displaydata/TextMoney";
import { IconDiscountCheck } from "@tabler/icons-react";
import { useCallback, useMemo } from "react";

const CheckoutPricingSummary = () => {
  const cart = useCheckoutStore((state) => state.cart);
  const promotionCodeResult = useCheckoutStore(
    (state) => state.promotionCodeResult
  );

  const calculatedData = useMemo(
    () => CustomerCartModel.calculatePrices(cart),
    [cart]
  );

  const getDiscountDetail = useCallback(() => {
    let com = null;
    switch (promotionCodeResult.discount_type) {
      case PromotionCode.DISCOUNT_TYPE_PERCENT:
        com = <>{promotionCodeResult.discount_value}% giá trị tiền hàng</>;
        break;
      case PromotionCode.DISCOUNT_TYPE_VALUE:
        com = (
          <>
            <TextMoney money={promotionCodeResult.discount_value} />
          </>
        );
        break;
    }
    return com;
  }, [promotionCodeResult]);

  return (
    <dl className="mt-4">
      <div className="flex items-center justify-between py-2">
        <dt className="text-sm text-gray-600">Tiền hàng</dt>
        <dd className="text-sm font-medium text-gray-900">
          <TextMoney money={calculatedData.price_sell} />
        </dd>
      </div>
      <div className="flex items-center justify-between py-2">
        <dt className="flex items-center text-sm text-gray-600">
          <span>Phí vận chuyển </span>
        </dt>
        <dd className="text-sm text-gray-900">
          <TextMoney money={calculatedData.price_shipping} />
        </dd>
      </div>

      <div className="flex items-center justify-between py-2">
        <dt className="flex items-center text-sm text-gray-600">
          <span>Khuyến mãi</span>
        </dt>
        <dd className="text-sm text-gray-900">
          -<TextMoney money={calculatedData.price_discount} />
        </dd>
      </div>

      {promotionCodeResult.id > 0 ? (
        <div className="p-2 border border-green-200 bg-green-50 rounded-sm text-xs">
          <IconDiscountCheck
            className="inline-block text-green-700"
            size={16}
          />{" "}
          Mã{" "}
          <span className="font-mono font-bold text-green-700">
            {promotionCodeResult.code}
          </span>{" "}
          được giảm {getDiscountDetail()}
        </div>
      ) : null}

      <div className="flex items-center justify-between py-2">
        <dt className="text-lg text-gray-900">Tổng cộng</dt>
        <dd className="text-lg font-bold text-gray-900">
          <TextMoney money={calculatedData.price_final} />
        </dd>
      </div>
    </dl>
  );
};

export default CheckoutPricingSummary;
