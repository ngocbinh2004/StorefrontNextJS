import PaymentAlePayNextApi from "@/common/api/next/PaymentAlePayNextApi";
import { InstallmentAlePayJson } from "@/common/types/InstallmentAlePay";
import { Button, Spinner } from "@nextui-org/react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

const AlePayBankList = ({
  amount,
  onSelectBank,
}: {
  amount: number;
  onSelectBank: (item: InstallmentAlePayJson) => void;
}) => {
  const [installment, setInstallment] = useState<InstallmentAlePayJson[]>();
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (amount: number) => {
    setLoading(true);
    const collection = await PaymentAlePayNextApi.installment(amount);
    setInstallment(collection.items.map((item) => item.toJson()));
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData(amount);
  }, [fetchData, amount]);

  return (
    <>
      <section>
        <div className="mb-3">
          <div className="font-bold">{"Bước 2: Chọn ngân hàng trả góp:"}</div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <>
            {Array.isArray(installment) && installment?.length > 0 ? (
              <div className=" grid grid-cols-5 gap-4">
                {Array.isArray(installment) &&
                  installment.map((item) => (
                    <Button
                      variant="bordered"
                      key={item.bankCode}
                      className="border rounded-md"
                      title={item.bankName}
                      onClick={() => onSelectBank(item)}
                    >
                      <Image
                        src={`/images/bank/${item.bankCode.toLowerCase()}.png`}
                        alt={item.bankName}
                        width={100}
                        height={45}
                      />
                    </Button>
                  ))}
              </div>
            ) : (
              <div className=" text-center italic text-gray-400">
                {"Không tìm thấy kết quả phù hợp!"}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default AlePayBankList;
