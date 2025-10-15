"use client";

import CustomerAddressNextApi from "@/common/api/next/CustomerAddressNextApi";
import CustomerAddressModel from "@/common/models/CustomerAddressModel";
import { CustomerAddressJson } from "@/common/types/CustomerAddress";
import LayoutSpinner from "@/components/shared/layout/spinner/Spinner";
import update from "immutability-helper";
import { useCallback, useEffect, useState } from "react";
import CustomerAddressList from "../../customeraddress/CustomerAddressList";

const AccountTabShippingAddress = () => {
  const [processing, setProcessing] = useState(false);
  const [items, setItems] = useState<CustomerAddressJson[]>([]);

  const fetchUserAddress = useCallback(async () => {
    setProcessing(true);
    const collection = await CustomerAddressNextApi.getItems({
      page: 1,
      limit: 20,
      sortby: "id",
      sorttype: "DESC",
    });
    if (!collection.hasError()) {
      setItems(collection.items);
    }
    setProcessing(false);
  }, []);

  const onSaveSuccess = useCallback(
    (item: CustomerAddressModel) => {
      let findIndex = items.findIndex((i) => i.id === item.id);
      if (findIndex > -1) {
        // update
        setItems(
          update(items, {
            [findIndex]: {
              $set: item,
            },
          })
        );
      } else {
        // append
        setItems(
          update(items, {
            $unshift: [item],
          })
        );
      }
    },
    [items]
  );

  const onSetAsDefaultSuccess = useCallback(
    (item: CustomerAddressModel) => {
      let newItems: CustomerAddressJson[] = [];
      for (let i = 0; i < items.length; i++) {
        if (item.id === items[i].id) {
          items[i].is_default = item.is_default;
        } else {
          items[i].is_default = 0;
        }
        newItems.push(items[i]);
      }
      setItems(newItems);
    },
    [items]
  );

  const onDeleteSuccess = useCallback(
    (id: number) => {
      if (id > 0) {
        setItems(items.filter((i) => i.id != id));
      }
    },
    [items]
  );

  useEffect(() => {
    fetchUserAddress();
  }, [fetchUserAddress]);

  return (
    <>
      <div className="p-2 lg:p-0">
        {!processing ? (
          <>
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Địa chỉ
            </h1>
            <CustomerAddressList
              customerAddressItems={items}
              onSaveSuccess={onSaveSuccess}
              onSetAsDefaultSuccess={onSetAsDefaultSuccess}
              onDeleteSuccess={onDeleteSuccess}
            />
          </>
        ) : (
          <LayoutSpinner className="flex flex-col items-center justify-center mt-8" />
        )}
      </div>
    </>
  );
};

export default AccountTabShippingAddress;
