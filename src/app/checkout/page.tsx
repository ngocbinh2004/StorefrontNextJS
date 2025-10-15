import CustomerSessionApi from "@/common/api/server/CustomerSessionApi";
import StoreApi from "@/common/api/server/StoreApi";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import CheckoutContainer from "./CheckoutContainer";
const siteÌno = siteConfig.metadata.default;

const CheckoutPage = async () => {
  const loggedUser = await CustomerSessionApi.getCurrentLoggedUserDetail();
  const allStores = await StoreApi.getAllItems();

  return (
    <div>
      <div className="header-bg w-full flex justify-center items-center">
        <div className="text-center text-2xl font-bold leading-7 text-black sm:truncate sm:text-3xl  py-2.5 uppercase ">
          {siteÌno.author}
        </div>
      </div>

      <div className="w-full min-h-screen">
        <CheckoutContainer
          loggedUser={loggedUser.toJson()}
          allStores={allStores.items.map((i) => i.toJson())}
        />
      </div>

      <div className="bg-gray-100 mt-6">
        <div className=" container">
          <div className="text-left py-2 text-xs">
            <Link href={"/"}>Về lại trang chủ</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
