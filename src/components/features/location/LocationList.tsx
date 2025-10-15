"use client";

import Store from "@/common/contants/Store";
import { StoreJson } from "@/common/types/Store";
import _ from "lodash";
import { useCallback, useMemo } from "react";

const LocationList = ({
  storeItems,
  regionSelected,
  subRegionSelected,
  storeSelected,
  onChangeStore,
}: {
  storeItems: StoreJson[];
  regionSelected: number;
  subRegionSelected: number;
  storeSelected: StoreJson;
  onChangeStore: (v: StoreJson) => void;
}) => {
  const filterStore = useMemo(() => {
    let result: StoreJson[] = [];
    if (regionSelected > 0 || subRegionSelected > 0) {
      if (regionSelected > 0) {
        result = _.filter(storeItems, ["region_id", regionSelected]);
      }
      if (subRegionSelected > 0) {
        result = _.filter(storeItems, ["sub_region_id", subRegionSelected]);
      }
    } else {
      result = storeItems;
    }

    return result;
  }, [storeItems, regionSelected, subRegionSelected]);

  const checkStoreOpen = useCallback((open: string, close: string) => {
    let isOpen = false;

    let currentDate = new Date();
    let currentTime =
      currentDate.getHours() * 3600 + currentDate.getMinutes() * 60;
    let openTime = open.split(":").map((i) => +i);
    let totalSecondOpenTime = openTime[0] * 3600 + openTime[1] * 60;
    let closeTime = close.split(":").map((i) => +i);
    let totalSecondCloseTime = closeTime[0] * 3600 + closeTime[1] * 60;

    if (
      currentTime >= totalSecondOpenTime &&
      currentTime <= totalSecondCloseTime
    ) {
      isOpen = true;
    }

    return isOpen;
  }, []);

  return (
    <div className="flex flex-col flex-1 h-full overflow-hidden bg-white border rounded">
      <div className="px-3 py-2 bg-gray-300">
        <p className="text-sm font-medium">
          Có {filterStore.length} cửa hàng gần bạn
        </p>
      </div>
      <div className="h-full overflow-y-auto bg-white divide-y no-scrollbar">
        {filterStore.map((store) => (
          <div
            key={store.id}
            className={`flex-col px-3 cursor-pointer hover:bg-gray-50 ${
              storeSelected.id === store.id ? "bg-gray-100" : ""
            }`}
            onClick={() => {
              onChangeStore(store);
            }}>
            <div className="py-3">
              <p className="font-bold text-16">{store.name}</p>
              <p className="py-1 text-sm text-gray-500">{store.address}</p>
              <p className="text-xs text-gray-500">Hotline: {store.phone}</p>
              <div className="flex items-center justify-start">
                <p
                  className={`text-[0.625rem] font-bold ${
                    checkStoreOpen(store.open_time, store.close_time)
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}>
                  {checkStoreOpen(store.open_time, store.close_time)
                    ? "Đang hoạt động"
                    : "Hiện đóng cửa"}
                </p>
                {store.status === Store.STATUS_ENABLE ? (
                  <>
                    <div className="w-2 h-2 mx-2 bg-black rounded-full"></div>
                    <p className="text-[0.625rem] text-gray-500">
                      Giờ hoạt động: {store.open_time} - {store.close_time}
                    </p>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationList;
