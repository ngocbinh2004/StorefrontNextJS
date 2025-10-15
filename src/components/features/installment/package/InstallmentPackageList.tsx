"use client";
import InstallmentApi from "@/common/api/server/InstallmentApi";
import InstallmentPackageItem from "./InstallmentPackageItem";
import InstallmentNextApi from "@/common/api/next/InstallmentNextApi";
import { useCallback, useEffect, useState } from "react";
import InstallmentCollection from "@/common/collections/InstallmentCollection";
import { InstallmentJson } from "@/common/types/Installment";

const InstallmentPackageList = ({
  productVariantId,
  onSelectedInstallment,
}: {
  productVariantId: number;
  onSelectedInstallment: (item: InstallmentJson) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [packageCollection, setPackageCollection] =
    useState<InstallmentCollection>(new InstallmentCollection());

  const fetchTenorDetail = useCallback(async (id: number) => {
    setLoading(true);

    const collection = await InstallmentNextApi.getItems({
      product_variant_id: id,
      prepaid_percentage: 30,
    });

    setPackageCollection(collection);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTenorDetail(productVariantId);
  }, [fetchTenorDetail, productVariantId]);

  return (
    <div className="border-b border-t my-4 py-4 ">
      {packageCollection.total > 0 ? (
        <>
          <div className=" font-bold mb-3">{"Các gói trả góp ưu đãi:"}</div>
          <div className="whitespace-nowrap flex gap-3 overflow-x-scroll">
            {packageCollection.items.map((item, idx) => (
              <InstallmentPackageItem
                key={idx}
                item={item}
                onSelectedInstallment={onSelectedInstallment}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default InstallmentPackageList;
