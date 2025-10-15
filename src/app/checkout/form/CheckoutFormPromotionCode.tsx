import { useTranslation } from "@/app/i18n/client";
import CheckoutNextApi from "@/common/api/next/CheckoutNextApi";
import PromotionCode from "@/common/contants/PromotionCode";
import CustomerCartModel from "@/common/models/CustomerCartModel";
import PromotionCodeResultModel from "@/common/models/PromotionCodeResultModel";
import useCheckoutStore from "@/common/zustands/useCheckoutStore";
import ToastContentList from "@/components/toast/ToastContentList";
import { Button, Input } from "@nextui-org/react";
import { IconCheck } from "@tabler/icons-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const CheckoutFormPromotionCode = () => {
  const { t } = useTranslation("vn", ["checkout"]);
  const [code, setCode] = useState("");

  //For check shippingprice
  const [promotionCodeResult, setPromotionCodeResult] = useCheckoutStore(
    (state) => [state.promotionCodeResult, state.setPromotionCodeResult]
  );
  const cart = useCheckoutStore((state) => state.cart);
  const calculatedData = useMemo(
    () => CustomerCartModel.calculatePrices(cart),
    [cart]
  );
  const [loading, setLoading] = useState(false);

  // clear current shippingprice
  const resetPromotionCodeResult = useCallback(() => {
    setPromotionCodeResult(PromotionCodeResultModel.getDefaultData(), 0);
  }, [setPromotionCodeResult]);

  const checkCode = useCallback(async () => {
    setLoading(true);
    const foundItem = await CheckoutNextApi.checkPromotionCode(code);
    setLoading(false);
    if (foundItem.hasError()) {
      //show error
      toast.error(
        <ToastContentList
          title={t("checkout:form.error.error_promotion_code_heading")}
          items={foundItem.error.errors}
          translate_prefix="checkout:form.error"
        />
      );
      resetPromotionCodeResult();
    } else {
      //found item
      if (foundItem.id > 0) {
        //calculate pricediscount
        let priceDiscount = 0;
        if (foundItem.discount_type === PromotionCode.DISCOUNT_TYPE_PERCENT) {
          priceDiscount = Math.floor(
            (foundItem.discount_value * calculatedData.price_sell) / 100
          );
        } else if (
          foundItem.discount_type === PromotionCode.DISCOUNT_TYPE_VALUE
        ) {
          priceDiscount = foundItem.discount_value;
        }
        setPromotionCodeResult(foundItem.toJson(), priceDiscount);
      } else {
        resetPromotionCodeResult();
      }
    }
  }, [
    code,
    calculatedData,
    resetPromotionCodeResult,
    setPromotionCodeResult,
    t,
  ]);

  useEffect(() => {
    resetPromotionCodeResult();
  }, [code, resetPromotionCodeResult]);

  return (
    <div className="mt-4 flex flex-row gap-2">
      <div className="basis-3/4">
        <Input
          labelPlacement="outside"
          variant="faded"
          classNames={{ inputWrapper: "bg-white" }}
          placeholder="Nhập mã khuyến mãi"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              checkCode();
              e.preventDefault();
            }
          }}
          endContent={
            <>
              {promotionCodeResult.id > 0 ? (
                <IconCheck className="text-green-700" />
              ) : undefined}
            </>
          }
        />
      </div>
      <div className="basis-1/4">
        <Button
          isLoading={loading}
          isDisabled={loading || code.length === 0}
          fullWidth
          color="primary"
          variant={"flat"}
          onClick={() => checkCode()}
        >
          ÁP DỤNG
        </Button>
      </div>
    </div>
  );
};

export default CheckoutFormPromotionCode;
