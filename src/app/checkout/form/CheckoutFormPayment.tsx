import { Controller, useFormContext } from "react-hook-form";
import { RadioGroup, Radio, useMenu } from "@nextui-org/react";
import Checkout from "@/common/contants/Checkout";
import Image from "next/image";
import useCheckoutStore from "@/common/zustands/useCheckoutStore";
import { useMemo, useContext } from "react";
import CustomerCartModel from "@/common/models/CustomerCartModel";
import { CompanySettingContext } from "@/common/contexts/CompanySettingContextProvider";

const CheckoutFormPayment = () => {
  const setting = useContext(CompanySettingContext);
  const cart = useCheckoutStore((state) => state.cart);

  const { control } = useFormContext();

  const isDisabled = useMemo(() => {
    let calculatePrices = CustomerCartModel.calculatePrices(cart);
    return calculatePrices.price_final < 20 ? true : false;
  }, [cart]);

  const payments = useMemo(() => {
    const iconProps = {
      width: 24,
      height: 24,
      className: "inline-block ml-1 mr-1",
    };

    let options = [];

    if (+setting.website_payment_cod_enable === 1) {
      options.push({
        value: Checkout.PAYMENT_METHOD_COD,
        label: "Thanh toán khi nhận hàng (COD)",
        icon: <Image alt="COD" src="/assets/checkout/cod.svg" {...iconProps} />,
      });

      if (+setting.website_payment_momo_enable === 1) {
        options.push({
          value: Checkout.PAYMENT_METHOD_MOMO,
          label: "Thanh toán bằng ví MOMO",
          icon: (
            <Image alt="Momo" src="/assets/checkout/momo.svg" {...iconProps} />
          ),
        });
      }

      if (+setting.website_payment_vnpay_enable === 1) {
        options.push({
          value: Checkout.PAYMENT_METHOD_VNPAY,
          label: "Thanh toán qua VNPAY",
          icon: (
            <Image
              alt="Credit Card"
              src="/assets/checkout/atm.svg"
              {...iconProps}
            />
          ),
        });
      }

      if (+setting.website_payment_banktransfer_enable === 1) {
        options.push({
          value: Checkout.PAYMENT_METHOD_MONEY_TRANSFER,
          label: "Thanh toán chuyển khoản ngân hàng",
          icon: (
            <Image
              alt="Thanh toán chuyển khoản"
              src="/assets/checkout/transfermoney.svg"
              {...iconProps}
            />
          ),
        });
      }

      return options;
    }
  }, [setting]);

  return (
    <div className="mt-8 space-y-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Hình thức thanh toán</h2>
      </div>
      <div>
        <Controller
          control={control}
          name="payment_method"
          render={({ field: { onChange, value } }) => (
            <RadioGroup
              isRequired
              onChange={(e) => onChange(+e.target.value)}
              value={value.toString()}
              size="sm"
            >
              {Array.isArray(payments) &&
                payments.map((i) => (
                  <Radio
                    key={i.value}
                    value={i.value.toString()}
                    className="py-3"
                    isDisabled={
                      i.value === Checkout.PAYMENT_METHOD_MOMO && isDisabled
                    }
                  >
                    {i.icon} {i.label}
                  </Radio>
                ))}
            </RadioGroup>
          )}
        />
      </div>
    </div>
  );
};

export default CheckoutFormPayment;
