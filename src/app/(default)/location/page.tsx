import Breadcrumb from "@/components/shared/displaydata/Breadcrumb";
import StoreApi from "@/common/api/server/StoreApi";
import { BreadcrumbItem } from "@/common/types/Breadcrumb";
import LocationWrapper from "@/components/features/location/LocationWrapper";
import { StoreJson } from "@/common/types/Store";

export const dynamic = "force-dynamic";

const Location = async () => {
  const allStores = await StoreApi.getAllItems();
  let storeItems: StoreJson[] = [];
  if (!allStores.hasError()) {
    for (let i = 0; i < allStores.items.length; i++) {
      storeItems.push(allStores.items[i].toJson());
    }
  }

  return (
    <div className="container mb-2">
      <div className="grid grid-cols-3 gap-4 max-md:flex max-md:flex-col">
        <LocationWrapper storeItems={storeItems} />
      </div>
    </div>
  );
};

export default Location;
