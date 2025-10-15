"use client";

import { StoreJson } from "@/common/types/Store";
import useInventoryStockStore from "@/common/zustands/useInventoryStockStore";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import {
  IconBuildingStore,
  IconCaretDownFilled,
  IconCircleCheckFilled,
  IconPhone,
  IconSearch,
} from "@tabler/icons-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import LocationFilter from "../location/LocationFilter";
import Helper from "@/common/utils/helper";

const ProductInventoryVariantDetail = ({
  variantId,
  allStores,
}: {
  variantId: number;
  allStores: StoreJson[];
}) => {
  const isMobile = Helper.detectingCSRMobileDevices();
  const [stockItems] = useInventoryStockStore((state) => [state.items]);

  const [storeInStock, setStoreInStock] = useState<StoreJson[]>([]);
  const [city, setCity] = useState<number>(0);
  const [district, setDistrict] = useState<number>(0);
  const [query, setQuery] = useState("");

  const activeStockItem = useMemo(() => {
    return stockItems.find((i) => i.product_variant_id === variantId);
  }, [variantId, stockItems]);

  const getStoreInStock = useCallback(() => {
    let stocks = activeStockItem?.stocks;

    if (typeof stocks !== "undefined") {
      let stores: StoreJson[] = [];
      let storeInStocks: StoreJson[] = [];
      let filterStocks = stocks.filter((i) => i.warehouse_id > 0);

      for (let i = 0; i < filterStocks.length; i++) {
        let stock = filterStocks[i];
        let findStore = allStores.find((i) => i.id === stock.warehouse_id);
        if (typeof findStore !== "undefined") {
          storeInStocks.push(findStore);
        }
      }

      if (city > 0) {
        stores = storeInStocks.filter((i) => i.region_id === city);
        if (district > 0) {
          stores = storeInStocks.filter((i) => i.sub_region_id === district);
        }
      } else if (query !== "") {
        stores = storeInStocks.filter(
          (i) =>
            i.name.toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
            i.name
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/[đĐ]/g, "d")
              .toLowerCase()
              .indexOf(
                query
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(/[đĐ]/g, "d")
                  .toLowerCase(),
              ) >= 0,
        );
      } else {
        stores = storeInStocks;
      }

      setStoreInStock(stores);
    }
  }, [activeStockItem, allStores, city, district, query]);

  useEffect(() => {
    getStoreInStock();
  }, [allStores, city, district, query, getStoreInStock]);

  //if not found inventory, do not show
  if (typeof activeStockItem === "undefined") {
    return null;
  }

  return (
    <>
      <Dropdown
        className={`w-[${!isMobile ? "342px" : "300px"}] h-[${
          !isMobile ? "524px" : "400px"
        }]`}>
        <DropdownTrigger>
          <p className="flex items-center ml-0.5 text-blue-500 cursor-pointer">
            <IconBuildingStore size={15} className="inline-block" />
            <span className="mx-1">
              Xem {activeStockItem.stocks.length} cửa hàng còn hàng{" "}
            </span>
            <IconCaretDownFilled size={12} className="" />
          </p>
        </DropdownTrigger>

        <DropdownMenu variant="flat" className="">
          <DropdownSection
            title="Tìm cửa hàng theo khu vực"
            showDivider={false}>
            <DropdownItem
              isReadOnly
              closeOnSelect={false}
              classNames={{
                selectedIcon: "hidden",
                base: "data-[hover=true]:bg-white data-[selectable=true]:focus:bg-white w-full",
              }}>
              <LocationFilter
                className="p-0"
                storeItems={allStores}
                onChangeRegion={setCity}
                onChangeSubRegion={setDistrict}
              />
              <Input
                size="sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                endContent={<IconSearch className="text-gray-500" />}
                className="mt-2"
                placeholder="Tìm theo tên..."
              />
            </DropdownItem>
          </DropdownSection>

          <DropdownSection
            className="overflow-auto h-[255px]"
            title={`Danh sách Cửa hàng (${storeInStock.length})`}>
            {storeInStock.length > 0 ? (
              storeInStock.map((store) => {
                return (
                  <DropdownItem key={uuidv4()} className="w-[300px]">
                    <div className="w-full">
                      <div className="flex flex-1">
                        <p className="text-xs font-normal truncate">
                          {store.name}
                        </p>
                      </div>

                      <div className="flex items-center space-x-1">
                        <div className="flex text-xs font-normal text-green-500">
                          <IconCircleCheckFilled
                            size={16}
                            className="mr-1 -mb-2 text-green-500"
                          />
                          Còn hàng tại cửa hàng
                        </div>
                        <span>|</span>
                        <div className="flex text-xs font-normal text-red-500">
                          <IconPhone
                            size={16}
                            className="mr-1 -mb-2 text-red-500"
                          />
                          Hotline: {store.phone}
                        </div>
                      </div>
                    </div>
                  </DropdownItem>
                );
              })
            ) : (
              <DropdownItem isReadOnly>Không tìm thấy</DropdownItem>
            )}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default ProductInventoryVariantDetail;
