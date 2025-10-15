"use client";

import StoreModel from "@/common/models/StoreModel";
import { StoreJson } from "@/common/types/Store";
import { lazy, useEffect, useState } from "react";
import LocationFilter from "./LocationFilter";
import LocationList from "./LocationList";
const LocationEmbedMap = lazy(() => import("./LocationEmbedMap"));

const LocationWrapper = ({ storeItems }: { storeItems: StoreJson[] }) => {
  const [initload, setInitload] = useState<boolean>(true);
  const [storeSelected, setStoreSelected] = useState<StoreJson>(
    StoreModel.getDefaultData(),
  );
  const [regionSelected, setRegionSelected] = useState<number>(0);
  const [subRegionSelected, setSubRegionSelected] = useState<number>(0);

  useEffect(() => {
    if (initload) {
      setStoreSelected(storeItems[0]);
      setInitload(false);
    }
  }, [initload, storeItems]);

  return (
    <>
      <div className="col-span-1">
        <div className="flex flex-col gap-2 h-[616px]">
          <LocationFilter
            storeItems={storeItems}
            onChangeRegion={setRegionSelected}
            onChangeSubRegion={setSubRegionSelected}
          />

          <LocationList
            storeItems={storeItems}
            regionSelected={regionSelected}
            subRegionSelected={subRegionSelected}
            storeSelected={storeSelected}
            onChangeStore={setStoreSelected}
          />
        </div>
      </div>
      <div className="col-span-2">
        <LocationEmbedMap embedMap={storeSelected.embed_map} />
      </div>
    </>
  );
};

export default LocationWrapper;
