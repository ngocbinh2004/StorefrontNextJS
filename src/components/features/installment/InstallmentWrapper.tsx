"use client";
import { useCallback, useEffect, useState } from "react";
import InstallmentPeriod from "./InstallmentPeriod";
import InstallmentPrepayment from "./InstallmentPrepayment";
import InstallmentTable from "./table/InstallmentTable";
import { ProductVariantJson } from "@/common/types/ProductVariant";
import InstallmentCollection from "@/common/collections/InstallmentCollection";
import InstallmentNextApi from "@/common/api/next/InstallmentNextApi";
import { InstallmentJson } from "@/common/types/Installment";
import InstallmentPackageList from "./package/InstallmentPackageList";
import InstallmentForm from "./form/InstallmentForm";
import InstallmentModel from "@/common/models/InstallmentModel";

const InstallmentWrapper = ({
  productVariant,
}: {
  productVariant: ProductVariantJson;
}) => {
  const [tenorValue, setTenorValue] = useState(0);
  const [prePaidValue, setPrePaidValue] = useState(0);
  const [installment, setInstallment] = useState<InstallmentJson>(
    InstallmentModel.getDefaultData()
  );

  const [loading, setLoading] = useState(false);
  const [collection, setCollection] = useState<InstallmentCollection>(
    new InstallmentCollection()
  );

  const fetchTenorDetail = useCallback(async () => {
    setLoading(true);

    const productCollection = await InstallmentNextApi.getTenorDetail({
      product_variant_id: productVariant.id,
      prepaid_percentage: prePaidValue,
      tenor: tenorValue,
    });

    setCollection(productCollection);
    setLoading(false);
  }, [tenorValue, prePaidValue, productVariant.id]);

  const onChangePeriod = useCallback((value: number) => {
    setTenorValue(value);
  }, []);

  const onChangePrePaid = useCallback((value: number) => {
    setPrePaidValue(value);
  }, []);

  useEffect(() => {
    if (prePaidValue > 0 && tenorValue > 0) {
      fetchTenorDetail();
    }
  }, [fetchTenorDetail, tenorValue, prePaidValue]);

  const onSelectedInstallment = useCallback((item: InstallmentJson) => {
    setInstallment(item);
  }, []);

  return (
    <div>
      {installment.merchant_id === 0 ? (
        <div className="mb-8">
          <InstallmentPackageList
            productVariantId={productVariant.id}
            onSelectedInstallment={onSelectedInstallment}
          />
        </div>
      ) : null}

      {installment.merchant_id === 0 ? (
        <>
          <div className="mb-3">
            <div className="font-bold">{"Chọn gói trả góp phù hợp:"}</div>
            <div className="text-xs text-gray-500">
              {"Không phí bảo hiểm, không phí hồ sơ"}
            </div>
          </div>
          <div className="flex w-full gap-4">
            <InstallmentPrepayment
              amount={productVariant.price ?? 0}
              onChange={onChangePrePaid}
            />
            <InstallmentPeriod onChange={onChangePeriod} />
          </div>
        </>
      ) : null}

      {tenorValue > 0 && prePaidValue > 0 && installment.merchant_id === 0 ? (
        <InstallmentTable
          items={collection.items}
          isLoading={loading}
          onSelectedInstallment={onSelectedInstallment}
        />
      ) : null}
      {installment.merchant_id > 0 ? (
        <InstallmentForm
          productVariant={productVariant}
          installment={installment}
        />
      ) : null}
    </div>
  );
};

export default InstallmentWrapper;
