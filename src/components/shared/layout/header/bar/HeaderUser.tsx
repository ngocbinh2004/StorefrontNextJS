import CustomerSessionApi from "@/common/api/server/CustomerSessionApi";
import { cn } from "@/common/utils/cn";
import HeaderButton from "./HeaderRightButton";

export default async function HeaderUser() {
  const loggedUser = await CustomerSessionApi.getCurrentLoggedUserDetail();

  return (
    <HeaderButton
      className={cn(loggedUser.id > 0 ? "" : "bg-[#FF8B8B4D]", "max-md:hidden")}
      url={loggedUser.id > 0 ? "/account" : "/account/login"}
      icon={
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.25 9.375C11.25 7.30393 12.9289 5.625 15 5.625C17.0711 5.625 18.75 7.30393 18.75 9.375C18.75 11.4461 17.0711 13.125 15 13.125C12.9289 13.125 11.25 11.4461 11.25 9.375ZM15 3.125C11.5482 3.125 8.75 5.92322 8.75 9.375C8.75 12.8268 11.5482 15.625 15 15.625C18.4518 15.625 21.25 12.8268 21.25 9.375C21.25 5.92322 18.4518 3.125 15 3.125ZM10 16.875C8.20098 16.875 6.494 17.4232 5.2149 18.506C3.91598 19.6055 3.125 21.2047 3.125 23.125V25C3.125 26.0355 3.96447 26.875 5 26.875H25C26.0355 26.875 26.875 26.0355 26.875 25V23.125C26.875 21.2047 26.084 19.6055 24.7851 18.506C23.506 17.4232 21.799 16.875 20 16.875H10ZM5.625 23.125C5.625 21.9387 6.09322 21.0379 6.83015 20.4141C7.5869 19.7735 8.69242 19.375 10 19.375H20C21.3076 19.375 22.4131 19.7735 23.1699 20.4141C23.9068 21.0379 24.375 21.9387 24.375 23.125V24.375H5.625V23.125Z"
            fill="black"
          />
        </svg>
      }
      label={
        <>
          {loggedUser.id > 0 ? (
            loggedUser.full_name
          ) : (
            <>
              Đăng nhập <br />
              Đăng ký
            </>
          )}
        </>
      }
    />
  );
}
