import CustomerSessionApi from "@/common/api/server/CustomerSessionApi";
import AccountTabOrderList from "@/components/features/account/tabs/AccountTabOrderList";
import AccountTabSetting from "@/components/features/account/tabs/AccountTabSetting";
import AccountTabShippingAddress from "@/components/features/account/tabs/AccountTabShippingAddress";
import AccountTabWishList from "@/components/features/account/tabs/AccountTabWishList";
import TabBar from "@/components/shared/displaydata/TabBar";
import { IconLogout2 } from "@tabler/icons-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const AccountPage = async () => {
  const loggedUser = await CustomerSessionApi.getCurrentLoggedUserDetail();

  if (loggedUser.id === 0) {
    redirect("/account/login");
  }

  const accountTabList = [
    {
      key: "orders",
      title: "Đơn hàng",
      content: <AccountTabOrderList />,
    },
    {
      key: "wishlist",
      title: "Danh sách mong muốn",
      content: <AccountTabWishList loggedUser={loggedUser.toJson()} />,
    },
    {
      key: "setting",
      title: "Thông tin tài khoản",
      content: <AccountTabSetting loggedUser={loggedUser.toJson()} />,
    },
    {
      key: "shippingaddress",
      title: "Thông tin nhận hàng",
      content: <AccountTabShippingAddress />,
    },
  ];

  return (
    <section className="container py-8 my-8 bg-white rounded-md">
      <h3 className="px-2 mb-2 text-3xl font-bold text-primary lg:px-0">
        Chào bạn, {loggedUser.full_name}
      </h3>
      <p className="px-2 text-gray-500 text-md lg:px-0">
        Từ bảng điều khiển tài khoản của bạn. bạn có thể dễ dàng kiểm tra và xem
        các đơn đặt hàng gần đây của mình, <br />
        quản lý địa chỉ giao hàng và thanh toán cũng như chỉnh sửa chi tiết mật
        khẩu và tài khoản của bạn.
      </p>

      <TabBar className="mt-10" data={accountTabList} />

      <div className="pt-4 mt-8 border-t border-gray-200">
        <Link href={"/account/logout"} className="text-primary">
          <IconLogout2 size={18} className="inline-block -mt-0.5 mr-1" />
          Đăng xuất
        </Link>
      </div>
    </section>
  );
};

export default AccountPage;
