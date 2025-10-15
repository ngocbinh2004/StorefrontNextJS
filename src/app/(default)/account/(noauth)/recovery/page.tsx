import CustomerSessionApi from "@/common/api/server/CustomerSessionApi";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import RecoveryContainer from "./RecoveryContainer";
import GoBack from "../GoBack";
import { siteConfig } from "@/config/site";

interface RecoveryPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const RecoveryPage = async ({ searchParams }: RecoveryPageProps) => {
  const returnUrl =
    typeof searchParams.return_url === "string" ? searchParams.return_url : "";

  //check if already login, redirect to home
  const loggedUser = await CustomerSessionApi.getCurrentLoggedUserDetail();

  if (loggedUser.id > 0) {
    redirect("/account");
  } else {
    //get viewing company
    return (
      <div className="md:flex w-full">
        <div className="p-8 mt-10 md:mx-auto md:w-full md:max-w-md border border-gray-200 rounded-lg relative">
          <div className="mt-4 ml-2 absolute">
            <GoBack href="/account/login" />
          </div>
          <RecoveryContainer />
        </div>
      </div>
    );
  }
};

export default RecoveryPage;

export const metadata = siteConfig.metadata.recovery;
