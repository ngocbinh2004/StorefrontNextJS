import CustomerSessionApi from "@/common/api/server/CustomerSessionApi";
import { redirect } from "next/navigation";
import LogoutContainer from "./LogoutContainer";

export const dynamic = "force-dynamic";

const AccountLogoutPage = async () => {
  const loggedUser = await CustomerSessionApi.getCurrentLoggedUserDetail();

  if (loggedUser.id === 0) {
    redirect("/account/login");
  }

  return (
    <section className="container my-8 py-8 bg-white rounded-md">
      <LogoutContainer />
    </section>
  );
};

export default AccountLogoutPage;
