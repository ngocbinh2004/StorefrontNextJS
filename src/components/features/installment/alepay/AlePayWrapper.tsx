// app/tabs/page.tsx
"use client";
import Installment from "@/common/contants/Installment";
import InstallmentAlePayModel from "@/common/models/InstallmentAlePayModel";
import InstallmentModel from "@/common/models/InstallmentModel";
import { CardJson, InstallmentJson } from "@/common/types/Installment";
import {
  InstallmentAlePayJson,
  PeriodAlePayJson,
} from "@/common/types/InstallmentAlePay";
import { ProductVariantJson } from "@/common/types/ProductVariant";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useCallback, useState } from "react";
import InstallmentForm from "../form/InstallmentForm";
import AlePayBankList from "./AlePayBankList";
import AlePayPeriodTable from "./AlePayPeriodTable";
import AlePayPrepaidSelect from "./AlePayPrepaidSelect";

function AlePayWrapper({
  productVariant,
}: {
  productVariant: ProductVariantJson;
}) {
  const [prePaidValue, setPrePaidValue] = useState(0);

  const onChangePrePaid = useCallback(
    (value: number) => {
      const amount = (value * productVariant.price) / 100;
      setPrePaidValue(amount);
    },
    [productVariant.price]
  );

  const [typeCard, setTypeCard] = useState("");
  const [installmentBank, setInstallmentBank] =
    useState<InstallmentAlePayJson>();

  const onSelectTypeCard = (card: CardJson) => {
    setTypeCard(card.value);
  };

  const onSelectBank = (bank: InstallmentAlePayJson) => {
    setInstallmentBank(bank);
  };

  const [installment, setInstallment] = useState<InstallmentJson>(
    InstallmentModel.getDefaultData()
  );

  const onHandleChoosePeriod = (item: PeriodAlePayJson) => {
    const installment = {
      merchant_id: Installment.MERCHANT_ALEPAY,
      price: productVariant.price,
      tenor: item.month,
      pre_paid_percent: prePaidValue / 100,
      pre_paid_amount: prePaidValue,
      warranty_fee_per_month: 0,
      interest_rate: 0,
      payment_per_month: item.amountByMonth,
      charge_month: 0,
      total_interest: 0,
      total_price_after_installment: item.amountFinal,
    };

    setInstallment(installment);
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        <section>
          <div className="mb-3">
            <div className="font-bold">{"Bước 1: Chọn số tiền trả trước:"}</div>
          </div>
          <div className="flex w-1/2 gap-4">
            <AlePayPrepaidSelect
              amount={productVariant.price ?? 0}
              onChange={onChangePrePaid}
            />
          </div>
        </section>
        {prePaidValue > 0 ? (
          <AlePayBankList amount={prePaidValue} onSelectBank={onSelectBank} />
        ) : null}

        <section>
          {typeof installmentBank !== "undefined" ? (
            <>
              <div className="mb-3">
                <div className="font-bold">
                  {"Bước 3:  Chọn loại thẻ thanh toán:"}
                </div>
              </div>
              <div className=" grid grid-cols-5 gap-4">
                {InstallmentModel.getTypeCardList().map(
                  (card: CardJson, idx) => (
                    <Button
                      variant="bordered"
                      key={idx}
                      className="border rounded-md"
                      onClick={() => onSelectTypeCard(card)}
                    >
                      <Image
                        src={card.logo}
                        alt={card.label}
                        width={200}
                        height={100}
                      />
                    </Button>
                  )
                )}
              </div>
            </>
          ) : null}
        </section>

        <section>
          {typeCard.length > 0 ? (
            <AlePayPeriodTable
              amount={productVariant.price - prePaidValue}
              installment={
                installmentBank || InstallmentAlePayModel.getDefaultData()
              }
              typeCard={typeCard}
              onSelectedInstallment={onHandleChoosePeriod}
            />
          ) : null}
        </section>

        <section>
          {installment.merchant_id > 0 ? (
            <InstallmentForm
              productVariant={productVariant}
              installment={installment}
            />
          ) : null}
        </section>
      </div>
    </>
  );
}

export default AlePayWrapper;
